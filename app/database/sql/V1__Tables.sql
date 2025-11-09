CREATE TABLE `USERS` (
  `email` varchar(100) PRIMARY KEY,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `country` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(72) NOT NULL,
  `image` VARCHAR(255) NULL,
  `is_active` boolean NOT NULL,
  `role` varchar(30) NOT NULL,
  `login_attempts` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
)