CREATE TABLE IF NOT EXISTS `tb_payment` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `method` VARCHAR(50),
    `status` VARCHAR(50),
    `value` DECIMAL(10,2) NOT NULL,
    `date_payment` TIMESTAMP,
    `transaction_id` VARCHAR(50),
    PRIMARY KEY (`id`)
    );
