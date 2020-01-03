-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema aquadine
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aquadine
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aquadine` DEFAULT CHARACTER SET utf8 ;
USE `aquadine` ;

-- -----------------------------------------------------
-- Table `aquadine`.`restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aquadine`.`restaurant` (
  `restaurantId` INT(11) NOT NULL AUTO_INCREMENT,
  `restaurantMenu` JSON NOT NULL,
  `restaurantName` VARCHAR(45) NOT NULL,
  `restaurantAdres` VARCHAR(45) NOT NULL,
  `idRestaurant` INT(11) NOT NULL,
  `adres` VARCHAR(255) NULL DEFAULT NULL,
  `naam` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`restaurantId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `aquadine`.`invite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aquadine`.`invite` (
  `inviteId` INT(11) NOT NULL AUTO_INCREMENT,
  `restaurantId` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`inviteId`, `restaurantId`),
  INDEX `fk_invite_restaurant1_idx` (`restaurantId` ASC) VISIBLE,
  CONSTRAINT `fk_invite_restaurant1`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `aquadine`.`restaurant` (`restaurantId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `aquadine`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aquadine`.`menu` (
  `id` BIGINT(20) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `price` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `aquadine`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aquadine`.`user` (
  `userId` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `isOrganizer` TINYINT(4) NULL DEFAULT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `aquadine`.`user_has_invite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aquadine`.`user_has_invite` (
  `userId` INT(11) NOT NULL,
  `inviteId` INT(11) NOT NULL,
  `organizerId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userId`, `inviteId`),
  INDEX `fk_user_has_invite_invite1_idx` (`inviteId` ASC) VISIBLE,
  INDEX `fk_user_has_invite_user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_invite_invite1`
    FOREIGN KEY (`inviteId`)
    REFERENCES `aquadine`.`invite` (`inviteId`),
  CONSTRAINT `fk_user_has_invite_user`
    FOREIGN KEY (`userId`)
    REFERENCES `aquadine`.`user` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
