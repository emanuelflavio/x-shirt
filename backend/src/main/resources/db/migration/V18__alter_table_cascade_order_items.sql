ALTER TABLE `tb_order_items`
DROP FOREIGN KEY `fk_order_items_order`;

ALTER TABLE `tb_order_items`
    ADD CONSTRAINT `fk_order_items_order`
        FOREIGN KEY (`order_id`) REFERENCES `tb_order`(`id`)
            ON DELETE CASCADE;