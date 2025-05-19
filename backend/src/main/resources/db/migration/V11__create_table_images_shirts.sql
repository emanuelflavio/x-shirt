CREATE TABLE IF NOT EXISTS `tb_images_shirts` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `shirt_id` BIGINT NOT NULL,
  `url_image` TEXT NOT NULL,
  `main` BOOLEAN,
  PRIMARY KEY (`id`),
  CONSTRAINT fk_images_shirts_shirts FOREIGN KEY(shirt_id) REFERENCES tb_shirts(id)
    );


