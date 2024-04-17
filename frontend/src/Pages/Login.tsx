import { useState } from "react";
import "../CSS/signup.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import left from "../../public/Assets/Left.png";
import { Link } from "react-router-dom";
import { Heading, Text } from "@chakra-ui/react";

export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: userName, password: password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        alert("Login Success");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
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
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
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

            <button className="registerButton" type="submit">
              Login
            </button>
          </form>
          <Text display={"flex"} gap={1} mt={10}>
            Already have an account?{" "}
            <Link to={"/signup"}>
              <Text style={{ color: "rgb(24, 203, 223)" }}>Sign up</Text>
            </Link>
          </Text>
        </div>
      </div>
    </>
  );
}
