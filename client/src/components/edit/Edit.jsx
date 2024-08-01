import { useNavigate, useParams } from "react-router-dom";
import { usePetToEdit } from "../../hooks/usePetToEdit";
import { updatePet } from "../../api/petsAPI";

export default function EditPet() {
    const {petId} = useParams();
    const {petToEdit, setPetToEdit} = usePetToEdit(petId);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPetToEdit((prevPet) => ({
            ...prevPet,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const updatedPet = await updatePet(petId, petToEdit);
            navigate(`/catalog/${updatedPet._id}`);
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
