CREATE TABLE IF NOT EXISTS `tb_users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP,
    PRIMARY KEY (`id`)
    );
