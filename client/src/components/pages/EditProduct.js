import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavUser from "../navbar/NavUser";
import { API } from "../../Config/api";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [preview, setPreview] = useState(null); //For image preview
  // const [namabarang, setBarang] = useState([]);
  const [form, setForm] = useState({
    namabarang: "",
  });

  const getProduct = async (id) => {
    try {
      const response = await API.get("/getbarang/" + id);
      // Store product data to useState variabel

      setForm({
        ...form,
        name: response.data.data.namabarang,
      });
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // const body = JSON.stringify({
      //   name: namabarang,
      // });
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Store data with FormData as object

      // Insert product data
      const response = await API.patch(
        "/editBarang/" + product.id,
        form,
        config
      );
      console.log(form);
      // if (response.status === "success") {
      navigate("/product");
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <div>
      <NavUser />
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="namabarang"
              placeholder="name product"
            />
          </Form.Group>
          {/* {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt="preview"
              />
            </div>
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="text-white">Input Image Products</Form.Label>
            <Form.Control onChange={handleChange} type="file" name="image" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Price Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="price"
              placeholder="Price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Quantity</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="qty"
              placeholder="Qty"
            />
          </Form.Group>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>

            <label className="checkbox-inline text-white me-4">
              <input
                className="text-white"
                type="checkbox"
                name="catname"
                value={form.catname}
                // onClick={handleChangeCategoryId}
                onChange={handleChange}
              />{" "}
              {form.name}
            </label>
          </div>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Vendor
            </div>

            <label className="checkbox-inline text-white  me-4">
              <input
                className="text-white"
                type="checkbox"
                name="venname"
                value={form.venname}
                // onClick={handleVendorId}
                onChange={handleChange}
              />{" "}
              {form.name}
            </label>
          </div> */}

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

export default EditProduct;
