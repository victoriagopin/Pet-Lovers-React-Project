import { useNavigate, useParams } from "react-router-dom"
import { updateProfile } from "../../api/profilesAPI";
import { useGetProfile } from "../../hooks/useGetProfile";

export default function EditProfile(){
    const {id} = useParams();
    const {profile, setProifle} = useGetProfile(id);
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
                    <input type="text" placeholder="First Name" name="firstName" value={profile.firstName || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" name="lastName" value={profile.lastName || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="number" placeholder="Age" name="age" value={profile.age || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Image URL" name="imageUrl" value={profile.imageUrl || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Occupation" name="occupation" value={profile.occupation || ''} onChange={handleChange}/>
                  </div>
                  <div>
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