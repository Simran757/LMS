package com.cwu.library_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	@Autowired
    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendOrderConfirmation(String to, String bookTitle) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Novel nook:Book Order Confirmation");
            helper.setText("Your order for the book '" + bookTitle + "' has been placed successfully!", true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
    public void sendRegisterMail(String to) {
    	  try {
              MimeMessage message = javaMailSender.createMimeMessage();
              MimeMessageHelper helper = new MimeMessageHelper(message, true);
              helper.setTo(to);
              helper.setSubject("Novel nook:Registered Successfully.");
              helper.setText("You have been registed to our Novel Book Library.", true);
              javaMailSender.send(message);
          } catch (MessagingException e) {
              throw new RuntimeException("Failed to send email: " + e.getMessage());
          }
    }
}

