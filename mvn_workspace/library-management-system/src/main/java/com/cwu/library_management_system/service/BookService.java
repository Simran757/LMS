package com.cwu.library_management_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwu.library_management_system.entity.Book;
import com.cwu.library_management_system.entity.Writer;
import com.cwu.library_management_system.repository.BookRepository;
import com.cwu.library_management_system.repository.UserRepository;
import com.cwu.library_management_system.repository.WriterRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookService {
	private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final WriterRepository writerRepository;

    @Autowired
    public BookService(UserRepository userRepository,BookRepository bookRepository, WriterRepository writerRepository) {
    	this.userRepository=userRepository;
    	this.bookRepository = bookRepository;
        this.writerRepository = writerRepository;
    }

    // Add a new book
    public Book addBook(Long writerId, Book book) {
        Writer writer = writerRepository.findById(writerId)
                .orElseThrow(() -> new EntityNotFoundException("Writer not found"));

        book.setWriter(writer);
        return bookRepository.save(book);
    }

    // Get one book by ID
    public Optional<Book> getOneBook(Long id) {
        return bookRepository.findById(id);
    }

    // Update an existing book
    public Book updateBook(Long bookId, Book updatedBook) {
        return bookRepository.findById(bookId).map(book -> {
            book.setTitle(updatedBook.getTitle());
            book.setDescription(updatedBook.getDescription());
            book.setPrice(updatedBook.getPrice());
            book.setWriter(updatedBook.getWriter()); // Update writer if necessary
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    // Delete a book
    public void deleteBook(Long bookId) {
        if (!bookRepository.existsById(bookId)) {
            throw new RuntimeException("Book not found");
        }
        bookRepository.deleteById(bookId);
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    
}
