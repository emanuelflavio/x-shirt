CREATE TABLE IF NOT EXISTS `tb_shirts` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    `mark` VARCHAR(50),
    `genre` VARCHAR(50),
    `rating` DOUBLE,
    `categories_id` BIGINT NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT fk_shirts_categories FOREIGN KEY(categories_id) REFERENCES tb_categories(id)
    );
