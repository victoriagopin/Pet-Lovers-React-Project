export default function LogIn(){
    return (
        <section className="contact_section layout_padding">
        <div className="container">
    
          <div className="heading_container">
            <h2>
              Log In
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
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn_on-hover submit">
                          Log In
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