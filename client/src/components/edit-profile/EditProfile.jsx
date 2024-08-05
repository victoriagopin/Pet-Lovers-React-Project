import { useNavigate, useParams } from "react-router-dom"
import { updateProfile } from "../../api/profilesAPI";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useState } from "react";

export default function EditProfile(){
    const {id} = useParams();
    const {profile, setProifle} = useGetProfile(id);
    const [isFirstNameValid, setIsFistNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [isOccupationValid, setIsOccupationValid] = useState(true);
    const [isImageValid, setIsImageValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);
    const navigate = useNavigate();

    const handleChange =(e) => {
        const {name, value} = e.target;
        setProifle((prevprofile) => ({
            ...prevprofile,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(profile.firstName < 2){
          setIsFistNameValid(false);
          setTimeout(() => setIsFistNameValid(true), 3000);
          return;
        }

        if(profile.lastName < 2){
          setIsLastNameValid(false);
          setTimeout(() => setIsLastNameValid(true), 3000);
          return;
        }

        if(profile.age < 0 || profile.age > 130 || profile.age == ''){
          setIsAgeValid(false);
          setTimeout(() => setIsAgeValid(true), 3000);
          return;
        }

        if(profile.imageUrl == ''){
          setIsImageValid(false);
          setTimeout(() => setIsImageValid(true), 3000);
          return;
        }
        
        if(profile.occupation < 2){
          setIsOccupationValid(false);
          setTimeout(() => setIsOccupationValid(true), 3000);
          return;
        }

        if(profile.aboutYou < 5 || profile.aboutYou > 500){
          setIsDescriptionValid(false);
          setTimeout(() => setIsDescriptionValid(true), 3000);
          return;
        }

        try {
          const updatedProfile = await updateProfile(id, profile);
            navigate(`/profile/${updatedProfile._id}`);
          } catch (error) {
            console.error('Error updating data:', error);
          }
    }

    if (!profile) {
        return <p>Loading...</p>;
      }

 return (
    <section className="contact_section layout_padding">
    <div className="container">

      <div className="heading_container">
        <h2>
          Edit Your Profile
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
                    <input type="text" placeholder="First Name" name="firstName" value={profile.firstName || ''} onChange={handleChange}/>
                  </div>
                  <div>
                  {!isLastNameValid && <p className="error">Last Name must be at least 2 characters long!</p>}
                    <input type="text" placeholder="Last Name" name="lastName" value={profile.lastName || ''} onChange={handleChange}/>
                  </div>
                  <div>
                  {!isAgeValid && <p className="error">Age should be greater than 0!</p>}
                    <input type="number" placeholder="Age" name="age" value={profile.age || ''} onChange={handleChange}/>
                  </div>
                  <div>
                  {!isImageValid && <p className="error">Image can't be an empty filed!</p>}
                    <input type="text" placeholder="Image URL" name="imageUrl" value={profile.imageUrl || ''} onChange={handleChange}/>
                  </div>
                  <div>
                  {!isOccupationValid && <p className="error">Occupation must be at least 2 characters long!</p>}
                    <input type="text" placeholder="Occupation" name="occupation" value={profile.occupation || ''} onChange={handleChange}/>
                  </div>
                  <div>
                  {!isDescriptionValid && <p className="error">Description must be between 5 and 500 characters long!</p>}
                    <input type="text" placeholder="Tell somethnig about yourself..." name="aboutYou" value={profile.aboutYou || ''} onChange={handleChange}/>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn_on-hover submit" onClick={handleSubmit}>
                      Save
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