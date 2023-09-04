import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../page/Footer";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [roleError, setRoleError] = useState(false);

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    e.preventDefault();

    if (!loginRequest.role) {
      setRoleError(true);
      return;
    } else {
      setRoleError(false);
    }
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Login failed"); // Throw an error if response status is not OK
        }
        return result.json();
      })
      .then((res) => {
        console.log(res);

        if (res.role === "Admin") {
          sessionStorage.setItem("active-admin", JSON.stringify(res));
          navigate("/home");
        } else if (res.role === "Customer") {
          sessionStorage.setItem("active-customer", JSON.stringify(res));
          navigate("/home");
        } else if (res.role === "Hotel") {
          sessionStorage.setItem("active-hotel", JSON.stringify(res));
          navigate("/user/hotel/bookings/all");
        }

        toast.success("Logged in successfully!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    // e.preventDefault();
  };

  return (
    <>
      <div>
        <div className="mt-4 d-flex aligns-items-center justify-content-center mb-5">
          <div
            className="card form-card border-color custom-bg"
            style={{ width: "25rem" }}
          >
            <div className="card-header bg-color text-center custom-bg-text">
              <h4 className="card-title">Login</h4>
            </div>
            <div className="card-body">
              <form>
                <div class="mb-3 text-color">
                  <label for="role" class="form-label">
                    <b>User Role</b>
                  </label>
                  <select
                    onChange={handleUserInput}
                    className="form-control"
                    name="role"
                  >
                    <option value="0">Select Role</option>
                    <option value="Admin"> Admin </option>
                    <option value="Customer"> Customer </option>
                    <option value="Hotel"> Hotel </option>
                  </select>
                  {roleError && (
                    <p className="error-message" style={{ color: "red" }}>
                      Please select the role
                    </p>
                  )}
                </div>

                <div className="mb-3 text-color">
                  <label for="emailId" class="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={loginRequest.emailId}
                  />
                </div>
                <div className="mb-3 text-color">
                  <label for="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={loginRequest.password}
                    autoComplete="on"
                  />
                </div>
                <button
                  type="submit"
                  className="btn bg-color custom-bg-text mb-3"
                  onClick={loginAction}
                >
                  Login
                </button>

                <div className="d-flex ">
  <p>Dont have an account? </p>
                <Link
          to="/user/customer/register"
          className="nav-link active"
          aria-current="page"
        >
          <p className="text-primary text-decoration-underline">  Register now</p>
        </Link>
        </div>


                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserLoginForm;
