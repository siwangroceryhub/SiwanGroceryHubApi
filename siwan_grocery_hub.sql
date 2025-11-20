-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 19, 2025 at 12:55 PM
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
-- Database: `siwan_grocery_hub`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_detail`
--

CREATE TABLE `login_detail` (
  `id` int(255) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `active` enum('Y','N') NOT NULL DEFAULT 'Y'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `login_detail`
--

INSERT INTO `login_detail` (`id`, `email`, `password`, `active`) VALUES
(32, 'vikashtiwary889@gmail.com', '31c88b3cf68c18af9092b6cf578e5520', 'Y'),
(33, 'vikashtiwary@gmail.com', '31c88b3cf68c18af9092b6cf578e5520', 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `product_list`
--

CREATE TABLE `product_list` (
  `product_id` int(255) NOT NULL,
  `name` text NOT NULL,
  `price` float NOT NULL,
  `details` text NOT NULL,
  `image` longtext NOT NULL,
  `cash_on_delivery` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `category` text NOT NULL,
  `deliver_in` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `product_list`
--

INSERT INTO `product_list` (`product_id`, `name`, `price`, `details`, `image`, `cash_on_delivery`, `quantity`, `discount`, `category`, `deliver_in`) VALUES
(7, 'Wireless Keyboard', 499.99, 'A wireless keyboard with long battery life.', 'http://example.com/images/wireless-keyboard.jpg', 1, 100, 10, 'Electronics', '3-5 business days');

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `user_id` int(255) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`user_id`, `name`, `address`, `contact_no`, `email`, `password`, `dob`, `gender`) VALUES
(3, 'vikash', NULL, NULL, '', '', NULL, NULL),
(4, 'praksh', NULL, NULL, '', '', NULL, NULL),
(6, 'test', NULL, NULL, '', '', NULL, NULL),
(7, 'John Doe', NULL, NULL, '', '', NULL, NULL),
(29, 'Vikash Kumar', NULL, '9876543210', 'vikas@example.com', 'mypassword123', '1998-05-20', 'Male'),
(30, 'Vikash Kumar', NULL, '9876543210', 'vikas@exampl.com', '7b9ffd45d94be8426ca11f380cef8907', '1998-05-20', 'Male'),
(32, 'Vikash Kumar Tiwary', NULL, '77177132082', 'vikashtiwary889@gmail.com', '31c88b3cf68c18af9092b6cf578e5520', '1999-01-14', 'Male'),
(33, 'Vikash Kumar', NULL, '77177132082', 'vikashtiwary@gmail.com', '31c88b3cf68c18af9092b6cf578e5520', '1999-01-14', 'Male'),
(34, 'Vikash Kumar', NULL, '77177132082', 'vikash', '31c88b3cf68c18af9092b6cf578e5520', '1999-01-14', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `user_product_map`
--

CREATE TABLE `user_product_map` (
  `user_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_product_map`
--

INSERT INTO `user_product_map` (`user_id`, `product_id`, `quantity`) VALUES
(3, 1, 0),
(3, 2, 0),
(6, 2, 9),
(3, 4, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login_detail`
--
ALTER TABLE `login_detail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `product_list`
--
ALTER TABLE `product_list`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_detail`
--
ALTER TABLE `login_detail`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `product_list`
--
ALTER TABLE `product_list`
  MODIFY `product_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
