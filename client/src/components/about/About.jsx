import { Link } from "react-router-dom";

export default function About(){
    return (
     <>
      <section className="about_section layout_padding">
    <div className="container">
      <div className="detail-box">
        <div className="heading_container">
          <img src="images/heading-img.png" alt="" />
          <h2>
            About Us
          </h2>
        </div>
        <p>
          We are a global community dedicated to pet lovers everywhere! We created this platform for all who cherish their furry, feathered, or scaly friends and want to share their joy with the world. Here, you can showcase your beloved pets and delight in discovering the adorable companions of others. Join us in celebrating the special bond between pets and their humans, and let's spread the love for our animal friends together!
        </p>
        <div className="btn-box">
          <Link to="/register">
            <span>
              Not part of our community yet? Click here
            </span>
            <img src="images/link-arrow.png" alt="" />
          </Link>
        </div>
      </div>
    </div>
  </section>
  <section className="info_section ">
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          <div className="info_contact">
            <h5>
              Having any torubles?
            </h5>
            <div>
              <p>
                Contact us:
              </p>
            </div>
            <div>
              <img src="images/mail.png" alt="" />
              <p>
                demo@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="info_time">
            <h5>
             POST AT ANY TIME
            </h5>
            <div>
              <p>
                Get to know fellow pet owners
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="info_social">
            <h5>
            &#x2764; Appreciation for our users
            </h5>
            <div className="social_container">
              <div>
                <p>
                  Thank you for choosing PetLovers!
                </p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </section>
     </>   
    )
}