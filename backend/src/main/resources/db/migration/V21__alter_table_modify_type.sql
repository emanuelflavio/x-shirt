ALTER TABLE tb_cart_items
    MODIFY `price_unitary` DECIMAL(10,2);

ALTER TABLE tb_order_items
    MODIFY `price_unitary` DECIMAL(10,2);