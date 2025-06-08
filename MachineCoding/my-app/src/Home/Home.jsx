import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Otp from "./Otp";
import { ImageCarousel } from "./ImageCarousel";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <ImageCarousel />
      <LoginForm />
      <Otp count={5} />
    </div>
  );
};

export default Home;
