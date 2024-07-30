import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../conetxts/UserContext";


const baseUrl = 'http://localhost:3030/data'

export default function EditPet() {
  const {user} = useContext(UserContext);
    const {petId} = useParams();
    const [petToEdit, setPetToEdit] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        (async function getPet (){
            const response = await fetch(`${baseUrl}/pets/${petId}`);
            const pet = await response.json();

            setPetToEdit(pet);
        })()
    },[])

    const handleChange =(e) => {
        const {name, value} = e.target;
        setPetToEdit((prevPet) => ({
            ...prevPet,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${baseUrl}/pets/${petId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'X-Authorization' : user.accessToken
              },
              body: JSON.stringify(petToEdit),
            });
            const result = await response.json();
            navigate(`/catalog/${result._id}`);
          } catch (error) {
            console.error('Error updating data:', error);
          }
    }

    if (!petToEdit) {
        return <p>Loading...</p>;
      }
  return (
    <section className="contact_section">
      <div className="container">
        <div className="heading_container">
          <h2>Edit Your Furry Friend</h2>
        </div>
        <div className="">
          <div className="">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <input type="text" placeholder="Name" name="name" value={petToEdit.name || ''} onChange={handleChange}/>
                    </div>
                    <div>
                      <input type="text" placeholder="Breed" name="breed" value={petToEdit.breed || ''} onChange={handleChange}/>
                    </div>
                    <div>
                      <input type="text" placeholder="Origin" name="origin" value={petToEdit.origin || ''} onChange={handleChange}/>
                    </div>
                    <div>
                      <input type="number" placeholder="Age" name="age" value={petToEdit.age || ''} onChange={handleChange}/>
                    </div>
                    <div>
                      <input type="text" placeholder="Eye Color" name="eyeColor" value={petToEdit.eyeColor || ''} onChange={handleChange}/>
                    </div>
                    <div>
                      <input type="text" name="imageUrl" placeholder="Image URL" value={petToEdit.imageUrl || ''} onChange={handleChange}/>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Fun story with your furry friend..."
                        name="funStory"
                        value={petToEdit.funStory} 
                        onChange={handleChange || ''}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn_on-hover submit">
                        Edit
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
  );
}
