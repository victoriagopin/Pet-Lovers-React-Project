import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { post } from "../../api/requester";
import { useState } from "react";

const initialFormValues = {
  name:'',
  breed: '',
  origin: '', 
  age: '',
  eyeColor: '',
  imageUrl : '',
  funStory: '',
  likes: 0
}

export default function CreatePet({
}){
    const {values, changeHandler} = useForm(initialFormValues);
    const [isNameLongEnough, setIsNameLongEnough] = useState(true);
    const [isBreedLongEnough, setIsBreedLongEnough] = useState(true);
    const [isOriginLongEnoug, setIsOriginLongEnough] = useState(true);
    const [isAgeValid, setIsAgeValid] = useState(true);
    const [isEyeColorLongEnough, setIsEyeColorLongEnough] = useState(true);
    const [isStoryInRange, setIsStoryInRange] = useState(true);

    const navigate = useNavigate();

    const createPet = async (e) => {
      e.preventDefault();


    if(values.name.length < 2){
      setIsNameLongEnough(false);
      setTimeout(() => setIsNameLongEnough(true), 3000);
    }

    if(values.breed.length < 2){
      setIsBreedLongEnough(false);
      setTimeout(() => setIsBreedLongEnough(true), 3000);
    }

    if(values.origin.length < 2){
      setIsOriginLongEnough(false);
      setTimeout(() => setIsOriginLongEnough(true), 3000);
    }

   if(values.age < 0 || values.age > 30 || values.age == ''){
      setIsAgeValid(false);
      setTimeout(() => setIsAgeValid(true), 3000);
    }

    if(values.eyeColor.length < 2){
      setIsEyeColorLongEnough(false);
      setTimeout(() => setIsEyeColorLongEnough(true), 3000);
    }

    if(values.funStory.length < 5 || values.funStory.length > 500){
      setIsStoryInRange(false);
      setTimeout(() => setIsStoryInRange(true), 3000);
      return;
    }
     
      try{
        const response = await post('data/pets', values);
        navigate(`/catalog/${response._id}`);

      } catch (err){
        console.log(err.message);
      }     

   }
    return (
        <section className="contact_section" >
      <div className="container">
  
        <div className="heading_container">
          <h2>
            Add Your Furry Friend
          </h2>
        </div>
        <div className="">
          <div className="">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <div className="contact-form">
                  <form>
                    <div>
                    {!isNameLongEnough && <p className="error">Name must be at least 2 characters long!</p>}
                      <input type="text" name="name" placeholder="Name" value={values.name || ''}  onChange={changeHandler}/>
                    </div>
                    <div>
                    {!isBreedLongEnough && <p className="error">Breed must be at least 2 characters long!</p>}
                      <input type="text" name="breed" placeholder="Breed" value={values.breed || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                    {!isOriginLongEnoug && <p className="error">Origin must be at least 2 characters long!</p>}
                      <input type="text" name="origin" placeholder="Origin" value={values.origin || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                    {!isAgeValid && <p className="error">Age cannot be less than 0 and greater than 30!</p>}
                      <input type="number" name="age" placeholder="Age" value={values.age || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                    {!isEyeColorLongEnough && <p className="error">Eye Color must be at least 2 characters long!</p>}
                      <input type="text" name="eyeColor" placeholder="Eye Color" value={values.eyeColor || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                      <input type="text" name="imageUrl" placeholder="Image URL" value={values.imageUrl || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                    {!isStoryInRange && <p className="error">Your story must be between 5 and 500 characters long!</p>}
                      <input type="text" name="funStory" placeholder="Fun story with your furry friend..." value={values.funStory || ''} onChange={changeHandler}/>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn_on-hover submit" onClick={createPet}>
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <img className="create-img" src="./images/pet1.png" alt=""/>
    </section> 
    )
}