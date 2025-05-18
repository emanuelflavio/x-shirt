CREATE TABLE IF NOT EXISTS `tb_order_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `order_id` INT NOT NULL,
    `variations_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `price_unitary` DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_order_itms_order FOREIGN KEY(order_id) REFERENCES tb_order(id),
    CONSTRAINT fk_order_itms_variations FOREIGN KEY(variations_id) REFERENCES tb_variations(id)
    );
