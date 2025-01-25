package com.cwu.library_management_system.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwu.library_management_system.entity.Book;
import com.cwu.library_management_system.entity.Order;
import com.cwu.library_management_system.entity.User;
import com.cwu.library_management_system.repository.BookRepository;
import com.cwu.library_management_system.repository.OrderRepository;
import com.cwu.library_management_system.repository.UserRepository;
import com.cwu.library_management_system.service.EmailService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService sendEmail;
    // Buy a book
    @PostMapping("/{userId}/buy-book/{bookId}")
    public String buyBook(@PathVariable Long userId, @PathVariable Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Order order = new Order();
        order.setUser(user);
        order.setBook(book);
        order.setOrderDate(LocalDateTime.now());
        orderRepository.save(order);
        sendEmail.sendOrderConfirmation(user.getEmail(), book.getTitle());
        return "Book purchased successfully!";
    }

    // Update profile
    @PutMapping("/{userId}/update-profile")
    public String updateProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        userRepository.save(user);

        return "Profile updated successfully!";
    }
}
