import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function CreatePet({
}){
    const { user } = useContext(UserContext);

    const [formVaules, setFormValues] = useState({
      name:'',
      breed: '',
      origin: '',
      age: '',
      eyeColor: '',
      imageUrl : '',
      funStory: '',
      _ownerId: user._id,
    });

    const navigate = useNavigate();

    const changeValues = (e) => {
        setFormValues(oldValues => ({
          ...oldValues,
          [e.target.name]: e.target.value
        }));
    }


   const createPet = async (e,petData) => {
      e.preventDefault();
     
      const response = await fetch(`${baseUrl}/pets`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        } ,
        body: JSON.stringify(petData)
    });

    const createdPet = await response.json();
    navigate(`/catalog/${createdPet._id}`);

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
                      <input type="text" name="name" placeholder="Name" value={formVaules.name}  onChange={changeValues}/>
                    </div>
                    <div>
                      <input type="text" name="breed" placeholder="Breed" value={formVaules.breed} onChange={changeValues}/>
                    </div>
                    <div>
                      <input type="text" name="origin" placeholder="Origin" value={formVaules.origin} onChange={changeValues}/>
                    </div>
                    <div>
                      <input type="number" name="age" placeholder="Age" value={formVaules.age} onChange={changeValues}/>
                    </div>
                    <div>
                      <input type="text" name="eyeColor" placeholder="Eye Color" value={formVaules.eyeColor} onChange={changeValues}/>
                    </div>
                    <div>
                      <input type="text" name="imageUrl" placeholder="Image URL" value={formVaules.imageUrl} onChange={changeValues}/>
                    </div>
                    <div>
                      <input type="text" name="funStory" placeholder="Fun story with your furry friend..." value={formVaules.funStory} onChange={changeValues}/>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn_on-hover submit" onClick={(e)=> createPet(e,formVaules)}>
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