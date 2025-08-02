USE master;
GO

IF  DB_ID('NotACriticDB') IS NOT NULL
    DROP DATABASE NotACritic;
GO

CREATE DATABASE NotACritic;
GO

USE NotACriticDB;

CREATE TABLE Users (
  UserID			INT				PRIMARY KEY		IDENTITY,
  UserName			NVARCHAR(255)	NOT NULL		UNIQUE,
  EmailAddress		NVARCHAR(255)	NOT NULL		UNIQUE,
  Password			NVARCHAR(60)		NOT NULL,
  UserImage			NVARCHAR(255)					DEFAULT NULL,
  UserBio			NVARCHAR(500),
  CreationAt		DATETIME		NOT NULL		DEFAULT GETDATE(),
  UpdatedAt			DATETIME		NOT NULL		DEFAULT GETDATE()
);

CREATE TABLE Movies (
  MovieID			INT				PRIMARY KEY		IDENTITY,
  MovieTitle		NVARCHAR(255)	NOT NULL,
  MovieGenre		NVARCHAR(255)	NOT NULL,
  MovieDescription	NVARCHAR(500)	NOT NULL,
  MovieDirector		NVARCHAR(60),
  --MovieCast (Consider a new table to mediate, i.e. [Actors]
  MovieRating		DECIMAL(2, 1)	NOT NULL		DEFAULT 0.0,
  ReleaseDate		DATE			NOT NULL
);

CREATE TABLE Reviews (
  ReviewID			INT				PRIMARY KEY		IDENTITY,
  MovieID			INT				REFERENCES Movies (MovieID),
  UserID			INT				REFERENCES Users (UserID),
  ReviewBody		NVARCHAR(500), --Review to change to word limit possibly
  ReviewRating		DECIMAL(2, 1)	NOT NULL,
  ReviewTime		DATETIME		NOT NULL		DEFAULT GETDATE(),
  ReviewTimeUpdate	DATETIME						DEFAULT NULL
);

CREATE TABLE Ratings (
  RatingID		INT				PRIMARY KEY		IDENTITY,
  MovieID		INT				REFERENCES Movies (MovieID),
  UserID		INT				REFERENCES Users (UserID),
  RatingValue	DECIMAL(2, 1)	NOT NULL,
);

CREATE TABLE Comments (
  CommentID				INT			PRIMARY KEY		IDENTITY,
  ReviewID				INT			REFERENCES Reviews (ReviewID),
  UserID				INT			REFERENCES Users (UserID),
  CommentBody		VARCHAR(500)	NOT NULL, --Revisit to word limit possibly
  CommentTime		DATETIME		NOT NULL		DEFAULT GETDATE(),
  CommentEdit		VARCHAR(1)		NOT NULL		DEFAULT 0,
  CommentEditTime	DATETIME						DEFAULT NULL
);

CREATE TABLE Followers (
  FollowerID		INT			PRIMARY KEY		IDENTITY,
  UserID			INT			REFERENCES Users (UserID),
);

CREATE TABLE Recommendations (
  RecommendationID		INT			PRIMARY KEY		IDENTITY,
  UserID				INT			REFERENCES Users (UserID),
  MovieID				INT			REFERENCES Movies (MovieID),
  RecommendationTime	DATETIME	NOT NULL		DEFAULT GETDATE()
);