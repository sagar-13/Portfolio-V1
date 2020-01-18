<?php
if(!isset($_POST['submit'])){
	echo "error; you need to submit the form!";
}

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];

//Validate first
if(empty($name)||empty($visitor_email)){
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($visitor_email)){
    echo "Bad email value!";
    exit;
}


//if we made it here let's print to the console.
debug_to_console("Test 1");

// $email_from = "From: $email_from \r\n";
// $email_subject = "New Form submission";
// $email_body = "You have received a new message from the user $name.\nHere is the message:\n $message".
    
// $to = "sagar.suri@mail.utoronto.ca";//<== update the email address
// $headers = "From: $email_from \r\n";
// $headers .= "Reply-To: $visitor_email \r\n";
// //Send the email!
// mail($to,$email_subject,$email_body,$headers);
// //done. redirect to thank-you page.
// header('Location: thank-you.html');


function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 