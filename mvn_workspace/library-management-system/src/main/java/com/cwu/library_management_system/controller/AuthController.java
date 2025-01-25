package com.cwu.library_management_system.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cwu.library_management_system.dto.Account;
import com.cwu.library_management_system.dto.LoginRequest;
import com.cwu.library_management_system.dto.LoginResponce;
import com.cwu.library_management_system.entity.User;
import com.cwu.library_management_system.entity.Writer;
import com.cwu.library_management_system.repository.UserRepository;
import com.cwu.library_management_system.repository.WriterRepository;
import com.cwu.library_management_system.service.EmailService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;

	@Autowired
	private WriterRepository writerRepository;

	// Register a writer
	@PostMapping("/register/writer")
	public String registerWriter(@RequestBody Writer writerDto) {
		if (writerRepository.findByEmail(writerDto.getEmail()).isPresent()) {
			return "Writer with this email already exists!";
		}
		writerDto.setRole("WRITER");
		writerRepository.save(writerDto);
		System.out.println(writerDto.getEmail());
		emailService.sendRegisterMail(writerDto.getEmail());
		return "Writer registered successfully!";
	}

	// Register a user
	@PostMapping("/register/user")
	public String registerUser(@RequestBody User userDto) {
		if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
			return "User with this username already exists!";
		}
		emailService.sendRegisterMail(userDto.getEmail());
		userDto.setRole("USER");
		userRepository.save(userDto);
		return "User registered successfully!";
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest credentials) {
		// Attempt to find the user in the User repository
		Optional<User> userOpt = userRepository.findByUsername(credentials.getUsername());
		Optional<Writer> writerOpt = writerRepository.findByUsername(credentials.getUsername());

		// Check if we found a valid user or writer
		if (userOpt.isEmpty() && writerOpt.isEmpty()) {
			throw new RuntimeException("Invalid username or password");
		}

		// Get the user or writer entity
		Account account = null;
		if (userOpt.isPresent()) {
			account = userOpt.get();
		} else if (writerOpt.isPresent()) {
			account = writerOpt.get();
		}

		// Check if the password matches
		if (!credentials.getPassword().equals(account.getPassword())) {
			throw new RuntimeException("Invalid username or password");
		}

		// Return the role of the user or writer in a JSON response
		return ResponseEntity.ok(new LoginResponce(account.getRole()));
	}

	@GetMapping("/logout")
	public String logout() {

		return "Logged out successfully!";
	}

	@GetMapping("/current-user")
	public String getLoggendInUser(Principal principal) {
		return principal.getName();
	}
}
