import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function OwnerForm(){
  const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        age: '',
        occupation: '',
        imageUrl :'',
        aboutYou : ''
      });
    
      const changeValues = (e) => {
        setFormValues(oldValues => ({
          ...oldValues,
          [e.target.name]: e.target.value
        }));
    
      }

      const onCreateProfile = async (e, userData) => {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(userData)
        }) 

        const data = await response.json();
        navigate(`/profile/${data._id}`);
      }

    return (
        <section className="contact_section layout_padding">
    <div className="container">

      <div className="heading_container">
        <h2>
          Set Up Your Profile
        </h2>
      </div>
      <div className="">
        <div className="">
          <div className="row">
            <div className="col-md-9 mx-auto">
              <div className="contact-form">
                <form action="">
                <div>
                    <input type="text" placeholder="First Name" name="firstName" value={formValues.firstName} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" name="lastName" value={formValues.lastName} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="number" placeholder="Age" name="age" value={formValues.age} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Image URL" name="imageUrl" value={formValues.imageUrl} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Occupation" name="occupation" value={formValues.occupation} onChange={changeValues}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Tell somethnig about yourself..." name="aboutYou" value={formValues.aboutYou} onChange={changeValues}/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn_on-hover submit" onClick={(e) => onCreateProfile(e, formValues)}>
                      Ready!
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