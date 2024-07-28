import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext";

const baseUrl = 'http://localhost:3030/data'

export default function EditProfile(){
  const {user} = useContext(UserContext);
    const {id} = useParams();
    const [userToEdit, setUserToEdit] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        (async function getUser (){
          try{
            const response = await fetch(`${baseUrl}/profiles/${id}`);
            const user = await response.json();

            setUserToEdit(user);
          } catch (err){
            console.log(err.message);
          }
          
        })()
    },[])

    const handleChange =(e) => {
        const {name, value} = e.target;
        setUserToEdit((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/profiles/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization' : user.accessToken
              },
              body: JSON.stringify(userToEdit),
            });
            const result = await response.json();
            navigate(`/profile/${result._id}`);
          } catch (error) {
            console.error('Error updating data:', error);
          }
    }

    if (!userToEdit) {
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
                    <input type="text" placeholder="First Name" name="firstName" value={userToEdit.firstName || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Last Name" name="lastName" value={userToEdit.lastName || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="number" placeholder="Age" name="age" value={userToEdit.age || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Image URL" name="imageUrl" value={userToEdit.imageUrl || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Occupation" name="occupation" value={userToEdit.occupation || ''} onChange={handleChange}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Tell somethnig about yourself..." name="aboutYou" value={userToEdit.aboutYou || ''} onChange={handleChange}/>
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