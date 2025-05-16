CREATE TABLE IF NOT EXISTS `tb_order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `payments_id` BIGINT NOT NULL,
    `users_id` BIGINT NOT NULL,
    `date_order` TIMESTAMP,
    `status` VARCHAR(45),
    `total` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_order_payment FOREIGN KEY(payments_id) REFERENCES tb_payment(id),
    CONSTRAINT fk_movie_streamig FOREIGN KEY(users_id) REFERENCES tb_users(id)
    );


