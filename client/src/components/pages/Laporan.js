import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Table,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import Tabs from "../navbar/Tab";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../Config/api";
import Logo from "../asset/nodata.gif";
import ModalDelete from "../modal/ModalDelete";
import { UserContext } from "../../Context/userContext";

export default function Invoice() {
  const { id } = useParams([]);
  let navigate = useNavigate();
  const [Laporan, SetLaporan] = useState([]);
  const [user, setUser] = useState({});

  const [state, dispatch] = useContext(UserContext);
  const iduser = state.user.id;

  const getProduct = async () => {
    try {
      const response = await API.get("/getReports");
      console.log(response);
      // Store product data to useState variabel
      SetLaporan(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [IdDelete, SetDeleteId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const DeleteLaporan = async (id) => {
    try {
      await API.delete(`/deleteReport/${id}`);
      getProduct();
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    SetDeleteId(id);
    handleShow();
  };

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      DeleteLaporan(IdDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  useEffect(() => {
    // getUser(id);
    getProduct();
  }, [id]);

  const handleAdd = () => {
    navigate("/add-invoice");
  };

  const [search, setSearch] = useState("");
  //  "penanda string kosong agar data tidak dianggap sudah ada"
  const searchFilter = Laporan.filter((product) => {
    return product?.tgl.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
            <h3 className="text-white">Laporan</h3>
            <Button
              onClick={handleAdd}
              className="btn-red bg-red px-5 mb-2 mt-1 "
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

            {Laporan.length !== 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Admin</th>
                    <th>Barang Masuk</th>
                    <th>Quantyti Masuk</th>
                    <th>Barang Keluar</th>
                    <th>Quantity Keluar</th>
                    <th>Tgl</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {searchFilter.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.user?.fullName}</td>
                      <td>{item.barangmasuk?.namabarang}</td>
                      <td>{item.barangmasuk?.qtymasuk}</td>
                      <td>{item.barangkeluar?.namabarang}</td>
                      <td>{item.barangkeluar?.qtykeluar}</td>
                      <td>{item.tgl}</td>
                      <td>
                        <div className="d-grid gap-5 d-md-block ml-3">
                          <Button
                            // onClick={() => {
                            //   handleEdit(item.id);
                            // }}
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
      <ModalDelete
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
}
