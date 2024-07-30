import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useForm } from "../../hooks/useForm";

const baseUrl = 'http://localhost:3030/data'

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
    const { user } = useContext(UserContext);


    const {values, changeHandler} = useForm(initialFormValues);

    const navigate = useNavigate();

   const createPet = async (e,petData) => {
      e.preventDefault();
     
      try{
        const response = await fetch(`${baseUrl}/pets`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
          } ,
          body: JSON.stringify(values)
      });
  
      const createdPet = await response.json();
      navigate(`/catalog/${createdPet._id}`);
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
                      <input type="text" name="name" placeholder="Name" value={values.name || ''}  onChange={changeHandler}/>
                    </div>
                    <div>
                      <input type="text" name="breed" placeholder="Breed" value={values.breed || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                      <input type="text" name="origin" placeholder="Origin" value={values.origin || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                      <input type="number" name="age" placeholder="Age" value={values.age || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                      <input type="text" name="eyeColor" placeholder="Eye Color" value={values.eyeColor || ''} onChange={changeHandler}/>
                    </div>
                    <div>
                      <input type="text" name="imageUrl" placeholder="Image URL" value={values.imageUrl || ''} onChange={changeHandler}/>
                    </div>
                    <div>
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