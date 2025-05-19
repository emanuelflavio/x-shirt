CREATE TABLE IF NOT EXISTS `tb_carts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `active` BOOLEAN,
    `creation_date` TIMESTAMP,
    `users_id` BIGINT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_carts_user FOREIGN KEY(users_id) REFERENCES tb_users(id)
    );
