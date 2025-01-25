package com.cwu.library_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwu.library_management_system.entity.User;
import com.cwu.library_management_system.entity.Writer;
import com.cwu.library_management_system.service.UserService;
import com.cwu.library_management_system.service.WriterService;
import com.cwu.library_management_system.entity.Book;
import com.cwu.library_management_system.service.BookService;
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
    private final UserService userService;
	
	@Autowired
	private final BookService bookService;
	
	@Autowired 
	private final WriterService writerService;

    public AdminController(UserService userService,BookService bookService,WriterService writerService) {
        this.userService = userService;
		this.bookService = bookService;
		this.writerService = writerService;
    }

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/allWriters")
    public List<Writer> getAllWriters(){
    	return writerService.getAllWriters();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
    	if(id==3) {
    		return "Can't delete admin";
    	}
        userService.deleteUser(id);
        return "User deleted successfully!";
    }
    
    @DeleteMapping("/writers/{id}")
    public String deleteWriter(@PathVariable Long id) {
    	writerService.deleteWriter(id);
    	return "Writer deleted successfully!";
    }
    
    @GetMapping("/books")
    public List<Book> getAllBooks(){
    	return bookService.getAllBooks();
    }
    
    
}
