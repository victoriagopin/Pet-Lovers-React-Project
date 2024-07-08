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
          <a href="">
            <span>
              Not part of our community yet? Click here
            </span>
            <img src="images/link-arrow.png" alt="" />
          </a>
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
              CONTACT INFO
            </h5>
            <div>
              <img src="images/call.png" alt="" />
              <p>
                +01 1234567890
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
              Opening Hours Shop
            </h5>
            <div>
              <p>
                Monday to friday
              </p>
            </div>
            <div>
              <p>
                07:00 am to 04:00 pm
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="info_social">
            <h5>
              social media
            </h5>
            <div className="social_container">
              <div>
                <a href="">
                  <img src="images/fb.png" alt="" />
                </a>
              </div>
              <div>
                <a href="">
                  <img src="images/twitter.png" alt="" />
                </a>
              </div>
              <div>
                <a href="">
                  <img src="images/linkedin.png" alt="" />
                </a>
              </div>
              <div>
                <a href="">
                  <img src="images/instagram.png" alt="" />
                </a>
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