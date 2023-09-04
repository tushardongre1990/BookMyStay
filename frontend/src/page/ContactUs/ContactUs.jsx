// import { useState } from "react";
// import "./contactUs.css";
// import Footer from "../Footer";

// const ContactUs = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [message, setMessage] = useState("");

//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [mobileError, setMobileError] = useState("");

//   const handleNameChange = (event) => {
//     const newName = event.target.value;
//     setName(newName);
//     if (newName.length < 3 || /\d|\W/.test(newName)) {
//       setNameError(
//         "Name must be at least 3 characters and contain no numbers or special characters."
//       );
//     } else {
//       setNameError("");
//     }
//   };

//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (!emailPattern.test(newEmail)) {
//       setEmailError("Invalid email address.");
//     } else {
//       setEmailError("");
//     }
//   };

//   const handleMobileChange = (event) => {
//     const newMobile = event.target.value;
//     setMobile(newMobile);
//     if (newMobile.length !== 10 || !/^\d+$/.test(newMobile)) {
//       setMobileError("Mobile number must be 10 digits long.");
//     } else {
//       setMobileError("");
//     }
//   };

//   const handleMessageChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     if (!nameError && !emailError && !mobileError) {
//       // Formspree submission logic here
//     } else {
//       event.preventDefault(); // Prevent submission if there are errors
//     }
//   };
//   return (
//     <>
//       <div className="container d-flex align-items-center justify-content-center vh-100">
//         <form
//           action="https://formspree.io/f/xyyqywrd"
//           method="POST"
//           onSubmit={handleSubmit}
//         >
//           <h3>Get In Touch</h3>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             placeholder="Your Name"
//             value={name}
//             onChange={handleNameChange}
//             required
//           />
//           <div className="error">{nameError}</div>

//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Your Email Id"
//             value={email}
//             onChange={handleEmailChange}
//             required
//           />
//           <div className="error">{emailError}</div>

//           <input
//             type="tel"
//             name="mobile_no"
//             id="phone"
//             placeholder="Mobile Number"
//             value={mobile}
//             onChange={handleMobileChange}
//             required
//           />
//           <div className="error">{mobileError}</div>

//           <textarea
//             name="message"
//             id="message"
//             rows="4"
//             placeholder="How can we help you."
//             value={message}
//             onChange={handleMessageChange}
//           ></textarea>

//           <button type="submit">Send</button>
//         </form>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ContactUs;

import { useState } from "react";
// import "./contactUs.css"; // Your custom CSS file (if needed)
import Footer from "../Footer";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    if (newName.length < 3 || /[^a-zA-Z ]/.test(newName)) {
      setNameError(
        "Name must be at least 3 characters and contain no numbers or special characters."
      );
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(newEmail)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleMobileChange = (event) => {
    const newMobile = event.target.value;
    setMobile(newMobile);
    if (
      newMobile.length !== 10 ||
      !/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/.test(newMobile)
    ) {
      setMobileError("Invalid Indian mobile number.");
    } else {
      setMobileError("");
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    if (!nameError && !emailError && !mobileError) {
      // Formspree submission logic here
    } else {
      event.preventDefault(); // Prevent submission if there are errors
    }
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <form
          className="bg-white p-5 w-50 rounded-3 "
          action="https://formspree.io/f/xyyqywrd"
          method="POST"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4 text-center">Get In Touch</h3>
          <label>
            <b>Name</b>
          </label>
          <input
            type="text"
            className="form-control mb-2"
            name="name"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <div className="error" style={{ color: "red" }}>
            {nameError}
          </div>
          <label>
            <b>Email</b>
          </label>
          <input
            type="email"
            className="form-control mb-2"
            name="email"
            id="email"
            placeholder="Your Email Id"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div className="error" style={{ color: "red" }}>
            {emailError}
          </div>
          <label>
            <b>Mobile Number</b>
          </label>
          <input
            type="tel"
            className="form-control mb-2"
            name="mobile_no"
            id="phone"
            placeholder="Mobile Number"
            value={mobile}
            onChange={handleMobileChange}
            required
          />
          <div className="error" style={{ color: "red" }}>
            {mobileError}
          </div>
          <label>
            <b>Your Message</b>
          </label>
          <textarea
            className="form-control mb-2"
            name="message"
            id="message"
            rows="4"
            placeholder="How can we help you."
            value={message}
            onChange={handleMessageChange}
            required
          ></textarea>

          {/* <button type="submit" className="btn btn-success">
            Send
          </button> */}

          <button
            type="submit"
            className="btn btn-success"
            style={{
              background:
                "linear-gradient(45deg, rgba(143, 28, 207, 1) 0%, rgba(25, 36, 158, 1) 100%)",
            }}
          >
            Send
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
