package com.cwu.library_management_system.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwu.library_management_system.entity.Writer;
import com.cwu.library_management_system.repository.WriterRepository;

@Service
public class WriterService {
	@Autowired
	private WriterRepository writerRepository;

	public List<Writer> getAllWriters() {
		return writerRepository.findAll();
	}

	public void deleteWriter(Long id) {
		writerRepository.deleteById(id);
	}
}
