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
import Logo from "../asset/newproduct.gif";
import NavUser from "../navbar/NavUser";
import Tabs from "../navbar/Tab";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../Config/api";
import DeleteData from "../modal/ModalDelete";

export default function Vendor() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [idDelete, setIdDelete] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [vendor, setVendors] = useState([]);

  const getVendors = async () => {
    try {
      const response = await API.get("/getbarangkeluars");
      setVendors(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/deleteitem/${id}`);
      getVendors();
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
    getVendors();
  }, []);

  const handleAdd = () => {
    navigate("/add-vendor");
  };
  const handleEdit = (id) => {
    navigate("/edit-keluar/" + id);
  };

  const [search, setSearch] = useState("");
  //  "penanda string kosong agar data tidak dianggap sudah ada"
  const searchFilter = vendor.filter((product) => {
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
            <h1 className="text-white">Barang Keluar</h1>
            <Button
              onClick={handleAdd}
              className="btn-red bg-red px-5 mb-2 mt-2 "
              variant="danger"
            >
              Add
            </Button>
            <Form className="d-flex mt-2 mb-2">
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-primary active">Search</Button>
            </Form>

            {vendor.length !== 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>No Invoice</th>
                    <th>Jenis Barang</th>
                    <th>Quantity</th>
                    <th>Tgl Keluar</th>
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
                      <td>{item.qtykeluar}</td>
                      <td>{item.tglkeluar}</td>
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
