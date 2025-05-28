ALTER TABLE `tb_images_shirts`
DROP FOREIGN KEY `fk_images_shirts_shirts`;

ALTER TABLE `tb_images_shirts`
DROP COLUMN `shirt_id`;

ALTER TABLE `tb_images_shirts`
    ADD COLUMN `variations_id` BIGINT NOT NULL AFTER `id`;

ALTER TABLE `tb_images_shirts`
    ADD CONSTRAINT `fk_images_shirts_variations`
        FOREIGN KEY (`variations_id`) REFERENCES `tb_variations`(`id`);