import "./AboutUs.css";

export default function ProfileCard({ name, image }) {
  return (
    <div className="main ">
      <div class="profile-card">
        <div class="img">
          <img src={image} alt="mem-img" />
        </div>
        <div class="caption">
          <h3>{name}</h3>
          <p>Full Stact Developer</p>
          <div class="social-links">
            <a href="#">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
