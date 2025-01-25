package com.cwu.library_management_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwu.library_management_system.entity.Writer;


@Repository
public interface WriterRepository extends JpaRepository<Writer, Long> {
    Optional<Writer> findByEmail(String email);
    Optional<Writer> findByUsername(String username);
}
