import { useNavigate, useParams } from "react-router-dom";
import { usePetToEdit } from "../../hooks/usePetToEdit";
import { updatePet } from "../../api/petsAPI";
import { useState } from "react";

export default function EditPet() {
    const {petId} = useParams();
    const {petToEdit, setPetToEdit} = usePetToEdit(petId);
    const [isNameLongEnough, setIsNameLongEnough] = useState(true);
    const [isBreedLongEnough, setIsBreedLongEnough] = useState(true);
    const [isOriginLongEnoug, setIsOriginLongEnough] = useState(true);
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [isImageValid, setIsImageValid] = useState(true);
    const [isEyeColorLongEnough, setIsEyeColorLongEnough] = useState(true);
    const [isStoryInRange, setIsStoryInRange] = useState(true);
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

        if(petToEdit.name.length < 2){
          setIsNameLongEnough(false);
          setTimeout(() => setIsNameLongEnough(true), 3000);
          return;
        }
    
        if(petToEdit.breed.length < 2){
          setIsBreedLongEnough(false);
          setTimeout(() => setIsBreedLongEnough(true), 3000);
          return;
        }
    
        if(petToEdit.origin.length < 2){
          setIsOriginLongEnough(false);
          setTimeout(() => setIsOriginLongEnough(true), 3000);
          return;
        }
    
       if(petToEdit.age < 0 || petToEdit.age > 30 || petToEdit.age == ''){
          setIsAgeValid(false);
          setTimeout(() => setIsAgeValid(true), 3000);
          return;
        }
    
        if(petToEdit.imageUrl == ''){
          setIsImageValid(false);
          setTimeout(() => setIsImageValid(true), 3000);
          return;
        }

        if(petToEdit.eyeColor.length < 2){
          setIsEyeColorLongEnough(false);
          setTimeout(() => setIsEyeColorLongEnough(true), 3000);
          return;
        }
    
        if(petToEdit.funStory.length < 5 || petToEdit.funStory.length > 500){
          setIsStoryInRange(false);
          setTimeout(() => setIsStoryInRange(true), 3000);
          return;
        }

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
                    {!isNameLongEnough && <p className="error">Name must be at least 2 characters long!</p>}
                      <input type="text" placeholder="Name" name="name" value={petToEdit.name || ''} onChange={handleChange}/>
                    </div>
                    <div>
                    {!isBreedLongEnough && <p className="error">Breed must be at least 2 characters long!</p>}
                      <input type="text" placeholder="Breed" name="breed" value={petToEdit.breed || ''} onChange={handleChange}/>
                    </div>
                    <div>
                    {!isOriginLongEnoug && <p className="error">Origin must be at least 2 characters long!</p>}
                      <input type="text" placeholder="Origin" name="origin" value={petToEdit.origin || ''} onChange={handleChange}/>
                    </div>
                    <div>
                    {!isAgeValid && <p className="error">Age cannot be less than 0 and greater than 30!</p>}
                      <input type="number" placeholder="Age" name="age" value={petToEdit.age || ''} onChange={handleChange}/>
                    </div>
                    <div>
                    {!isEyeColorLongEnough && <p className="error">Eye Color must be at least 2 characters long!</p>}
                      <input type="text" placeholder="Eye Color" name="eyeColor" value={petToEdit.eyeColor || ''} onChange={handleChange}/>
                    </div>
                    <div>
                    {!isImageValid && <p className="error">Image can't be an empty filed!</p>}
                      <input type="text" name="imageUrl" placeholder="Image URL" value={petToEdit.imageUrl || ''} onChange={handleChange}/>
                    </div>
                    <div>
                    {!isStoryInRange && <p className="error">Your story must be between 5 and 500 characters long!</p>}
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
