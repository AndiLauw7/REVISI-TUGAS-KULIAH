"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barangkeluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  barangkeluar.init(
    {
      namabarang: DataTypes.STRING,
      noinvoice: DataTypes.STRING,
      jenisbarang: DataTypes.STRING,
      qtykeluar: DataTypes.STRING,
      tglkeluar: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "barangkeluar",
    }
  );
  return barangkeluar;
};
