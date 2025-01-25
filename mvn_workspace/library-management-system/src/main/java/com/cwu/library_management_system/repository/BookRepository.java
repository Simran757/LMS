package com.cwu.library_management_system.repository;
	
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cwu.library_management_system.entity.Book;
import com.cwu.library_management_system.entity.User;
import com.cwu.library_management_system.entity.Writer;

public interface BookRepository extends JpaRepository<Book, Long> {
    Writer findByUserId(Long writerId);
    Optional<Book> findByUser(User user);

}

