import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Otp from "./Otp";

const Home = () => {
  return (
    <div>
      <LoginForm />
      <Otp count={5} />
    </div>
  );
};

export default Home;
