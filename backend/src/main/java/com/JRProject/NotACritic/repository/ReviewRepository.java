package com.JRProject.NotACritic.repository;

import com.JRProject.NotACritic.model.Review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByMovieTitle(String movieTitle);
}
