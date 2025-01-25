package com.cwu.library_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwu.library_management_system.entity.Book;
import com.cwu.library_management_system.entity.Order;
import com.cwu.library_management_system.repository.BookRepository;
import com.cwu.library_management_system.service.BookService;
import com.cwu.library_management_system.service.OrderService;

@RestController
@RequestMapping("/writer")
public class WriterController {

	private final OrderService orderService;
	private final BookService bookService;
	private final BookRepository bookRepository;

	@Autowired
	public WriterController(OrderService orderService, BookService bookService, BookRepository bookRepository) {
		this.orderService = orderService;
		this.bookService = bookService;
		this.bookRepository = bookRepository;
	}

	// Get all books
	@GetMapping("/books")
	public ResponseEntity<List<Book>> getAllBooks() {
		return ResponseEntity.ok(bookService.getAllBooks());
	}

	// Add a new book for a writer
	@PostMapping("/add-book/{writerId}")
	public ResponseEntity<Book> addBook(@PathVariable Long writerId, @RequestBody Book book) {
		try {
			Book savedBook = bookService.addBook(writerId, book);
			return ResponseEntity.ok(savedBook);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	// Get sold books for a writer
	@GetMapping("/sold-books/{writerId}")
	public ResponseEntity<List<Order>> getOrdersForWriterBooks(@PathVariable Long writerId) {
		return ResponseEntity.ok(orderService.getOrdersForWriterBooks(writerId));
	}

	@PutMapping("/update-book/{id}")
	public String updateProfile(@PathVariable Long userId, @RequestBody Book book) {
		Book book1 = bookRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		book1.setTitle(book.getTitle());
		book1.setDescription(book.getDescription());
		book1.setPrice(book.getPrice());
		bookRepository.save(book1);

		return "Book updated successfully!";
	}

	@DeleteMapping("/book/{id}")
	public String deleteBook(Long id) {
		bookService.deleteBook(id);
		return "Book deleted Successfully";

	}
}
