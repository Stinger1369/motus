-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 15 juin 2024 à 15:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `platform`
--

-- --------------------------------------------------------

--
-- Structure de la table `mots`
--

CREATE TABLE `mots` (
  `id` int(11) NOT NULL,
  `word` varchar(255) NOT NULL,
  `longueur` int(11) NOT NULL,
  `difficulté` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mots`
--

INSERT INTO `mots` (`id`, `word`, `longueur`, `difficulté`, `userId`) VALUES
(27, 'lawgivings', 10, '10', 5),
(28, 'interbreeds', 11, '11', 5),
(29, 'pizazz', 6, '6', 5),
(30, 'novemdecillions', 15, '15', 5),
(31, 'tumorigenicity', 14, '14', 6),
(32, 'mineralogically', 15, '15', 6),
(33, 'postmillenarian', 15, '15', 6),
(34, 'col', 3, '3', 6),
(35, 'endotheliomata', 14, '14', 6),
(36, 'tanker', 6, '6', 6),
(37, 'prematures', 10, '10', 1),
(38, 'yid', 3, '3', 5),
(39, 'fen', 3, '3', 5),
(40, 'embroidery', 10, '10', 5);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `numero_secu` varchar(255) NOT NULL,
  `totalScore` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `password`, `numero_secu`, `totalScore`) VALUES
(1, 'bilel', '$2a$10$SzHipEiCG7CYJg24bLbGy.699Yiqut2tFsbDVPbAOZHbzs7IJKTLq', '123456789', 0),
(2, 'bilelzara@gmail.com', '$2a$10$yZh9mNPLljbheGQWdH4ESeFPWBzc/mq7ar4y3yj1lQjVfAPp0kZSi', '1234566789', 0),
(4, 'bibou', '$2a$10$QU1GRK8GKW3Kivg0xvCho./F.pU8yq3ggIJub1H0Qmn2G7T1cRLQS', 'qdsfqsfqsf', 0),
(5, 'azerty', '$2a$10$ewyT2R.lKB9Av3sY/xwriuQtul7DEuiKAc8v/8dRszzwg6BAi22iG', '1234566', 388),
(6, 'kaka', '$2a$10$QDSGcnv4wlSKW6JyWfu1wuZUi7BszU8Z2rDI3JNqLNW8G1dIern0C', '123456789', 407),
(7, 'testuser', '$2a$10$496TgPnvw1TpIBvZqCoF7.pL.5MR1TCGT9Z.HelLvD9AoNJmweeN2', '123456789', 0),
(8, 'testSecu', '$2a$10$GYIbOD.PjnIXkDDM5i5pB.ezcNgr/41XJPhLT/sib0M5pYaemdTK6', '1235456789', 0),
(9, 'testSsqdfsdfgecu', '$2a$10$rh8vxAYWMITnprAE515Osu7N1dRVaQ1fv60B5OgWqffDgZDpIZ3M2', '1235456789', 0),
(10, 'testSssdfsqdfgqdfsdfgecu', '$2a$10$dVP34OTq7ji/tKdoqCRB.eUGnTSdhK8lje6sUF3DkYGOvTcBcrzpy', '1235456789', 0),
(11, 'zsdazefqsfqsf', '$2a$10$CBPWmJ9NCJWpD3l24OVSSe1IFcJsuu8o6EAfxZy3w.yIi/qXp2MVW', '12352547821', 0);

-- --------------------------------------------------------

--
-- Structure de la table `walloffames`
--

CREATE TABLE `walloffames` (
  `id` int(11) NOT NULL,
  `Scores` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `walloffames`
--

INSERT INTO `walloffames` (`id`, `Scores`, `login`, `createdAt`, `updatedAt`) VALUES
(3, 70, 'kaka', '2024-06-13 14:22:40', '2024-06-13 14:22:40'),
(4, 165, 'kaka', '2024-06-13 14:24:16', '2024-06-13 14:24:16'),
(5, 18, 'kaka', '2024-06-13 14:25:43', '2024-06-13 14:25:43'),
(6, 154, 'kaka', '2024-06-13 14:27:41', '2024-06-13 14:27:41'),
(14, 0, 'azerty', '2024-06-15 13:02:01', '2024-06-15 13:02:01'),
(15, 0, 'azerty', '2024-06-15 13:02:10', '2024-06-15 13:02:10'),
(16, 396, 'azerty', '2024-06-15 13:02:20', '2024-06-15 13:02:20'),
(17, 0, 'azerty', '2024-06-15 13:06:46', '2024-06-15 13:06:46'),
(18, 0, 'azerty', '2024-06-15 13:07:03', '2024-06-15 13:07:03'),
(19, 0, 'azerty', '2024-06-15 13:07:07', '2024-06-15 13:07:07'),
(20, 176, 'azerty', '2024-06-15 13:07:12', '2024-06-15 13:07:12'),
(21, 0, 'azerty', '2024-06-15 13:13:11', '2024-06-15 13:13:11'),
(22, 0, 'azerty', '2024-06-15 13:13:13', '2024-06-15 13:13:13'),
(23, 0, 'azerty', '2024-06-15 13:13:14', '2024-06-15 13:13:14'),
(24, 220, 'azerty', '2024-06-15 13:13:25', '2024-06-15 13:13:25');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `mots`
--
ALTER TABLE `mots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mots_ibfk_1` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`);

--
-- Index pour la table `walloffames`
--
ALTER TABLE `walloffames`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `mots`
--
ALTER TABLE `mots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `walloffames`
--
ALTER TABLE `walloffames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `mots`
--
ALTER TABLE `mots`
  ADD CONSTRAINT `mots_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
