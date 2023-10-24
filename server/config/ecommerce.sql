-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2023 at 08:13 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `name`, `category_id`) VALUES
(1, 'Razer', 3),
(2, 'Nike', 1),
(3, 'GoPro', 2),
(4, 'DJI', 2),
(5, 'Zowie', 3),
(6, 'Celine', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `phone`, `product_id`) VALUES
(1, '0888888888', 10),
(2, '0888888888', 6);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `img` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `img`) VALUES
(1, 'Fashion', 'https://cdn-icons-png.flaticon.com/512/1856/1856030.png'),
(2, 'Camera', 'https://cdn-icons-png.flaticon.com/512/1590/1590877.png'),
(3, 'Gaming', 'https://cdn-icons-png.flaticon.com/128/2946/2946177.png'),
(4, 'Mobile', 'https://cdn-icons-png.flaticon.com/512/3616/3616049.png');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_product`
--

CREATE TABLE `favorite_product` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite_product`
--

INSERT INTO `favorite_product` (`id`, `users_id`, `product_id`) VALUES
(102, 2, 8),
(103, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `discount_percent` float NOT NULL,
  `category_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `discount_percent`, `category_id`, `brand_id`, `img`) VALUES
(2, 'Razer Iskur Premium Gaming Chair', 17900, 10, 3, 1, 'https://media.discordapp.net/attachments/1060254771535151194/1060264410121244732/razer-iskur-premium-gaming-chair-standard-leather-green-black-front-removebg-preview.png'),
(3, 'Nike Dunk Retro White-Black', 5600, 10, 1, 2, 'https://media.discordapp.net/attachments/1060254771535151194/1111617141557440573/qmMRjsk.png'),
(4, 'GoPro Hero11 Black', 18500, 10, 2, 3, 'https://media.discordapp.net/attachments/1060254771535151194/1060262116818432080/20220913_051229_gopro-hero-11-black_2_-removebg-preview.png'),
(5, 'DJI OSMO Action 3', 12500, 10, 2, 4, 'https://media.discordapp.net/attachments/1060254771535151194/1060262620319457340/20220909_080533_DJI_ACTION_3-removebg-preview.png'),
(6, 'Razer Viper V2 Pro Wireless Gaming Mouse', 5490, 20, 3, 1, 'https://media.discordapp.net/attachments/1060254771535151194/1060264077391314954/razer-viper-v2-pro-wireless-gaming-mouse-black-full-view-removebg-preview.png'),
(7, 'Zowie XL2746K 27inch TN Gaming Monitor 240Hz', 23900, 16, 3, 5, 'https://media.discordapp.net/attachments/1060254771535151194/1060264976171925514/zowie-xl2746k-27-tn-gaming-monitor-240hz-top-removebg-preview.png'),
(8, 'Celine Cropped T-Shirt In Cotton Jersey\nEcru / Black', 19500, 0, 1, 6, 'https://media.discordapp.net/attachments/1060254771535151194/1102156644181352558/2X761671Q.01EA_1_SUM22-removebg-preview.png'),
(9, 'Celine Horizontal Pouch In Triomphe Canvas With Celine Print Tan', 35500, 8, 1, 6, 'https://media.discordapp.net/attachments/1060254771535151194/1102157996026503188/10L272DM5.04LI_1_SUM23-removebg-preview.png'),
(10, 'Celine Sports Bra In Athletic Knit\nBlack / Cream', 23000, 5, 1, 6, 'https://media.discordapp.net/attachments/1060254771535151194/1102158689969897492/2A68L372N.38CR_1_SUM21_615898_v8-removebg-preview.png'),
(11, 'Celine Embroidered Tank Top In Silk Black', 79000, 15, 1, 6, 'https://media.discordapp.net/attachments/1060254771535151194/1102160334225154048/image-removebg-preview.png'),
(12, 'Celine Bustier Tank Top In Crocheted Cotton Off White', 89000, 0, 1, 6, 'https://media.discordapp.net/attachments/1060254771535151194/1102160949089161216/2AE53923T.01OW_1_SUM23-removebg-preview.png'),
(13, 'Celine Ave 57 Sky Windbreaker In Nylon Off White / Multicolor', 69000, 3, 1, 6, 'https://media.discordapp.net/attachments/1060254771535151194/1102161950445674526/2W828397U.01MU_1_SUM23_M_V2-removebg-preview.png');

-- --------------------------------------------------------

--
-- Table structure for table `product_quantity`
--

CREATE TABLE `product_quantity` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` varchar(20) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_quantity`
--

INSERT INTO `product_quantity` (`id`, `product_id`, `quantity`, `size`, `color`) VALUES
(2, 2, 15, NULL, 'black'),
(3, 5, 10, NULL, NULL),
(4, 4, 22, NULL, NULL),
(5, 3, 7, NULL, NULL),
(6, 6, 12, NULL, 'black'),
(7, 6, 5, NULL, 'white'),
(8, 7, 14, NULL, NULL),
(11, 8, 10, 'm', 'white'),
(13, 8, 3, 'xl', 'black'),
(14, 9, 17, NULL, NULL),
(15, 10, 8, 'xs', NULL),
(16, 10, 13, 's', NULL),
(17, 10, 11, 'm', NULL),
(18, 10, 7, 'l', NULL),
(19, 11, 10, 'xs', NULL),
(20, 11, 5, 's', NULL),
(21, 11, 12, 'm', NULL),
(22, 11, 18, 'l', NULL),
(23, 12, 13, 'xs', NULL),
(24, 12, 10, 's', NULL),
(25, 12, 18, 'm', NULL),
(26, 12, 14, 'l', NULL),
(27, 12, 22, 'xl', NULL),
(28, 13, 12, 'm', NULL),
(29, 13, 17, 'l', NULL),
(30, 8, 3, 'xs', 'black');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `address` varchar(150) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `createAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone`, `fname`, `lname`, `password`, `address`, `ip`, `createAt`) VALUES
(2, '0888888888', 'ชวาลโชติ', 'คำดี', '$2b$10$kzPGvtKNk9n5BbjKfPzbNezTfxK.LyHuap1gmpIs4rJC9T1pTf08S', '262 ม.18 ต.หนองหญ้าปล้อง อ.วังสะพุง จ.เลย 42130', '182.232.102.13', '2023-02-28 18:32:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign key category id in brand` (`category_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign key product id in cart` (`product_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorite_product`
--
ALTER TABLE `favorite_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign key user id in fav` (`users_id`),
  ADD KEY `foreign key product id in fav` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign key category id in product` (`category_id`),
  ADD KEY `foreign key brand id in product` (`brand_id`);

--
-- Indexes for table `product_quantity`
--
ALTER TABLE `product_quantity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foreign key product id in quantity` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favorite_product`
--
ALTER TABLE `favorite_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `product_quantity`
--
ALTER TABLE `product_quantity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `foreign key category id in brand` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `foreign key product id in cart` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favorite_product`
--
ALTER TABLE `favorite_product`
  ADD CONSTRAINT `foreign key product id in fav` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign key user id in fav` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `foreign key brand id in product` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `foreign key category id in product` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_quantity`
--
ALTER TABLE `product_quantity`
  ADD CONSTRAINT `foreign key product id in quantity` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
