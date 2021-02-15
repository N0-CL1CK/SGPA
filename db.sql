CREATE TABLE `sgpa`.`discente_colaborador` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `reg_academico` VARCHAR(20) NOT NULL,
    `curso` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`discente_bolsista` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `reg_academico` VARCHAR(20) NOT NULL,
    `curso` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`coordenador_projeto` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `reg_funcional` VARCHAR(20) NOT NULL,
    `cargo` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`servidor_colaborador` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `reg_funcional` VARCHAR(20) NOT NULL,
    `cargo` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`projeto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL,
  `duracao` INT NOT NULL,
  `num_edital` CHAR NOT NULL,
  `val_tax_bancada` INT NOT NULL,
  `area_conhecimento` VARCHAR(50) NOT NULL,
  `id_coordenador_projeto` INT NULL,
  `id_servidor_colaborador` INT NULL,
  `id_discente_colaborador` INT NULL,
  `id_discente_bolsista` INT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

ALTER TABLE `projeto` ADD CONSTRAINT `fk_coord_proj` FOREIGN KEY (`id_coordenador_projeto`) REFERENCES `coordenador_projeto` (`id`);
ALTER TABLE `projeto` ADD CONSTRAINT `fk_servidor_colab` FOREIGN KEY (`id_servidor_colaborador`) REFERENCES `servidor_colaborador` (`id`);
ALTER TABLE `projeto` ADD CONSTRAINT `fk_disc_colab` FOREIGN KEY (`id_discente_colaborador`) REFERENCES `discente_colaborador` (`id`);
ALTER TABLE `projeto` ADD CONSTRAINT `fk_disc_bolsista` FOREIGN KEY (`id_discente_bolsista`) REFERENCES `discente_bolsista` (`id`);