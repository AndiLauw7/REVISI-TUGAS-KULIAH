import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import { API } from "../../Config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

function AddKategory() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [barang, setBarang] = useState([]);
  const [idbarangs, setBarangId] = useState("");
  const [noinvoive, setnoInvoive] = useState("");
  const [tgl, setTgl] = useState("");
  const [qty, setQty] = useState("");
  const [masuk, setMasuk] = useState({
    idbarang: idbarangs,
    noinvoive: "",
    tgl: "",
    qty: "",
  });

  // console.log(idbarang);

  const getBarangs = async () => {
    try {
      const response = await API.get("/getbarangs");
      setBarang(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleChangeBarangId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;
  //   if (checked) {
  //     setBarangId([...idbarangs, parseInt(id)]);
  //   } else {
  //     let newBarangId = idbarangs.filter((barangIdItem) => {
  //       return barangIdItem != id;
  //     });
  //     setBarangId(newBarangId);
  //     console.log(newBarangId);
  //   }
  // };

  const handleChange = (e) => {
    setMasuk({
      ...masuk,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    const id = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setBarangId([...idbarangs, parseInt(id)]);
    } else {
      let newBarangId = idbarangs.filter((barangIdItem) => {
        return barangIdItem != id;
      });
      setBarangId(newBarangId);
      console.log(newBarangId);
    }
  };
  console.log(idbarangs);
  console.log(masuk);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // const formData = new FormData();
      // formData.set("noinvoive", masuk.noinvoive);
      // formData.set("tgl", masuk.qty);
      // formData.set("qty", masuk.qty);
      // formData.set("idbarang", idbarangs);

      // Data body
      const body = JSON.stringify({
        name: idbarangs,
        name: noinvoive,
        name: tgl,
        name: qty,
      });

      // Insert category data
      const response = await API.post(
        "/addbarangmasuk",
        masuk,
        // formData,
        body,
        config
      );

      console.log(body);
      console.log(response);
      navigate("/kategory");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBarangs();
  }, []);

  return (
    <div>
      <NavUser />
      <Container className="mt-5">
        <h1>Add kategory</h1>
        <Form onSubmit={handleSubmit}>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Nama Barang
            </div>
            {barang.map((item, index) => (
              <label key={index} className="checkbox-inline text-white me-4">
                <input
                  className="text-white"
                  type="checkbox"
                  name="idbarang"
                  value={item.id}
                  onClick={handleChange}
                />
                {item.namabarang}
              </label>
            ))}
          </div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="noinvoive"
              placeholder="name product"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="tgl"
              placeholder="name product"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="qty"
              placeholder="name product"
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

export default AddKategory;
