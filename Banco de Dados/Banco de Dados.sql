create database projeto_4bim;
use projeto_4bim;
CREATE TABLE IF NOT EXISTS `projeto_4bim`.`Book` (
  `id` INT NOT NULL auto_increment,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `available` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
---------------------------------------------------
-- Table `projeto_4bim`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_4bim`.`User` (
  `id` INT NOT NULL auto_increment,
  `email` VARCHAR(255) NOT NULL unique,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `projeto_4bim`.`loan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projeto_4bim`.`loan` (
  `id` INT NOT NULL auto_increment,
  `loan_left` DATE NOT NULL,
  `loan_return` DATE NOT NULL,
  `User_id` INT NOT NULL,
  `Books_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_loan_User_idx` (`User_id` ASC) ,
  INDEX `fk_loan_Book1_idx` (`Book_id` ASC) ,
  CONSTRAINT `fk_loan_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `projeto_4bim`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_loan_Book1`
    FOREIGN KEY (`Book_id`)
    REFERENCES `projeto_4bim`.`Book` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;