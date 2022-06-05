const { barangkeluar } = require("../../models");

exports.addbarangkeluar = async (req, res) => {
  try {
    const data = {
      namabarang: req.body.namabarang,
      jenisbarang: req.body.jenisbarang,
      noinvoice: req.body.noinvoice,
      qty: req.body.qty,
      tglkeluar: req.body.tglkeluar,
      keterangan: req.body.keterangan,
      status: req.body.status,
    };
    console.log(data);

    let newKeluar = await barangkeluar.create(data);
    console.log(newKeluar);

    let keluarData = await barangkeluar.findOne({
      where: {
        id: newKeluar.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    keluarData = JSON.parse(JSON.stringify(keluarData));

    res.status(201).send({
      status: "succes",
      data: {
        ...keluarData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.editbarangkeluar = async (req, res) => {
  try {
    const { id } = req.params;
    let data = {
      namabarang: req?.body?.namabarang,
      jenisbarang: req?.body?.jenisbarang,
      noinvoice: req?.body?.noinvoice,
      qty: req?.body?.qty,
      tglkeluar: req?.body?.tglkeluar,
      keterangan: req?.body?.keterangan,
      status: req?.body?.status,
    };
    await barangkeluar.update(data, {
      where: {
        id,
      },
    });
    let databarang = await barangkeluar.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        id,
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deletebarangkeluar = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.params;
    await barangkeluar.destroy({
      where: {
        id,
      },
    });

    res.status(201).send({
      status: "success",
      message: `delete item ${id} complete`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getbarangkeluars = async (req, res) => {
  try {
    let data = await barangkeluar.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "server error",
    });
  }
};

exports.getbarangkeluar = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await barangkeluar.findOne({
      where: {
        id,
      },

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    res.status(201).send({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "server error",
    });
  }
};
