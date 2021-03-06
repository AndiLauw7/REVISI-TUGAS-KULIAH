import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Table,
  Nav,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import Tabs from "../navbar/Tab";
import DeleteData from "../modal/ModalDelete";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../Config/api";
import Logo from "../asset/newproduct.gif";

export default function Kategory() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [category, setCats] = useState([]);

  const getCategories = async () => {
    try {
      const response = await API.get("/getbarangmasuks");
      setCats(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/deletebarang/${id}`);
      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleAdd = () => {
    navigate("/add-kategory");
  };

  const handleEdit = (id) => {
    navigate("/edit-product/" + id);
  };

  const [search, setSearch] = useState("");
  //  "penanda string kosong agar data tidak dianggap sudah ada"
  const searchFilter = category.filter((product) => {
    return (
      product?.namabarang.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  });
  return (
    <div>
      <NavUser />

      <Container fluid className="mt-5">
        <Row>
          <Col lg={4}>
            <div>
              <Tabs />
            </div>
          </Col>
          <Col>
            <h3 className="text-white">Barang Masuk</h3>
            <Button
              onClick={handleAdd}
              className="btn-red bg-red px-5 mb-1 mt-1 "
              variant="danger"
            >
              Add
            </Button>
            <Form className="d-flex mt-1 mb-2">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-primary active">Search</Button>
            </Form>

            {category.length !== 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>No Invoice</th>
                    <th>Jenis Barang</th>
                    <th>Quantity</th>
                    <th>Tgl Masuk</th>
                    <th>Keterangan</th>
                    <th>Status</th>
                    <td>Action</td>
                  </tr>
                </thead>

                <tbody>
                  {searchFilter.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* <td>{item.barang?.namabarang}</td> */}
                      <td>{item.namabarang}</td>
                      <td>{item.noinvoice}</td>
                      <td>{item.jenisbarang}</td>
                      <td>{item.qtymasuk}</td>
                      <td>{item.tglmasuk}</td>
                      <td>{item.keterangan}</td>
                      <td>{item.status}</td>
                      <td>
                        <div className="d-grid gap-5 d-md-block ml-3">
                          <Button
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                            className="btn-succes bg-succes px-2 "
                            variant="outline-success"
                          >
                            Edit
                          </Button>

                          <Button
                            onClick={() => {
                              handleDelete(item.id);
                            }}
                            className="btn-red bg-red px-2 "
                            variant="outline-danger"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-2">
                <img
                  src={Logo}
                  className="img-fluid"
                  style={{ width: "40%" }}
                  alt="empty"
                />
                <div
                  className="mt-2"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  No Data Product
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}
