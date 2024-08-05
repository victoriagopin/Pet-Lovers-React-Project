import { useNavigate} from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { createProfile } from "../../api/profilesAPI";
import { useState } from "react";

const initialvalues = {
  firstName: '',
  lastName: '',
  age: '',
  occupation: '',
  imageUrl :'',
  aboutYou : ''
}

export default function OwnerForm(){
  const navigate = useNavigate();
  const {values, changeHandler} = useForm(initialvalues);
  const [isFirstNameValid, setIsFistNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isAgeValid, setIsAgeValid] = useState(true);
  const [isOccupationValid, setIsOccupationValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);


    const onCreateProfile = async (e) => {
        e.preventDefault();

        if(values.firstName < 2){
          setIsFistNameValid(false);
          setTimeout(() => setIsFistNameValid(true), 3000);
        }

        if(values.lastName < 2){
          setIsLastNameValid(false);
          setTimeout(() => setIsLastNameValid(true), 3000);
        }

        if(values.age < 0 || values.age > 130 || values.age == ''){
          setIsAgeValid(false);
          setTimeout(() => setIsAgeValid(true), 3000);
        }

        if(values.imageUrl == ''){
          setIsImageValid(false);
          setTimeout(() => setIsImageValid(true), 3000);
        }
        if(values.occupation < 2){
          setIsOccupationValid(false);
          setTimeout(() => setIsOccupationValid(true), 3000);
        }

        if(values.aboutYou < 5 || values.aboutYou > 500){
          setIsDescriptionValid(false);
          setTimeout(() => setIsDescriptionValid(true), 3000);
          return;
        }

        try{
          const createdProfile = await createProfile(values);
          navigate(`/profile/${createdProfile._id}`);
        } catch (err){
          console.log(err.message);
        }
     
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
                {!isFirstNameValid && <p className="error">Name must be at least 2 characters long!</p>}
                    <input type="text" placeholder="First Name" name="firstName" value={values.firstName || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                  {!isLastNameValid && <p className="error">Last Name must be at least 2 characters long!</p>}
                    <input type="text" placeholder="Last Name" name="lastName" value={values.lastName || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                  {!isAgeValid && <p className="error">Age should be greater than 0!</p>}
                    <input type="number" placeholder="Age" name="age" value={values.age || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                  {!isImageValid && <p className="error">Image can't be an empty filed!</p>}
                    <input type="text" placeholder="Image URL" name="imageUrl" value={values.imageUrl || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                  {!isOccupationValid && <p className="error">Occupation must be at least 2 characters long!</p>}
                    <input type="text" placeholder="Occupation" name="occupation" value={values.occupation || ''} onChange={changeHandler}/>
                  </div>
                  <div>
                  {!isDescriptionValid && <p className="error">Description must be between 5 and 500 characters long!</p>}
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