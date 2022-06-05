"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barangmasuks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namabarang: {
        type: Sequelize.STRING,
      },
      noinvoice: {
        type: Sequelize.STRING,
      },
      jenisbarang: {
        type: Sequelize.STRING,
      },
      qty: {
        type: Sequelize.STRING,
      },
      tglmasuk: {
        type: Sequelize.STRING,
      },
      keterangan: {
        type: Sequelize.STRING,
      },
      status: {
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
    await queryInterface.dropTable("barangmasuks");
  },
};
