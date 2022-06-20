import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./Context/userContext";
import Home from "./components/pages/Home";
import Laporan from "./components/pages/Laporan";
import BarangMasuk from "./components/pages/BarangMasuk";
import Product from "./components/pages/Product";

import Keluar from "./components/pages/BarangKeluar";
import { API, setAuthToken } from "./Config/api";
import Tabs from "./components/navbar/Tab";
import AddProduct from "./components/pages/AddProduct";
import AddLaporan from "./components/pages/AddLaporan";
import AddMasuk from "./components/pages/AddMasuk";
import AddKeluar from "./components/pages/AddKeluar";
import EditProduct from "./components/pages/EditProduct";
import EditKeluar from "./components/pages/EditKeluar";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      return navigate("/");
    } else {
      return navigate("/");
    }
  }, [state]);
  console.log(state);
  //always check auth
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      if (response?.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      // console.log(response);
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route exact path="/product" element={<Product />} />
      <Route exact path="/edit-product/:id" element={<EditProduct />} />
      <Route exact path="/add-product" element={<AddProduct />} /> */}

      <Route exact path="/kategory" element={<BarangMasuk />} />
      <Route exact path="/add-kategory" element={<AddMasuk />} />

      <Route exact path="/data-keluar" element={<Keluar />} />
      <Route exact path="/add-vendor" element={<AddKeluar />} />
      <Route exact path="/edit-keluar/:id" element={<EditKeluar />} />

      <Route exact path="/laporan" element={<Laporan />} />
      <Route exact path="/add-invoice" element={<AddLaporan />} />
    </Routes>
  );
}

export default App;
