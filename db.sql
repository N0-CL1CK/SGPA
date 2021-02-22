CREATE TABLE `sgpa`.`discente_colaborador` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `reg_academico` VARCHAR(255) NOT NULL,
    `curso` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`discente_bolsista` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `reg_academico` VARCHAR(255) NOT NULL,
    `curso` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`coordenador_projeto` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `reg_funcional` VARCHAR(255) NOT NULL,
    `cargo` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`servidor_colaborador` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `reg_funcional` VARCHAR(255) NOT NULL,
    `cargo` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
)  ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`projeto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `duracao` INT NOT NULL,
  `num_edital` VARCHAR(255) NOT NULL,
  `val_tax_bancada` INT NOT NULL,
  `area_conhecimento` VARCHAR(255) NOT NULL,
  `stts` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `sgpa`.`projetoUser` (
	`id` INT NOT NULL AUTO_INCREMENT,
    `id_projeto` INT,
    `id_discente_colaborador` INT,
    `id_discente_bolsista` INT,
    `id_servidor_colaborador` INT,
    `id_coordenador_projeto` INT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (id_projeto) REFERENCES projeto(id),
    FOREIGN KEY (id_discente_colaborador) REFERENCES discente_colaborador(id),
    FOREIGN KEY (id_discente_bolsista) REFERENCES discente_bolsista(id),
    FOREIGN KEY (id_servidor_colaborador) REFERENCES servidor_colaborador(id),
    FOREIGN KEY (id_coordenador_projeto) REFERENCES coordenador_projeto(id)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

DROP TABLE projetoUser;
DROP TABLE projeto;
DROP TABLE discente_bolsista;
DROP TABLE discente_colaborador;
DROP TABLE coordenador_projeto;
DROP TABLE servidor_colaborador;

SELECT * FROM projetouser;
SELECT * FROM projeto;
SELECT * FROM discente_bolsista;
SELECT * FROM discente_colaborador;
SELECT * FROM servidor_colaborador;
SELECT * FROM coordenador_projeto;

SELECT DISTINCT p.*, db.nome as discente_bolsista, dc.nome as discente_colaborador, sv.nome as servidor_colaborador, cp.nome as coordenador_projeto
	FROM projeto AS p 
		INNER JOIN projetouser as pu
			INNER JOIN discente_bolsista as db
				INNER JOIN discente_colaborador as dc
					INNER JOIN servidor_colaborador as sv
						INNER JOIN coordenador_projeto as cp
							ON pu.id_projeto=1;
                            
SELECT DISTINCT p.*
	FROM projeto AS p 
		INNER JOIN projetouser as pu
			ON pu.id_projeto=1;


SELECT DISTINCT dc.* FROM projetouser pu
	INNER JOIN discente_colaborador dc
		ON pu.id_projeto = 1
			AND pu.id_discente_colaborador = dc.id;
            

SELECT DISTINCT p.stts, p.titulo, cp.nome as coordenador
	FROM projeto p
		LEFT JOIN coordenador_projeto cp
			ON p.id = cp.id;
