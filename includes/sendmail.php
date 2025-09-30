<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields
    $first_name = isset($_POST['form_name']) ? strip_tags(trim($_POST['form_name'])) : '';
    $last_name = isset($_POST['form_last_name']) ? strip_tags(trim($_POST['form_last_name'])) : '';
    $email = isset($_POST['form_email']) ? filter_var(trim($_POST['form_email']), FILTER_SANITIZE_EMAIL) : '';
    $phone = isset($_POST['form_phone']) ? strip_tags(trim($_POST['form_phone'])) : '';
    $message = isset($_POST['form_message']) ? strip_tags(trim($_POST['form_message'])) : '';

    // Validate required fields
    if ($first_name && $last_name && $email && $message) {
        // Business email
        $to = 'info@elitepropmgt.com';
        $subject = "New Contact Form Submission";
        $body = "You have received a new message from the contact form:\n\n" .
                "Name: $first_name $last_name\n" .
                "Email: $email\n" .
                "Phone: $phone\n" .
                "Message:\n$message\n";
        $headers = "From: $first_name $last_name <$email>\r\nReply-To: $email\r\n";

        // Send email to business
        $mail_sent = mail($to, $subject, $body, $headers);

        // Send confirmation email to user
        $confirm_subject = "Thank you for contacting Elite Property Management";
        $confirm_body = "Dear $first_name,\n\nThank you for reaching out to Elite Property Management. We have received your message and will be in touch soon.\n\nBest regards,\nElite Property Management Team";
        $confirm_headers = "From: Elite Property Management <info@elitepropmgt.com>\r\n";
        mail($email, $confirm_subject, $confirm_body, $confirm_headers);

        // Redirect or show success
        echo "<script>alert('Thank you for contacting us! We have received your message.'); window.location.href='../contact.html';</script>";
        exit();
    } else {
        echo "<script>alert('Please fill in all required fields.'); window.history.back();</script>";
        exit();
    }
} else {
    // Not a POST request
    header('Location: ../contact.html');
    exit();
} 