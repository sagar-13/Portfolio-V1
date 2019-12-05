// JavaScript Document

// For the Particle Effect

	//Copyright (c) 2019 by Louis Hoebregts (https://codepen.io/Mamboleoo/pen/obWGYr)
	//
	//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	//
	//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	//
	
	

    var canvas = document.querySelector("#scene"),
        ctx = canvas.getContext("2d"),
        particles = [],
        amount = 0,
        mouse = {x:0,y:0},
        radius = 1;

    var colors = ["#00ff00","#ccfee2", "#ccfee2","#00ff00", "#ccfee2"];

  

    var ww = canvas.width = window.innerWidth;
    var wh = canvas.height = window.innerHeight;

    function Particle(x,y){
        this.x =  Math.random()*ww;
        this.y =  Math.random()*wh;
        this.dest = {
            x : x,
            y: y
        };
        this.r =  Math.random()*1 + 2;
        this.vx = (Math.random()-0.5)*20;
        this.vy = (Math.random()-0.5)*20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.01 + 0.94;

        this.color = colors[Math.floor(Math.random()*6)];
    }

    Particle.prototype.render = function() {


        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y +=  this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        var a = this.x - mouse.x;
        var b = this.y - mouse.y;

        var distance = Math.sqrt( a*a + b*b );
        if(distance<(radius*70)){
            this.accX = (this.x - mouse.x)/100;
            this.accY = (this.y - mouse.y)/100;
            this.vx += this.accX;
            this.vy += this.accY;
        }

    }

    function onMouseMove(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
    }

function onTouchEnd(){
  mouse.x = -9999;
  mouse.y = -9999;
}

    function initScene(){
        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold "+(ww/10)+"px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Hire Me", ww/2, wh/2);

        var data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];
        for(var i=0;i<ww;i+=Math.round(ww/150)){
            for(var j=0;j<wh;j+=Math.round(ww/150)){
                if(data[ ((i + j*ww)*4) + 3] > 150){
                    particles.push(new Particle(i,j));
                }
            }
        }
        amount = particles.length;

    }

    function onMouseClick(){
        radius++;
        if(radius ===5){
            radius = 0;
        }
    }

    function render() {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < amount; i++) {
            particles[i].render();
        }
    }


    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("touchend", onTouchEnd);

    requestAnimationFrame(render);
	
	
	$(window).scroll(function() {
		var hT = $('#animation_waypoint').offset().top,
			hH = $('#animation_waypoint').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();
		if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
			initScene();
		}
	});



