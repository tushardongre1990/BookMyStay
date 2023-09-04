import GetAllLocations from "../LocationComponent/GetAllLocations";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import HotelCard from "./HotelCard";
import HotelCarousel from "./HotelCarousel";
import GetHotelFacilities from "../FacilityComponent/GetHotelFacilities";
import GetHotelReviews from "../HotelReviewComponent/GetHotelReviews";
import { useNavigate } from "react-router-dom";
import Footer from "../page/Footer";

const Hotel = () => {
  const { hotelId, locationId } = useParams();

  let user = JSON.parse(sessionStorage.getItem("active-customer"));
  let admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [quantity, setQuantity] = useState("");

  const [hotels, setHotels] = useState([]);
  const [isAdmin, setIsAdmin] = useState(admin !== null); // Check if admin is logged in

  let navigate = useNavigate();

  const [facilitiesToPass, setFacilitiesToPass] = useState([]);

  const [hotel, setHotel] = useState({
    id: "",
    name: "",
    description: "",
    street: "",
    pincode: "",
    emailId: "",
    pricePerDay: "",
    totalRoom: "",
    image1: "",
    image2: "",
    image3: "",
    userId: "",
    location: { id: "", city: "", description: "" },
    facility: [{ id: "", name: "", description: "" }],
  });

  const [booking, setBooking] = useState({
    userId: "",
    hotelId: "",
    checkIn: "",
    checkOut: "",
    totalRoom: "",
    totalDay: "",
  });

  const handleBookingInput = (e) => {

    const { name, value } = e.target;
    // Special handling for the "totalRoom" field to prevent exceeding total rooms
    if (name === "totalRoom" && Number(value) > hotel.totalRoom) {
      setBooking({ ...booking, [name]: hotel.totalRoom.toString() });
    } else {
      setBooking({ ...booking, [name]: value });
    }

    //setBooking({ ...booking, [e.target.name]: e.target.value });


  };

  const retrieveHotel = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/hotel/id?hotelId=" + hotelId
    );

    return response.data;
  };

  useEffect(() => {
    const getHotel = async () => {
      const retrievedHotel = await retrieveHotel();

      setHotel(retrievedHotel.hotel);
    };

    const getHotelsByLocation = async () => {
      const allHotels = await retrieveHotelsByLocation();
      if (allHotels) {
        setHotels(allHotels.hotels);
      }
    };

    getHotel();
    getHotelsByLocation();

    console.log("Print hotel");
    console.log(hotel.json);

    setFacilitiesToPass(hotel.facility);
  }, [hotelId]);

  const retrieveHotelsByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/hotel/location?locationId=" + locationId
    );
    console.log(response.data);
    return response.data;
  };

  const bookHotel = (e) => {
    if (user == null) {
      alert("Please login as a customer to book the hotels !!!");
      e.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("hotelId", hotelId);
      formData.append("checkIn", booking.checkIn);
      formData.append("checkOut", booking.checkOut);
      formData.append("totalRoom", booking.totalRoom);
      formData.append("totalDay", booking.totalDay);

      console.log(formData);

      axios
        .post("http://localhost:8080/api/book/hotel/", formData)
        .then((result) => {
          result.json().then((res) => {
            console.log(res);
            console.log(res.responseMessage);
            alert("Hotel Booked Successfully!!!");
          });
        });
    }
  };

  const navigateToAddHotelFacility = () => {
    navigate("/hotel/" + hotelId + "/add/facility");
  };

  const navigateToAddReviewPage = () => {
    navigate("/hotel/" + hotelId + "/location/" + locationId + "/add/review");
  };

  const handleDeleteHotel = () => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      axios
        .delete(`http://localhost:8080/api/hotel/${hotelId}`)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Hotel Deleted Successfully");
            navigate("/");
          } else {
            toast.error("Failed to delete hotel");
          }
        })
        .catch((error) => {
          toast.error("An error occurred while deleting the hotel");
        });
    }
  };

  const calculateTotalDays = () => {
    if (booking.checkIn && booking.checkOut) {
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);

      const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      return Math.floor(daysDifference);
    }
    return 0;
  };

  useEffect(() => {
    // Update the total days whenever check-in or check-out dates change
    setBooking({ ...booking, totalDay: calculateTotalDays() });
  }, [booking.checkIn, booking.checkOut]);

  return (
    <div className="container-fluid mb-5">
      <div class="row">
        <div class="col-sm-3 mt-2">
          <div class="card form-card border-color custom-bg">
            <HotelCarousel
              item={{
                image1: hotel.image1,
                image2: hotel.image2,
                image3: hotel.image3,
              }}
            />
          </div>
        </div>
        <div class="col-sm-5 mt-2">
          <div class="card form-card border-color custom-bg">
            <div class="card-header bg-color">
              <div className="d-flex justify-content-between">
                <h1 className="custom-bg-text">{hotel.name}</h1>
              </div>
            </div>

            <div class="card-body text-left text-color">
              <div class="text-left mt-3">
                <h3>Description :</h3>
              </div>
              <h4 class="card-text">{hotel.description}</h4>
            </div>

            <div class="card-footer custom-bg">
              <div className="d-flex justify-content-between">
                <p>
                  <span>
                    <h4>Price : &#8377;{hotel.pricePerDay}</h4>
                  </span>
                </p>

                <p class="text-color">
                  <b>Total Room : {hotel.totalRoom}</b>
                </p>
              </div>

              <div>
                <form class="row g-3" onSubmit={bookHotel}>
                  <div class="col-auto">
                    <label for="checkin">Check-in</label>
                    <input
                      type="date"
                      class="form-control"
                      id="checkin"
                      name="checkIn"
                      onChange={handleBookingInput}
                      value={booking.checkIn}
                      min={new Date().toISOString().split("T")[0]} // Set the minimum date
                      required
                    />
                  </div>

                  <div class="col-auto">
                    <label for="checkout">Check-out</label>
                    <input
                      type="date"
                      class="form-control"
                      id="checkout"
                      name="checkOut"
                      onChange={handleBookingInput}
                      value={booking.checkOut}
                      min={new Date().toISOString().split("T")[0]} // Set the minimum date
                      required
                    />
                  </div>
                  <div class="col-auto">
            <label for="totalroom">Total Room</label>
            <input
              type="number"
              class="form-control"
              id="totalroom"
              name="totalRoom"
              onChange={handleBookingInput}
              value={booking.totalRoom}
              required
              max={hotel.totalRoom} // Set the maximum value
            />
          </div>
          
                  <div class="col-auto">
                    <label for="totalDay">Total Days</label>
                    <input
                      type="number"
                      class="form-control"
                      id="totalDay"
                      name="totalDay"
                      value={booking.totalDay}
                      readOnly // Make the input field read-only
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <div>
                      <input
                        type="submit"
                        class="btn custom-bg bg-color mb-3 text-white"
                        value="Book Hotel "
                      />
                    </div>
                  </div>
                </form>
              </div>

              {(() => {
                if (admin) {
                  console.log(admin);
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3 text-white"
                        value="Add Facilities"
                        onClick={navigateToAddHotelFacility}
                      />
                    </div>
                  );
                }
              })()}

              {isAdmin && (
                <div>
                  <input
                    type="button"
                    className="btn custom-bg bg-color text-white mb-3"
                    value="Delete Hotel"
                    onClick={handleDeleteHotel}
                  />
                </div>
              )}

              {(() => {
                if (user) {
                  console.log(user);
                  return (
                    <div>
                      <input
                        type="submit"
                        className="btn custom-bg bg-color mb-3 text-white"
                        value="Add Review"
                        onClick={navigateToAddReviewPage}
                      />
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
        <div class="col-sm-2 mt-2">
          <GetHotelFacilities item={hotel} />
        </div>

        <div class="col-sm-2 mt-2">
          <GetHotelReviews item={hotel} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-sm-12">
          <h2>Other Hotels in {hotel.location.city} Location:</h2>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {hotels.map((h) => {
              return <HotelCard item={h} />;
            })}
          </div>
        </div>
      </div>
      <br />
      <hr />
      <Footer />
    </div>
  );
};

export default Hotel;
