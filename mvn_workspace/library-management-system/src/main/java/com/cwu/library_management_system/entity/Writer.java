package com.cwu.library_management_system.entity;

import java.util.Set;

import com.cwu.library_management_system.dto.Account;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
@Entity
public class Writer implements Account{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	   private Long id;
	    private String username;
	    private String password;
	    private String email;
	    private String role;
	    @JsonManagedReference
	    @OneToMany(mappedBy = "writer") 	    
	    private Set<Book> books;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		public Set<Book> getBooks() {
			return books;
		}
		public void setBooks(Set<Book> books) {
			this.books = books;
		}
	    
	    
}
