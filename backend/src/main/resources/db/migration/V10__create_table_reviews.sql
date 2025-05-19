CREATE TABLE IF NOT EXISTS `tb_review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `users_id` BIGINT NOT NULL,
    `shirt_id` BIGINT NOT NULL,
    `rating` DECIMAL(2,1) NOT NULL,
    `comment` TEXT,
    `date` TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_review_users FOREIGN KEY(users_id) REFERENCES tb_users(id),
    CONSTRAINT fk_review_shirt FOREIGN KEY(shirt_id) REFERENCES tb_shirts(id)
    );
