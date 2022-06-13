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
  const [qtykeluar, setQtyKeluar] = useState("");
  const [tgl, setTgl] = useState("");
  const [Laporan, setLaporan] = useState({
    iduser: state.user.id,
    idbarangmasuk: idbarangmasuks,
    idbarangkeluar: idbarangkeluars,
    // namabarang: "",
    qtykeluar: qtymasuk,
    qtymasuk: qtykeluar,
    tgl: "",
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

  const getbarangkeluar = async () => {
    try {
      const response = await API.get("/getbarangkeluars");
      setBarangKeluar(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        name: qtykeluar,
        name: tgl,
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
              Barang Masuk
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
              Quantity Masuk
            </div>
            {barangmasuk.map((item, index) => (
              <label key={index} className="checkbox-inline text-white me-4">
                <input
                  className="text-white"
                  type="checkbox"
                  name="qtymasuk"
                  value={item.qtymasuk}
                  onClick={handleChange}
                />
                {item.qtymasuk}
              </label>
            ))}
          </div>

          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Barang Keluar
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

          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Quantity Keluar
            </div>

            <select
              class="form-select"
              size="3"
              aria-label="size 3 select example"
            >
              <option selected>Pilih Quantity</option>
              {barakeluar.map((item, index) => (
                <option key={index} value={qtykeluar} onClick={handleChange}>
                  {index + 1}.{item.qtykeluar} {item.namabarang}
                </option>
              ))}
            </select>
          </div>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Tgl</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="tgl"
              placeholder="tgl"
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
