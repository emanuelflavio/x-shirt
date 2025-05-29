ALTER TABLE `tb_cart_items`
DROP FOREIGN KEY `fk_cart_items_cart`;

ALTER TABLE `tb_cart_items`
    ADD CONSTRAINT `fk_cart_items_cart`
        FOREIGN KEY (`cart_id`) REFERENCES `tb_carts`(`id`)
            ON DELETE CASCADE;