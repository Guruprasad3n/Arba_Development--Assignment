import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CarouselComponent from "./Components/CarouselComponent";
import HomePage from "./Pages/HomePage";
import AllProducts from "./Pages/AllProducts";
import Cart from "./Pages/Cart";
import MyStore from "./Pages/MyStore";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path={"/my-store"} element={<h1>Hello Store</h1>} /> */}
        {/* <Route path={"/"} element={<CarouselComponent />} /> */}
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/all-products"} element={<AllProducts />} />
        <Route path={"/my-store"} element={<MyStore />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
