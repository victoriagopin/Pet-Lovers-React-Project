import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const baseUrl = 'http://localhost:3030/users';

export default function Register(){
  const [isAvaliable, setIsAvaliable] = useState(true);
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
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

  const onRegisterClick = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if(!formValues.email){
      setIsAvaliable(false);
        hasErrors = true;
        setTimeout(() => setIsAvaliable(true), 3000);
        return;
    }
    if (formValues.password.length < 6) {
      setIsPasswordLongEnough(false);
      hasErrors = true;
      setTimeout(() => setIsPasswordLongEnough(true), 3000);
      return;
    }

    if (formValues.password !== formValues.repass) {
      setPasswordsMatch(false);
      hasErrors = true;
      setTimeout(() => setPasswordsMatch(true), 3000);
      return;
    }

    try{
    const req = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formValues.email,
        password: formValues.password
      })
    });

    if(req.status != 200){
      setIsAvaliable(false);
      hasErrors = true;
      setTimeout(() => setIsAvaliable(true), 3000);
      return;
    }
    
    const data = await req.json();
    const {password, ...user} = data;
    setUser(user);
    navigate('/catalog');
  } catch (err) {
    console.log(err.message);
  }

    // if (existingEmail) {
    //   setIsAvaliable(false);
    //   hasErrors = true;
    //   setTimeout(() => setIsAvaliable(true), 3000);
    // }

    // if (!hasErrors) {
    //   const response = await fetch(`${baseUrl}/users`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: formValues.email,
    //       password: formValues.password
    //     })
    //   });

      // const data = await response.json();
    
 
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
                    <input type="text" placeholder="Email" name="email" value={formValues.email} onChange={changeValues}/>
                    {!isAvaliable && <p className="error">Email is already taken or the filed is empty!</p>}
                  </div>
                  <div>
                    <input type="password" placeholder="Password" name="password" value={formValues.password} onChange={changeValues}/>
                    {!isPasswordLongEnough && <p className="error">Password must be at least 6 characters long!</p>}
                  </div>
                  <div>
                    <input type="password" placeholder="Repeat Password" name="repass" value={formValues.repass} onChange={changeValues}/>
                    {!passwordsMatch && <p className="error">Passwords do not match!</p>}
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