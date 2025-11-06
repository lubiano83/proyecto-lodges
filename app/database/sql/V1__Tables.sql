CREATE TABLE `USERS` (
  `id` varchar(100) PRIMARY KEY,
  `email` varchar(100) UNIQUE NOT NULL,
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