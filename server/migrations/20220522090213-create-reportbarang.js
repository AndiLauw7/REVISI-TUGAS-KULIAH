"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reportbarangs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iduser: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      idbarangmasuk: {
        type: Sequelize.INTEGER,
        references: {
          model: "barangmasuks",
          key: "id",
        },
      },
      idbarangkeluar: {
        type: Sequelize.INTEGER,
        references: {
          model: "barangkeluars",
          key: "id",
        },
      },
      qtymasuk: {
        type: Sequelize.STRING,
        references: {
          model: "barangmasuks",
          key: "qtymasuk",
        },
      },
      qtykeluar: {
        type: Sequelize.STRING,
        references: {
          model: "barangkeluars",
          key: "qtykeluar",
        },
      },
      tgl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reportbarangs");
  },
};
