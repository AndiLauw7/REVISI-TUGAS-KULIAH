const {
  reportbarang,
  user,
  barangmasuk,
  barangkeluar,
} = require("../../models");
exports.addReport = async (req, res) => {
  try {
    const data = {
      iduser: req.body.iduser,
      idbarangmasuk: req.body.idbarangmasuk,
      idbarangkeluar: req.body.idbarangkeluar,
      qtymasuk: req.body.qtymasuk,
      qtykeluar: req.body.qtykeluar,
      tgl: req.body.tgl,
    };
    console.log(data);
    let newReport = await reportbarang.create(data);
    // console.log(newPersediaan);
    let dataReport = await reportbarang.findOne({
      where: {
        id: newReport.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: barangmasuk,
          as: "barangmasuk",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: barangkeluar,
          as: "barangkeluar",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    dataReport = JSON.parse(JSON.stringify(dataReport));
    console.log(dataReport);
    res.status(201).send({
      status: "success",
      data: {
        ...data,
        // data: {
        //   iduser: req.body.iduser,
        //   kodebarang: req.body.kodebarang,
        //   idmasuk: req.body.idmasuk,
        //   stokawal: req.body.stokawal,
        //   idkeluar: req.body.idkeluar,
        //   stokakhir: req.body.stokakhir,
        // },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "Failed",
      message: "server error",
    });
  }
};

exports.editReport = async (req, res) => {
  try {
    const { id } = req.params;
    let data = {
      iduser: req?.body?.iduser,
      idbarangmasuk: req?.body?.idbarangmasuk,
      idbarangkeluar: req?.body?.idbarangkeluar,
      tgl: req?.body?.tgl,
    };
    await reportbarang.update(data, {
      where: {
        id,
      },
    });
    let databarang = await reportbarang.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createAt", "updateAt", "password"],
          },
        },
        {
          model: barangmasuk,
          as: "barangmasuk",
          attributes: {
            exclude: ["createAt", "updateAt", "password"],
          },
        },
        {
          model: barangkeluar,
          as: "barangkeluar",
          attributes: {
            exclude: ["createAt", "updateAt", "password"],
          },
        },
      ],
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

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await reportbarang.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: `Delete Item ${id} Complete `,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Failed server error",
    });
  }
};

exports.getReports = async (req, res) => {
  try {
    let data = await reportbarang.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: barangmasuk,
          as: "barangmasuk",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: barangkeluar,
          as: "barangkeluar",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await reportbarang.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updateAt", "password"],
          },
        },
        {
          model: barangmasuk,
          as: "barangmasuk",
          attributes: {
            exclude: ["createdAt", "updateAt"],
          },
        },
        {
          model: barangkeluar,
          as: "barangkeluar",
          attributes: {
            exclude: ["createdAt", "updateAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    data = JSON.parse(JSON.stringify(data));

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
