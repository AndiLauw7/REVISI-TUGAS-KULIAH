"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reportbarang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reportbarang.belongsTo(models.user, {
        as: "user",
        model: "user",
        foreignKey: {
          name: "iduser",
        },
      });
      reportbarang.belongsTo(models.barangmasuk, {
        as: "barangmasuk",
        model: "barangmasuk",
        foreignKey: {
          name: "idbarangmasuk",
        },
      });
      reportbarang.belongsTo(models.barangkeluar, {
        as: "barangkeluar",
        model: "barangkeluar",
        foreignKey: {
          name: "idbarangkeluar",
        },
      });
    }
  }
  reportbarang.init(
    {
      iduser: DataTypes.INTEGER,
      idbarangmasuk: DataTypes.INTEGER,
      idbarangkeluar: DataTypes.INTEGER,
      qty: DataTypes.STRING,
      tgl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "reportbarang",
    }
  );
  return reportbarang;
};
