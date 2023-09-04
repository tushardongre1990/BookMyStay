import Footer from "./Footer";
import ProfileCard from "./ProfileCard";
import image1 from "../images/Anushri.jpg";
import image2 from "../images/Tushar.png";
import image3 from "../images/Tejas.jpg";
import image4 from "../images/Prem.jpeg";
import image5 from "../images/Prashant.jpg";
import image6 from "../images/Harshad.jpg";

const AboutUs = () => {
  return (
    <>
      <div className="text-center m-5">
        <p>
        At Hotel BookMyStay, our mission is to ensure travelers enjoy a seamless and effortless booking journey, presenting a diverse selection of top-notch accommodations and amenities for a memorable stay. Discover a world of comfort and luxury with us.
        </p>
        <h1 className="text-center">Our Team</h1>
      </div>
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <ProfileCard name="Anushri " image={image1} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <ProfileCard name="Tushar" image={image2} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <ProfileCard name="Tejas " image={image3} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <ProfileCard name="Prem " image={image4} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <ProfileCard name="Prashant " image={image5} />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <ProfileCard name="Harshad " image={image6} />
          </div>
        </div>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          commodi optio similique, ab unde, maiores in natus nulla suscipit
          autem assumenda cumque praesentium molestias sunt. Ullam expedita vero
          quaerat exercitationem distinctio iusto error et, nulla alias culpa,
          eaque possimus ex debitis ipsum eveniet sapiente maxime quo
          consequatur accusamus tenetur? Aspernatur.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
