CREATE TABLE IF NOT EXISTS `tb_variations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `shirt_id` BIGINT NOT NULL,
    `size` VARCHAR(10) NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `stock` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_variations_shit FOREIGN KEY(shirt_id) REFERENCES tb_shirts(id)
);

