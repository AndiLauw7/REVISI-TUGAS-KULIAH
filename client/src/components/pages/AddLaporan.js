import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import { API } from "../../Config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

function AddInvoice() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [barangmasuk, setBarangMasuk] = useState([]);
  const [barakeluar, setBarangKeluar] = useState([]);
  const [idbarangmasuks, setMasukId] = useState("");
  const [qtymasuk, setQtyMasuk] = useState("");
  const [idbarangkeluars, setKeluarId] = useState("");
  const [namabarang, setNamaBarang] = useState("");
  const [qtyKeluar, setQtyKeluar] = useState("");
  const [tgl, setTgl] = useState("");
  const [Laporan, setLaporan] = useState({
    iduser: state.user.id,
    idbarangmasuk: idbarangmasuks,
    idbarangkeluar: idbarangkeluars,
    // namabarang: "",
    qtymasuk: "",
    qtyKeluar: "",
  });

  const getBarangMasuk = async () => {
    try {
      const response = await API.get("/getbarangmasuks");
      setBarangMasuk(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChangeBarangMasukId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;
  //   if (checked) {
  //     setMasukId([...idbarangmasuk, parseInt(id)]);
  //   } else {
  //     let newBarangMasukId = idbarangmasuk.filter((barangMasukIdItem) => {
  //       return barangMasukIdItem != id;
  //     });
  //     setMasukId(newBarangMasukId);
  //     console.log(newBarangMasukId);
  //   }
  // };
  const getbarangkeluar = async () => {
    try {
      const response = await API.get("/getbarangkeluars");
      setBarangKeluar(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleChangeBarangKeluarId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;
  //   if (checked) {
  //     setMasukId([...idbarangkeluar, parseInt(id)]);
  //   } else {
  //     let newBarangKeluarId = idbarangkeluar.filter((barangKeluarIdItem) => {
  //       return barangKeluarIdItem != id;
  //     });
  //     setMasukId(newBarangKeluarId);
  //     console.log(newBarangKeluarId);
  //   }
  // };
  const handleChange = (e) => {
    setLaporan({
      ...Laporan,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    const id = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setMasukId([...idbarangmasuks, parseInt(id)]);
    } else {
      let newBarangMasukId = idbarangmasuks.filter((barangMasukIdItem) => {
        return barangMasukIdItem != id;
      });
      setMasukId(newBarangMasukId);
      console.log(newBarangMasukId);
    }
    if (checked) {
      setKeluarId([...idbarangkeluars, parseInt(id)]);
    } else {
      let newBarangKeluarId = idbarangkeluars.filter((barangKeluarIdItem) => {
        return barangKeluarIdItem != id;
      });
      setKeluarId(newBarangKeluarId);
      console.log(newBarangKeluarId);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "aplication/json",
        },
      };
      const body = JSON.stringify({
        name: idbarangmasuks,
        name: idbarangkeluars,
        name: qtymasuk,
        name: qtyKeluar,
      });
      const response = await API.post("/addreports", Laporan, body, config);
      console.log(body);
      console.log(response);
      navigate("/laporan");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBarangMasuk();
    getbarangkeluar();
  }, []);

  return (
    <div>
      <NavUser />
      <Container className="mt-5">
        <h1>Tambah Data Laporan</h1>
        <Form onSubmit={handleSubmit}>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Nama Barang
            </div>
            {barangmasuk.map((item, index) => (
              <label key={index} className="checkbox-inline text-white me-4">
                <input
                  className="text-white"
                  type="checkbox"
                  name="idbarangmasuk"
                  value={item.id}
                  onClick={handleChange}
                />
                {item.namabarang}
              </label>
            ))}
          </div>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Nama Barang
            </div>
            {barakeluar.map((item, index) => (
              <label key={index} className="checkbox-inline text-white me-4">
                <input
                  className="text-white"
                  type="checkbox"
                  name="idbarangkeluar"
                  value={item.id}
                  onClick={handleChange}
                />
                {item.namabarang}
              </label>
            ))}
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Barang</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="namabarang"
              placeholder="nama barang"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">No Invoice</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="noinvoice"
              placeholder="name invoice"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Jenis Barang</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="jenisbarang"
              placeholder="name jenis barang"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Quantity</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="qtymasuk"
              placeholder="name qty"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Tanggal Masuk</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="tglmasuk"
              placeholder="name date"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Keterangan</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="keterangan"
              placeholder="name keterangan"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Status</Form.Label>
            <Form.Control
              // onChange={handleChange}
              type="text"
              name="status"
              placeholder="name status"
            />
          </Form.Group>
          <div className="d-grid gap-2 mt-4">
            <Button type="submit" variant="success" size="md">
              Add
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default AddInvoice;
