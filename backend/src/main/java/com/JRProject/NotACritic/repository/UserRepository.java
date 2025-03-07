package com.JRProject.NotACritic.repository;

import com.JRProject.NotACritic.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
	//Can define personalized queries here if needed.
}
