CREATE DATABASE IF NOT EXISTS dashboard_multi_api;
USE dashboard_multi_api;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_connections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  service ENUM('github', 'spotify', 'steam') NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMP NULL,
  external_id VARCHAR(255),
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_service (user_id, service)
);

CREATE TABLE github_snapshots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  repo_name VARCHAR(255),
  commit_count INT,
  language VARCHAR(100),
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE spotify_snapshots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  track_name VARCHAR(255),
  artist_name VARCHAR(255),
  played_at TIMESTAMP,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE steam_games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  steam_appid VARCHAR(50),
  game_name VARCHAR(255),
  playtime_minutes INT,
  rawg_rating DECIMAL(3,1),
  rawg_genre VARCHAR(100),
  rawg_image_url TEXT,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);