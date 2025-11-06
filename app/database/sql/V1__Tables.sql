CREATE TABLE `USERS` (
  `email` varchar(100) PRIMARY KEY,
  `name` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `phone` varchar(12) NOT NULL,
  `password` varchar(72) NOT NULL,
  `is_active` boolean NOT NULL,
  `role` varchar(30) NOT NULL,
  `login_attempts` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
)