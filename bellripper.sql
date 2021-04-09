-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 03, 2019 at 10:19 AM
-- Server version: 10.1.43-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bellripper_export`
--

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `chargeid` bigint(20) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `usurveyid` bigint(20) NOT NULL,
  `transdate` datetime NOT NULL,
  `transamount` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `configid` int(11) NOT NULL,
  `clio_client_id` varchar(100) DEFAULT NULL,
  `clio_client_secret` varchar(100) DEFAULT NULL,
  `clio_access_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE `errors` (
  `errorid` bigint(18) NOT NULL,
  `logdate` datetime DEFAULT NULL,
  `source` varchar(500) DEFAULT NULL,
  `query` varchar(3000) DEFAULT NULL,
  `error` varchar(3000) DEFAULT NULL,
  `action` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `surveys`
--

CREATE TABLE `surveys` (
  `surveyid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `survey` text COMMENT 'JSON for survey pages only',
  `cost` decimal(10,2) DEFAULT NULL,
  `sellonline` tinyint(1) NOT NULL DEFAULT '0',
  `description` varchar(1000) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `lawyerid` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `templateid` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `file` varchar(120) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `surveyid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userdocuments`
--

CREATE TABLE `userdocuments` (
  `udocumentid` bigint(18) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `surveyid` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `filename` varchar(50) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `visible` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `emailverifycode` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pwresetcode` varchar(50) DEFAULT NULL,
  `pwresetdate` datetime DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `clio_contactid` bigint(18) DEFAULT NULL,
  `accesslevel` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = client, 5 = administrator',
  `sessioncode` varchar(20) DEFAULT NULL,
  `lastaccess` datetime DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `city` varchar(80) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `zip` varchar(30) DEFAULT NULL,
  `dob` varchar(20) DEFAULT NULL,
  `citizen` tinyint(4) DEFAULT NULL,
  `citizen_extra` varchar(100) DEFAULT NULL,
  `military` tinyint(4) DEFAULT NULL,
  `military_other` varchar(100) DEFAULT NULL,
  `military_branch` varchar(50) DEFAULT NULL,
  `emergency_name` varchar(50) DEFAULT NULL,
  `emergency_phone` varchar(30) DEFAULT NULL,
  `emergency_relationship` varchar(30) DEFAULT NULL,
  `finalize_usurveyid` tinyint(4) DEFAULT NULL,
  `attorney_firstname` varchar(40) DEFAULT NULL,
  `attorney_lastname` varchar(40) DEFAULT NULL,
  `attorney_company` varchar(40) DEFAULT NULL,
  `attorney_phone` varchar(30) DEFAULT NULL,
  `attorney_email` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `first_name`, `last_name`, `email`, `emailverifycode`, `password`, `pwresetcode`, `pwresetdate`, `createdate`, `active`, `clio_contactid`, `accesslevel`, `sessioncode`, `lastaccess`, `phone`, `address`, `city`, `state`, `zip`, `dob`, `citizen`, `citizen_extra`, `military`, `military_other`, `military_branch`, `emergency_name`, `emergency_phone`, `emergency_relationship`, `finalize_usurveyid`, `attorney_firstname`, `attorney_lastname`, `attorney_company`, `attorney_phone`, `attorney_email`) VALUES
(5, 'Tammy', 'Rains', 'tammy@swipetrack.com', NULL, '5bd2c018b2c713d4bc7e03e009f7801d9cf3e9e550211606f4d4b44f2c206f73', NULL, NULL, '2017-12-13 14:23:49', 1, NULL, 5, NULL, '2019-12-02 13:15:50', '555-555-5555', '123 main st.', 'san antonio', 'tx', '78254', '2/2/2002', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ms. Lawyer', 'Here', 'My Law Office', '444-444-4444', 'tammy+lawyer@swipetrack.com'),
(6, 'Client', 'Number 1', 'tammy+client1@swipetrack.com', NULL, '5bd2c018b2c713d4bc7e03e009f7801d9cf3e9e550211606f4d4b44f2c206f73', NULL, NULL, '2018-01-03 11:21:22', 1, NULL, 0, 'JrWAJSeQV6kd2nSpmn8F', '2019-12-02 13:16:30', '555-555-5555', '123 main st.', 'new york', 'ny', '20000', '1/1/2001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Test', 'Admin', 'tammy+bradmin@swipetrack.com', NULL, '4c339d5c451378e237ca5b5d0ffda3ab18ca5980ec1e766d6268106f6783429b', NULL, '2019-01-04 17:28:31', '2018-01-04 17:28:31', 1, NULL, 5, 'Yc6GdPABB58JQTCQWdz2', '2019-11-25 12:34:00', '111-111-1111', '123 e. main', 'san antonio', 'tx', '11111', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Tammy', 'Babb', 'SwipeTrack', '111-111-1111', 'tammy+bradmin@swipetrack.com'),
(8, 'Tammy', 'Rains', 'tammy+client2@swipetrack.com', NULL, '5bd2c018b2c713d4bc7e03e009f7801d9cf3e9e550211606f4d4b44f2c206f73', NULL, NULL, '2018-01-22 10:46:00', 1, NULL, 0, 'CM2xQHsVEaNNg3UFYp3y', '2018-01-22 14:38:55', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Test', 'Client 3', 'tammy+client3@swipetrack.com', NULL, '2b375b74cb17465ead4cd63644e2f57caa89b78a25ac771e85bb38ed11ee9b4e', NULL, NULL, '2018-01-22 15:05:57', 1, NULL, 0, NULL, '2018-01-23 13:55:09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Marcie', 'Ripper', 'marcie@bellripper.com', NULL, 'e8d416ca748dd202e7b91f4c0d6f4c2a645a8b6a4f2024903a2b97d8099cd008', NULL, '2019-01-23 12:32:24', '2018-01-23 12:32:24', 1, NULL, 5, 'gDdMXxrMAv7MQZBX2Yf7', '2019-03-05 13:03:28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Hilary', 'Bell', 'hilary@bellripper.com', NULL, NULL, 'ENfsFUsEY4FjLWHTrJSD', '2019-01-23 12:33:15', '2018-01-23 12:33:15', 1, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Test', 'Client', 'tammy+brclient@swipetrack.com', NULL, '4c339d5c451378e237ca5b5d0ffda3ab18ca5980ec1e766d6268106f6783429b', NULL, NULL, '2019-11-22 10:20:41', 1, NULL, 0, NULL, '2019-11-25 11:55:40', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usersurveys`
--

CREATE TABLE `usersurveys` (
  `usurveyid` bigint(20) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `surveyid` int(11) DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = incomplete, 1 = complete, 2 = verified',
  `startdate` datetime DEFAULT NULL,
  `finaldate` datetime DEFAULT NULL,
  `data` text NOT NULL COMMENT 'Survey Answers',
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`chargeid`);

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`configid`);

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`errorid`);

--
-- Indexes for table `surveys`
--
ALTER TABLE `surveys`
  ADD PRIMARY KEY (`surveyid`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`templateid`);

--
-- Indexes for table `userdocuments`
--
ALTER TABLE `userdocuments`
  ADD PRIMARY KEY (`udocumentid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `usersurveys`
--
ALTER TABLE `usersurveys`
  ADD PRIMARY KEY (`usurveyid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `chargeid` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `config`
--
ALTER TABLE `config`
  MODIFY `configid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `errors`
--
ALTER TABLE `errors`
  MODIFY `errorid` bigint(18) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surveys`
--
ALTER TABLE `surveys`
  MODIFY `surveyid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `templateid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userdocuments`
--
ALTER TABLE `userdocuments`
  MODIFY `udocumentid` bigint(18) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `usersurveys`
--
ALTER TABLE `usersurveys`
  MODIFY `usurveyid` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
