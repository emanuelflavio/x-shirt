CREATE TABLE IF NOT EXISTS `tb_favorites` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `users_id` BIGINT NOT NULL,
  `shirt_id` BIGINT NOT NULL,
  `date_favorite` TIMESTAMP,
  PRIMARY KEY (`id`),
    CONSTRAINT fk_favorites_users FOREIGN KEY(users_id) REFERENCES tb_users(id),
    CONSTRAINT fk_favorites_shirt FOREIGN KEY(shirt_id) REFERENCES tb_shirts(id)
    );
