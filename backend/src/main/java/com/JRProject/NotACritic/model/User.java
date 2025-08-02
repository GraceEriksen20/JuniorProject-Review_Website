package com.JRProject.NotACritic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private int userID;

    @Column(name = "UserName", nullable = false)
    private String name;

    @Column(name = "EmailAddress", nullable = false, unique = true)
    private String email;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "UserImage")
    private String userImage;

    @Column(name = "UserBio")
    private String userBio;

    @Column(name = "CreationAt", nullable = false, updatable = false)
    private LocalDateTime creationAt = LocalDateTime.now();

    @Column(name = "UpdatedAt", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();


    // GetSet
    public int getId() { return userID; }
    public void setId(int userID) { this.userID = userID; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getImage() { return userImage;}
    public void setImage(String userImage) { this.userImage = userImage; }

    public String getBio() { return userBio; }
    public void setBio(String userBio) { this.userBio = userBio; }

    public LocalDateTime getCreationAt() { return creationAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }


    @PrePersist
    public void prePersist() {
        if (creationAt == null) {
            creationAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
