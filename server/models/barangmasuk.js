"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class barangmasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  barangmasuk.init(
    {
      namabarang: DataTypes.STRING,
      noinvoice: DataTypes.STRING,
      jenisbarang: DataTypes.STRING,
      qtymasuk: DataTypes.STRING,
      tglmasuk: DataTypes.STRING,
      keterangan: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "barangmasuk",
    }
  );
  return barangmasuk;
};
