-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 16 oct. 2023 à 17:53
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `job_board`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonce`
--

DROP TABLE IF EXISTS `annonce`;
CREATE TABLE IF NOT EXISTS `annonce` (
  `id` int NOT NULL AUTO_INCREMENT,
  `localisation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `poste` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `typeContrat` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `horraires` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_entreprise` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0dd9760b10507cb08935095e680` (`Id_entreprise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Localisation` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Login` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Mdp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contenue` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Id_annonce` int DEFAULT NULL,
  `Id_utilisateur` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_80f632e529aeedfab9668fdd4a1` (`Id_annonce`),
  KEY `FK_88e0bf572f0271d7ce808ee1d17` (`Id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Prenom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Login` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Mdp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD CONSTRAINT `FK_0dd9760b10507cb08935095e680` FOREIGN KEY (`Id_entreprise`) REFERENCES `entreprise` (`id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK_80f632e529aeedfab9668fdd4a1` FOREIGN KEY (`Id_annonce`) REFERENCES `annonce` (`id`),
  ADD CONSTRAINT `FK_88e0bf572f0271d7ce808ee1d17` FOREIGN KEY (`Id_utilisateur`) REFERENCES `utilisateur` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
