CREATE TABLE IF NOT EXISTS `tb_address` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(50),
    `number` VARCHAR(20),
    `city` VARCHAR(50),
    `state` VARCHAR(50),
    `zip code` VARCHAR(20),
    `complement` VARCHAR(50),
    `users_id` BIGINT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_address_users FOREIGN KEY(users_id) REFERENCES tb_users(id)
    );
