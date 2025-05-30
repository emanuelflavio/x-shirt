ALTER TABLE `tb_order`
    ADD `address_id` BIGINT NOT NULL;

ALTER TABLE `tb_order`
    ADD CONSTRAINT `fk_order_address`
        FOREIGN KEY (`address_id`) REFERENCES `tb_address`(`id`);

alter table `tb_cart_items`
    add `price_unitary` BIGINT NOT NULL;

alter table `tb_cart_items`
    add `subtotal_price` DECIMAL(10,2) NOT NULL;

alter table `tb_order_items`
    add `subtotal_price` DECIMAL(10,2) NOT NULL;
