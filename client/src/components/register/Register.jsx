import { useState } from "react"

export default function Register(){

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    repass: ''
  });

  const changeValues = (e) => {
    setFormValues(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));

  }
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
                    <input type="text" placeholder="caren@abv.bg" name="email" value={formValues.email} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Password" name="password" value={formValues.password} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="email" placeholder="Repeat Password" name="repass" value={formValues.repass} onChange={changeValues}/>
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