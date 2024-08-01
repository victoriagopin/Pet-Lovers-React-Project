import { useNavigate} from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { createProfile } from "../../api/profilesAPI";

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

    const onCreateProfile = async (e) => {
        e.preventDefault();

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