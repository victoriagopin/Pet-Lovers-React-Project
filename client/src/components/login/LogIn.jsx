import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const baseUrl = 'http://localhost:3030/jsonstore';

export default function LogIn(){
  const {setUser} = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    email:'',
    password: ''
  })

  const navigate = useNavigate();

  const changeValues = (e) => {
    setFormValues(oldValues => ({
      ...oldValues,
      [e.target.name] : e.target.value
    }))
  }

  const onLoginClick = async (e, userData) => {
    e.preventDefault();

    const response = await fetch(`${baseUrl}/users`);
    const data = await response.json();
    const users = Object.values(data);

    const authenticatedUser = users.find(user=> user.email === formValues.email && user.password === formValues.password)

    if(!authenticatedUser){
      console.log('Wrong');
    } else {
      setUser(authenticatedUser);
      navigate('/catalog');
    }
    
  }

    return (
        <section className="contact_section layout_padding">
        <div className="container">
    
          <div className="heading_container">
            <h2>
              Log In
            </h2>
          </div>
          <div>
            <div>
              <div className="row">
                <div className="col-md-9 mx-auto">
                  <div className="contact-form">
                    <form action="">
                      <div>
                        <input type="email" name="email" placeholder="Email" value={formValues.email} onChange={(e) => changeValues(e)}/>
                      </div>
                      <div>
                        <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={(e) => changeValues(e)}/>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn_on-hover submit" onClick={(e) => onLoginClick(e,formValues)}>
                          Login
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