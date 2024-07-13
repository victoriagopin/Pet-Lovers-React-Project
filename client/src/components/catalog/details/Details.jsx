import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function Details({
}){
    const {petId} = useParams();
    const [pet, setPet] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const response = await fetch(`${baseUrl}/pets/${petId}`);
            const data = await response.json();

            setPet(data);
        })()
    },[]);

    const onDeleteClick = async (pet) => {
    const id = pet._id;
      const response = await fetch(`${baseUrl}/pets/${id}`,{
        method: 'DELETE'
      });

      navigate('/catalog');
   }
    return (
        <section className="catalog-details">
        <div className="pet-card-details">
            <img className="details-img" src={pet.imageUrl} alt="Animal Picture"/>
            <div className="pet-info-details">
                <h2><span className="make-yellow">Name:</span> {pet.name}</h2>
                <p><span className="make-yellow">Breed:</span> {pet.breed}</p>
                <p><span className="make-yellow">Origin:</span> {pet.origin}</p>
                <p><span className="make-yellow">Age:</span> {pet.age}</p>
                <p><span className="make-yellow">Eye Color:</span> {pet.eyeColor}</p>
                <p><span className="make-yellow">Fun Story with your Furry Friend:</span> {pet.funStory}</p>
            </div>
            <Link className="owner-btn" to={'/setup-owner-profile'}>Set Up Owner's Profile</Link>
            {/* <button type="submit" className="edit-delete submit">Edit</button>
            <button type="submit" className="edit-delete submit" onClick={()=> onDeleteClick(pet)}>Delete</button> */}
        </div>
    </section>
    )
}