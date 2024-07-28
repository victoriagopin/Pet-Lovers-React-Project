import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate} from "react-router-dom";

const baseUrl = 'http://localhost:3030/users';

export default function LogIn(){
  const {setUser} = useContext(UserContext);
  const [errors, setErrors] = useState(false);
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

  const onLoginClick = async (e) => {
    e.preventDefault();

    try{
    const req = await fetch(`${baseUrl}/login`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password
      })
    });

    if(req.status != 200){
      setErrors(true);
      setTimeout(() => setErrors(false), 3000);
      return;
    }

    const curUser = await req.json();

    if(!curUser){
      setErrors(true);
      setTimeout(() => setErrors(false), 3000);
    } else {
      const {password, ...user} = curUser;
      setUser(user);
      navigate('/catalog');
    }
  } catch(err){
    console.log(err.message);
  }

    
  }

    return (
        <section className="contact_section layout_padding" style={{minHeight: '83vh'}}>
        <div className="container">
    
          <div className="heading_container">
            <h2>
              Log In
            </h2>
            {errors ? <p className="error">Incorrect email or password!</p> : null}
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