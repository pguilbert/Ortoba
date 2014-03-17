-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Lun 17 Mars 2014 à 14:38
-- Version du serveur: 5.6.12-log
-- Version de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `ortoba`
--
CREATE DATABASE IF NOT EXISTS `ortoba` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ortoba`;

-- --------------------------------------------------------

--
-- Structure de la table `meeting`
--

CREATE TABLE IF NOT EXISTS `meeting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `scoreTeam1` int(11) NOT NULL,
  `scoreTeam2` int(11) NOT NULL,
  `teamId1` int(11) NOT NULL,
  `teamId2` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId1` (`teamId1`),
  KEY `teamId2` (`teamId2`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Déclencheurs `meeting`
--
DROP TRIGGER IF EXISTS `calcule_score`;
DELIMITER //
CREATE TRIGGER `calcul_score` AFTER INSERT ON `meeting`
 FOR EACH ROW BEGIN
	IF NEW.scoreTeam1 > NEW.scoreTeam2 THEN
		UPDATE team
		SET score = score + 3
		WHERE id = NEW.teamId1;

		UPDATE team
		SET score = score + 1
		WHERE id = NEW.teamId2;

	ELSEIF NEW.scoreTeam1 < NEW.scoreTeam2 THEN
		UPDATE team
		SET score = score + 1
		WHERE id = NEW.teamId1;

		UPDATE team
		SET score = score + 3
		WHERE id = NEW.teamId2;

	ELSEIF NEW.scoreTeam1 = NEW.scoreTeam2 THEN
		UPDATE team
		SET score = score + 2
		WHERE id = NEW.teamId1;

		UPDATE team
		SET score = score + 2
		WHERE id = NEW.teamId2;
	END IF;
END
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `team`
--

INSERT INTO `team` (`id`, `name`, `city`, `score`) VALUES
(1, 'HAWKS', 'ATLANTA', 0),
(2, 'BULLS', 'CHICAGO ', 0),
(3, 'PISTONS', 'DETROIT ', 0),
(4, 'CLIPPERS', 'LOS ANGELES ', 0),
(5, 'THUNDER', 'OKLAHOMA CITY ', 0),
(7, 'JAZZ', 'UTAH', 0),
(8, 'CELTICS', 'BOSTON', 0),
(9, 'CAVALIERS', 'CLEVELAND', 0),
(10, 'LAKERS', 'LOS ANGELES', 0);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `meeting`
--
ALTER TABLE `meeting`
  ADD CONSTRAINT `fk_team_team2` FOREIGN KEY (`teamId2`) REFERENCES `team` (`id`),
  ADD CONSTRAINT `fk_team_team1` FOREIGN KEY (`teamId1`) REFERENCES `team` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
