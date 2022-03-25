<?php
include('smtp/PHPMailerAutoload.php');
$name = $_POST["name"];
$email = $_POST["email"];
$msg = $_POST["message"];
$subject = $_POST["subject"];
$mail=new PHPMailer(true);
//$mail->SMTPDebug  = 3;
$mail->isSMTP();
$mail->SMTPDebug = 1;
$mail->Host="smtp.gmail.com";
$mail->Port=587;
$mail->SMTPSecure="tls";
$mail->SMTPAuth=true;
$mail->Username="navmashiana60@gmail.com";
$mail->Password='nk.navpreet1994';
$mail->SetFrom($email,$name);
$mail->addReplyTo($email,$name);
$mail->addAddress("navmashiana60@gmail.com",'me');
$mail->IsHTML(true);
$mail->CharSet = 'UTF-8';
$mail->Subject=$subject;
$bodyParagraphs = ["Name: {$name}", "Email: {$email}", "Message:", nl2br($msg)];
$body = join('<br />', $bodyParagraphs);
$mail->Body=$body;
$mail->SMTPOptions=array('ssl'=>array(
    'verify_peer'=>false,
    'verify_peer_name'=>false,
    'allow_self_signed'=>false
));
if($mail->send()){
    echo "done";
}else{
    echo "Error occur";
}
   
?>