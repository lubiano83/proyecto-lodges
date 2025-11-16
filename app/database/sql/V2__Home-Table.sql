CREATE TABLE `HOME_INFO` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `texto` text NOT NULL
);

CREATE TABLE `HOME_IMAGES` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `image` text NOT NULL
);

INSERT INTO HOME_INFO (title, subtitle, texto)
VALUES (
  'Título de ejemplo',
  'Subtítulo de ejemplo',
  'Este es el texto descriptivo del home.'
);

INSERT INTO HOME_IMAGES (image) VALUES
('https://example.com/img1.webp'),
('https://example.com/img2.webp'),
('https://example.com/img3.webp'),
('https://example.com/img4.webp'),
('https://example.com/img5.webp');