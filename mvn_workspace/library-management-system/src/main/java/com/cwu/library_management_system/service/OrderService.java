package com.cwu.library_management_system.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwu.library_management_system.entity.Book;
import com.cwu.library_management_system.entity.Order;
import com.cwu.library_management_system.entity.User;
import com.cwu.library_management_system.repository.BookRepository;
import com.cwu.library_management_system.repository.OrderRepository;
import com.cwu.library_management_system.repository.UserRepository;

@Service
public class OrderService {
	@Autowired
    private final OrderRepository orderRepository;
	@Autowired
    private final UserRepository userRepository;
	@Autowired
    private final BookRepository bookRepository;
	@Autowired
	private final EmailService emailService;

 
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, BookRepository bookRepository,EmailService emailService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.emailService=emailService;
    }

    // Place an order
    public Order placeOrder(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Order order = new Order();
        order.setUser(user);
        order.setBook(book);
     
        order.setOrderDate(LocalDateTime.now());
        emailService.sendOrderConfirmation(user.getEmail(), book.getTitle());

        return orderRepository.save(order);
    }

    // Get all orders for a user
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // Get all orders for a writer's books
    public List<Order> getOrdersForWriterBooks(Long writerId) {
        return orderRepository.findOrdersByWriterId(writerId);
    }
}
