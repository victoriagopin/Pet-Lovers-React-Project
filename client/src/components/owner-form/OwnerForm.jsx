import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../conetxts/UserContext";
import { useForm } from "../../hooks/useForm";

const baseUrl = 'http://localhost:3030/data'

const initialvalues = {
  firstName: '',
  lastName: '',
  age: '',
  occupation: '',
  imageUrl :'',
  aboutYou : ''
}

export default function OwnerForm(){
  const {user} = useContext(UserContext);

  const navigate = useNavigate();
    const {values, changeHandler} = useForm(initialvalues);

      const onCreateProfile = async (e) => {
        e.preventDefault();

        const response = await fetch(`${baseUrl}/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'X-Authorization': user.accessToken
          },
          body : JSON.stringify(values)
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
                    <input type="text" placeholder="First Name" name="firstName" value={values.firstName || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" name="lastName" value={values.lastName || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                    <input type="number" placeholder="Age" name="age" value={values.age || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Image URL" name="imageUrl" value={values.imageUrl || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Occupation" name="occupation" value={values.occupation || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Tell somethnig about yourself..." name="aboutYou" value={values.aboutYou || ''} onChange={changeHandler}/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn_on-hover submit" onClick={onCreateProfile}>
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