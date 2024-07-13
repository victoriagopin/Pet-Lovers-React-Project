import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const baseUrl = 'http://localhost:3030/jsonstore/users';

export default function Register(){

  const {setUser} = useContext(UserContext);
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

  const navigate = useNavigate();

  const onRegisterClick = async (e, userData) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      } ,
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    setUser(data);
    navigate('/catalog');
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
                    <input type="password" placeholder="Password" name="password" value={formValues.password} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="password" placeholder="Repeat Password" name="repass" value={formValues.repass} onChange={changeValues}/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn_on-hover submit" onClick={(e) => onRegisterClick(e, formValues)}>
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