CREATE TABLE IF NOT EXISTS `tb_users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL UNIQUE,
    `password` VARCHAR(45) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `created_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`)
    );
