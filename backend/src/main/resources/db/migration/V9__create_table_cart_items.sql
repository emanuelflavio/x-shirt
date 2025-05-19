CREATE TABLE IF NOT EXISTS `tb_cart_items` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `cart_id` BIGINT NOT NULL,
    `variations_id` BIGINT NOT NULL,
    `quantity` INT NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_cart_items_cart FOREIGN KEY(cart_id) REFERENCES tb_carts(id),
    CONSTRAINT fk_cart_items_variations FOREIGN KEY(variations_id) REFERENCES tb_variations(id)
    );