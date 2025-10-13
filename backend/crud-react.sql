/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80200 (8.2.0)
 Source Host           : localhost:3306
 Source Schema         : crud-react

 Target Server Type    : MySQL
 Target Server Version : 80200 (8.2.0)
 File Encoding         : 65001

 Date: 13/10/2025 13:32:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for funcionarios
-- ----------------------------
DROP TABLE IF EXISTS `funcionarios`;
CREATE TABLE `funcionarios`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cargo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salario` decimal(10, 2) NOT NULL,
  `data_admissao` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of funcionarios
-- ----------------------------
INSERT INTO `funcionarios` VALUES (7, 'Tony Kross', 'Desenvolvedor Ruby', 5000.00, '2025-10-05');
INSERT INTO `funcionarios` VALUES (2, 'Bruno Lima', 'Desenvolvedor Frontend', 6000.00, '2023-03-20');
INSERT INTO `funcionarios` VALUES (14, 'teste', 'teste', 1000.00, '2020-01-04');
INSERT INTO `funcionarios` VALUES (15, 'teste23', 'tetst', 400.00, '1009-01-13');

SET FOREIGN_KEY_CHECKS = 1;
