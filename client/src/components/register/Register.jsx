export default function Register(){
    return (
        <section className="contact_section layout_padding">
    <div className="container">

      <div className="heading_container">
        <h2>
          Register
        </h2>
      </div>
      <div className="">
        <div className="">
          <div className="row">
            <div className="col-md-9 mx-auto">
              <div className="contact-form">
                <form action="">
                  <div>
                    <input type="text" placeholder="Email"/>
                  </div>
                  <div>
                    <input type="text" placeholder="Password"/>
                  </div>
                  <div>
                    <input type="email" placeholder="Repeat Password"/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn_on-hover submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    )
}