import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function Details({
}){
    const {user} = useContext(UserContext);
    const {petId} = useParams();
    const [animal, setAnimal] = useState({});
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (async function getAnimal () {
            const response = await fetch(`${baseUrl}/pets/${petId}`);
            const data = await response.json();
            if (JSON.stringify(data) !== JSON.stringify(animal)) {
                setAnimal(data); 
            }

        })()
    },[petId]);

    useEffect(() => {
        if (animal._ownerId) {
          const fetchOwnerProfile = async () => {
            const response = await fetch(`${baseUrl}/profiles`);
            const data = await response.json();
            const profiles = Object.values(data);

            const profile = profiles.find(profile => profile.identity == animal._ownerId);
      
            setOwnerProfile(profile);
            console.log(ownerProfile);
          };
    
          fetchOwnerProfile();
        }
      }, [animal._ownerId]);
    
    const onDeleteClick = async () => {
      const response = await fetch(`${baseUrl}/pets/${animal._id}}`,{
        method: 'DELETE'
      });

      navigate('/catalog');
   }

  //  console.log(ownerProfile);
   useEffect(() => {
   ( async function getOwner(){
      const response = await fetch(`${baseUrl}/profiles`);
      const data = await response.json();
      const profiles = Object.values(data);
      console.log(profiles);
      const owner = profiles.find(profile => profile.identity == animal._ownerId);

      console.log(owner);

      if(owner != undefined){
        setIsOwner(true);
      }
    })()
   
   })

   console.log(ownerProfile);
    return (
        <section className="catalog-details">
        <div className="pet-card-details">
            <img className="details-img" src={animal.imageUrl} alt="Animal Picture"/>
            <div className="pet-info-details">
                <h2><span className="make-yellow">Name:</span> {animal.name}</h2>
                <p><span className="make-yellow">Breed:</span> {animal.breed}</p>
                <p><span className="make-yellow">Origin:</span> {animal.origin}</p>
                <p><span className="make-yellow">Age:</span> {animal.age}</p>
                <p><span className="make-yellow">Eye Color:</span> {animal.eyeColor}</p>
                <p><span className="make-yellow">Fun Story with your Furry Friend:</span> {animal.funStory}</p>
            </div>

            {user && user._id === animal._ownerId ? (
          <>
            {ownerProfile ? (
              <Link className="owner-btn" to={`/profile/${animal._ownerId}`}>See Your Profile</Link>
            ) : (
              <Link className="owner-btn" to={`/setup-owner-profile/${animal._ownerId}`}>Set Up Owner's Profile</Link>
            )}
            <button type="submit" className="edit-delete submit">Edit</button>
            <button type="submit" className="edit-delete submit" onClick={onDeleteClick}>Delete</button>
          </>
        ) : (
          <>
            {isOwner ? (
              <Link className="owner-btn" to={`/profile/${animal._ownerId}`}>See Owner's Profile</Link>
            ) : (
              <p className="no-owner">No owner profile set up yet</p>
            )}
          </>
        )}
      </div>
    </section>
    )
}