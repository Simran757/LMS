package com.cwu.library_management_system.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cwu.library_management_system.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId); // Orders by user ID
    List<Order> findOrdersByWriterId(Long writerId); // Custom query to fetch orders for writer's books
}

