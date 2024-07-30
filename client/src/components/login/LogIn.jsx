import { useContext, useState } from "react";
import { UserContext } from "../../conetxts/UserContext";
import { useNavigate} from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { get, post } from "../../api/requester";

const initialFormValues = {
  email:'',
    password: ''
}
export default function LogIn(){
  const {setUser} = useContext(UserContext);
  const [errors, setErrors] = useState(false);
  const {values, changeHandler} = useForm(initialFormValues)

  const navigate = useNavigate();

  const onLoginClick = async (e) => {
    e.preventDefault();

    try{
    const res = await post('users/login', values);
  
    if(typeof res == 'number') {
      setErrors(true);
        setTimeout(() => setErrors(false), 3000);
        return;
    }
    
      setUser(res);
      localStorage.setItem('auth', JSON.stringify(res.accessToken));
      navigate('/catalog');
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
                        <input type="email" name="email" placeholder="Email" value={values.email || ''} onChange={changeHandler}/>
                      </div>
                      <div>
                        <input type="password" name="password" placeholder="Password" value={values.password || ''} onChange={changeHandler}/>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn_on-hover submit" onClick={onLoginClick}>
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