import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  userLogout,
  checkAuthentication,
  clearUserData,
} from "../../Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


function Home() {
  const { user } = useSelector((state) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(userLogout());
    dispatch(clearUserData());
    navigate("/");
  };

  useEffect(() => {
    const authenticateUser = async () => {
      dispatch(checkAuthentication());
      setAuthChecked(true);
    };

    authenticateUser();
  }, [dispatch]);

  useEffect(() => {
    if (authChecked && user) {
      navigate("/home");
    }
  }, [authChecked, user, navigate]);

  if (!authChecked) {
    return null;
  }

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="user-welcome">
        <h2>Welcome, {user.name}!</h2>
        <h4><b>Email:</b>{user.email}</h4>
        <h4>Age:{user.age}</h4>
        <p>Explore your profile and manage your account.</p>
      </div>
      <button className="home-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;
