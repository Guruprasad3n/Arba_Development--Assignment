import { useState } from "react";
import "../CSS/signup.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import left from "../../public/Assets/Left.png";
import { Link, useNavigate } from "react-router-dom";
import { Heading, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  signupFailure,
  signupSuccess,
} from "../redux/features/Login/authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullname,
          userName: username,
          email: email,
          password: password,
        }),
      });
      const data = await res.json();
      navigate("/login");
      console.log("data", data);
      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signupFailure(errorData.message));
        throw new Error(errorData.message);
      }
      dispatch(signupSuccess(data.user));

      alert("User registered successfully!");
    } catch (error) {}
  };

  return (
    <>
      <div className="main-Login-Signup">
        <div style={{ height: "100%" }}>
          <img style={{ height: "100%" }} src={left} alt="" />
        </div>
        <div style={{ height: "100%" }} className="form-card">
          <img
            className="profile"
            style={{ height: "100px", width: "100px", borderRadius: "50px" }}
            src={left}
            alt=""
          />
          <Heading textAlign={"center"}>APP NAME</Heading>
          <Text textAlign={"center"} width={"90%"} mb={10}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="text"
                placeholder="Fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className="form-field"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ marginRight: "10px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{ fontSize: "25px" }}
              >
                {showPassword ? (
                  <ViewOffIcon color={"rgb(24, 203, 223)"} />
                ) : (
                  <ViewIcon color={"rgb(24, 203, 223)"} />
                )}
              </span>
            </div>
            <div
              className="form-field"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{ marginRight: "10px" }}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                style={{ fontSize: "25px" }}
              >
                {showConfirmPassword ? (
                  <ViewOffIcon color={"rgb(24, 203, 223)"} />
                ) : (
                  <ViewIcon color={"rgb(24, 203, 223)"} />
                )}
              </span>
            </div>
            <button className="registerButton" type="submit">
              Register
            </button>
          </form>
          <Text display={"flex"} gap={1} mt={10}>
            Already have an account?{" "}
            <Link to={"/login"}>
              <Text style={{ color: "rgb(24, 203, 223)" }}>Login</Text>
            </Link>
          </Text>
        </div>
      </div>
    </>
  );
}
