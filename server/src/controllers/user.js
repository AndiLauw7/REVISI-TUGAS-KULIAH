const { user } = require("../../models");

// exports.getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const dataUser = await user.findOne({
//       where: {
//         id,
//       },

//       attributes: {
//         exclude: ["createdAt", "updatedAt", "password"],
//       },
//     });

//     res.send({
//       status: "success",
//       message: `User by id : ${id} `,
//       dataUser: {
//         id: dataUser.id,
//         fullName: dataUser.fullName,
//         email: dataUser.email,
//         // profile : dataUser.profile.image,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: "failed",
//       message: "Server Error",
//     });
//   }
// };

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        dataUser,
      },
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
