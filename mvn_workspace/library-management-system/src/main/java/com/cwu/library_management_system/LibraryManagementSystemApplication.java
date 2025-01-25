package com.cwu.library_management_system;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.password.PasswordEncoder;
import com.cwu.library_management_system.entity.User;
import com.cwu.library_management_system.repository.UserRepository;

@SpringBootApplication
public class LibraryManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraryManagementSystemApplication.class, args);
	}

	@Bean
	CommandLineRunner createAdmin(UserRepository userRepository) {
		return args -> {
			// Check if admin already exists
			if (userRepository.findByUsername("admin").isEmpty()) {
				// Create a new admin user
				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword("admin123"); // Set the default password
				admin.setEmail("admin@example.com");
				admin.setRole("ADMIN"); // Assign the admin role
				userRepository.save(admin);

				System.out.println("Admin user created: username=admin, password=admin123");
			}
		};
	}
}
