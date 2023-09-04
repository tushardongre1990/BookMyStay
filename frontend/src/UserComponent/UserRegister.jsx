// --------------------------------------------------------------------

import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../page/Footer";

import "./formInput.css";

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  if (document.URL.indexOf("admin") !== -1) {
    user.role = "Admin";
  } else if (document.URL.indexOf("hotel") !== -1) {
    user.role = "Hotel";
  } else if (document.URL.indexOf("customer") !== -1) {
    user.role = "Customer";
  }

  console.log("ROLE FECTHED : " + user.role);

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };
  const navigate = useNavigate();

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  //  Validations
  const [errors, setErrors] = useState({});

  //validation functions for each field:
  const validateFirstName = (value) => {
    // Validation logic for first name
    if (!/^[A-Za-z]{3,16}$/.test(value)) {
      return "First name should be 3-16 characters long and contain only letters.";
    }
    return "";
  };

  const validateLastName = (value) => {
    // Validation logic for last name
    if (!/^[A-Za-z]{3,16}$/.test(value)) {
      return "Last name should be 3-16 characters long and contain only letters.";
    }
    return "";
  };

  const validateEmail = (value) => {
    // Validation logic for email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return "Invalid email format.";
    }
    return "";
  };

  const validatePassword = (value) => {
    // Validation logic for password
    if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}/.test(
        value
      )
    ) {
      return "Password should be 8-20 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.";
    }
    return "";
  };

  const validateContactNo = (value) => {
    // Validation logic for Indian mobile number
    if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(value)) {
      return "Invalid Indian mobile number.";
    }
    return "";
  };

  const validateAge = (value) => {
    // Validation logic for age
    const age = parseInt(value, 10);
    if (isNaN(age) || age < 18 || age > 100) {
      return "Age must be a number between 18 and 100.";
    }
    return "";
  };
  const validateCityName = (value) => {
    // Validation logic for city name
    if (!/^[A-Za-z\s]{1,50}$/.test(value) || value.split(/\s+/).length > 2) {
      return "Not a valid city name.";
    }
    return "";
  };

  const validatePinCode = (value) => {
    // Validation logic for Indian PIN code
    if (!/^[1-9][0-9]{5}$/.test(value)) {
      return "Not a valid Indian PIN code.";
    }
    return "";
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    setUser({ ...user, [name]: value });
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "firstName":
        return validateFirstName(value);
      case "lastName":
        return validateLastName(value);
      case "emailId":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "contact":
        return validateContactNo(value);
      case "age":
        return validateAge(value);
      case "city":
        return validateCityName(value);
      case "pincode":
        return validatePinCode(value);
      // Implement cases for other fields...
      default:
        return "";
    }
  };

  const saveUser = (event) => {
    event.preventDefault();

    const validationErrors = {};

    // Perform validation for each field
    Object.keys(user).forEach((fieldName) => {
      const errorMessage = validateField(fieldName, user[fieldName]);
      if (errorMessage) {
        validationErrors[fieldName] = errorMessage;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      if (result.status == 200) {
        toast.success("Registered Successfully!!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("User Already Registered !!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      let newUser = {
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        contact: "",
        street: "",
        city: "",
        pincode: "",
        role: "",
        age: "",
        sex: "",
      };
      setUser(newUser);
    });
  };

  return (
    <>
      <div>
        <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
          <div
            className="card form-card border-color text-color custom-bg"
            style={{ width: "50rem" }}
          >
            <div className="card-header bg-color custom-bg-text text-center">
              <h5 className="card-title">Register as {user.role}</h5>
            </div>
            <div className="card-body">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color ">
                  <label htmlFor="title" className="form-label">
                    <b> First Name</b>
                  </label>
                  <input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Firstname"
                    onChange={handleUserInput}
                    value={user.firstName}
                    required
                  />
                  {errors.firstName && (
                    <p className="error-message">{errors.firstName}</p>
                  )}
                </div>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="description" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                    pattern="[a-zA-Z\s]+"
                    required
                  />
                  {errors.lastName && (
                    <p className="error-message">{errors.lastName}</p>
                  )}
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <b>
                    <label className="form-label">Email Id</label>
                  </b>
                  <input
                    type="text"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                    required
                  />
                  {errors.emailId && (
                    <p className="error-message">{errors.emailId}</p>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="quantity" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                    required
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="sex" className="form-label">
                    <b>User Gender</b>
                  </label>
                  <select
                    onChange={handleUserInput}
                    className="form-control"
                    name="sex"
                    required
                  >
                    <option value="0">Select Gender</option>

                    {genders.map((gender) => {
                      return <option value={gender}> {gender} </option>;
                    })}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="contact" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    name="contact"
                    onChange={handleUserInput}
                    value={user.contact}
                    required
                  />
                  {errors.contact && (
                    <p className="error-message">{errors.contact}</p>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="contact" className="form-label">
                    <b>Age</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    onChange={handleUserInput}
                    value={user.age}
                    required
                  />
                  {errors.age && <p className="error-message">{errors.age}</p>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b> Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                    required
                  />
                  {errors.city && (
                    <p className="error-message">{errors.city}</p>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                    required
                  />
                  {errors.pincode && (
                    <p className="error-message">{errors.pincode}</p>
                  )}
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text col-md-3"
                    value="Register User"
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <p>Already a user?</p>
                  <Link
                    to="/user/login"
                    className="nav-link active"
                    aria-current="page"
                  >
                    <p className="text-primary text-decoration-underline">
                      Login now
                    </p>
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
export default UserRegister;
