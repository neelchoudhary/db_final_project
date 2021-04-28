-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: db_final
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `songs`
--

DROP TABLE IF EXISTS `songs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `content` varchar(256) NOT NULL,
  `artist_id` int NOT NULL,
  `length` int NOT NULL,
  `explicit` tinyint(1) DEFAULT NULL,
  `language` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `songs_2_artists_idx` (`artist_id`),
  KEY `songs_2_languages_idx` (`language`),
  CONSTRAINT `songs_2_artists` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `songs_2_languages` FOREIGN KEY (`language`) REFERENCES `song_languages` (`name`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songs`
--

LOCK TABLES `songs` WRITE;
/*!40000 ALTER TABLE `songs` DISABLE KEYS */;
INSERT INTO `songs` VALUES (2,'DNA','https://www.youtube.com/watch?v=MBdVXkSdhwU&ab_channel=HYBELABELS',1,255,0,'KOREAN'),(4,'Wicked Games','https://www.youtube.com/watch?v=O1OTWCd40bc&ab_channel=TheWeekndVEVO',2,281,1,'ENGLISH'),(5,'Black Swan','https://www.youtube.com/watch?v=0lapF4DQPKQ&ab_channel=HYBELABELS',1,217,0,'KOREAN'),(6,'House Of Balloons / Glass Table Girls','https://www.youtube.com/watch?v=8ex38L8xtNI&ab_channel=TheWeeknd',2,412,1,'ENGLISH'),(10,'The Hills','youtube',2,420,1,'ENGLISH'),(15,'Fix You','https://www.youtube.com/watch?v=k4V3Mo61fJM&ab_channel=Coldplay',17,320,0,'ENGLISH'),(18,'Wild Horses','https://www.youtube.com/watch?v=5xsCONzzTRw',21,842,0,'ENGLISH'),(19,'Belle','https://www.youtube.com/watch?v=LnRF3fb_HjU',22,74923,0,'FRENCH'),(20,'Deewani Mastani','https://www.youtube.com/watch?v=h6lHUn20J5g',23,2123,0,'HINDI'),(21,'Chikni Chameli','https://www.youtube.com/watch?v=MQM7CNoAsBI',23,4230,0,'HINDI'),(22,'三生三世','https://www.youtube.com/watch?v=s-CcFyyPJiY',24,8940,0,'MANDARIN'),(23,'Oye Pablo','https://www.youtube.com/watch?v=llHSeXEcDUo',25,84902,0,'SPANISH'),(24,'English Folk Song Suite','https://www.youtube.com/watch?v=D0sC4xbyT5c',26,9393,0,'OTHER'),(25,'Viva La Vida','https://www.youtube.com/watch?v=dvgZkm1xWPE',17,200,0,'ENGLISH');
/*!40000 ALTER TABLE `songs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-27 23:04:25
