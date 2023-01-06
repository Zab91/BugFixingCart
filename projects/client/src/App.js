import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { LoginPage } from "./pages/LoginUser";
import { UserProfile } from "./pages/ProfilePage";
import Register from "./components/register";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "./redux/userSlice";
import CartDetail from "./components/CartComp";
import DetailPage from "./pages/DetailPage";
import Search from "./components/search";
import NotFound from "./components/404";

//keeplogin url
const urlKeepLogin = `http://localhost:8000/usersLogin/keepLogin`;

function App() {
  //function keeplogin
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // console.log(token)

  const keepLogin = async () => {
    try {
      const res = await axios.get(urlKeepLogin, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      dispatch(login(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    keepLogin();
  }, []);

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!"geolocation in navigator") {
      onError({
        code: 0,
        message: "geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  console.log(location);

  const myStyle = {
    maxWidth: "506px",
    heigth: "auto",
    backgroundColor: "white",
    margin: "auto",
  };
  const bodyStyle = {
    backgroundColor: "grey",
    width: "auto",
    height: "auto",
  };

  return (
    <div style={bodyStyle}>
      <div style={myStyle}>
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Cart" element={<CartDetail />} />
          <Route
            path="/*"
            element={
              <>
                <NotFound />
                <Navbar />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <>
                <Search />
                <DetailPage />
                <Navbar />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route path="/transaksi" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
