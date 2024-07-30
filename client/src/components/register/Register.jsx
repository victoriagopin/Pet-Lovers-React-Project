import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../conetxts/UserContext";
import { useForm } from "../../hooks/useForm";

const baseUrl = 'http://localhost:3030/users';

const initialvalues = {
    email: '',
    password: '',
    repass: ''
}

export default function Register(){
  const [isAvaliable, setIsAvaliable] = useState(true);
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const {setUser} = useContext(UserContext);
  const {values, changeHandler} = useForm(initialvalues);

  const navigate = useNavigate();

  const onRegisterClick = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if(!values.email){
      setIsAvaliable(false);
        hasErrors = true;
        setTimeout(() => setIsAvaliable(true), 3000);
        return;
    }
    if (values.password.length < 6) {
      setIsPasswordLongEnough(false);
      hasErrors = true;
      setTimeout(() => setIsPasswordLongEnough(true), 3000);
      return;
    }

    if (values.password !== values.repass) {
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
        email: values.email,
        password: values.password
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
                    <input type="text" placeholder="Email" name="email" value={values.email || ''} onChange={changeHandler}/>
                    {!isAvaliable && <p className="error">Email is already taken or the filed is empty!</p>}
                  </div>
                  <div>
                    <input type="password" placeholder="Password" name="password" value={values.password || ''} onChange={changeHandler}/>
                    {!isPasswordLongEnough && <p className="error">Password must be at least 6 characters long!</p>}
                  </div>
                  <div>
                    <input type="password" placeholder="Repeat Password" name="repass" value={values.repass || ''} onChange={changeHandler}/>
                    {!passwordsMatch && <p className="error">Passwords do not match!</p>}
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn_on-hover submit" onClick={onRegisterClick}>
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