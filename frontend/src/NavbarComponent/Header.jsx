import { Link } from "react-router-dom";
import logo from "../images/bookmystayLOGO.png";
import RoleNav from "./RoleNav";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-color  text-color ">
        <div className="container-fluid text-color">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              width="auto"
              height="50"
              className="d-inline-block align-top"
              alt=""
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-white">About Us</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  <b className="text-white">Contact Us</b>
                </Link>
              </li>
            </ul>

            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
