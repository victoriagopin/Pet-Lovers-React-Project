import { Link } from "react-router-dom";

export default function CatalogItem({
    pet
}){
    return (
        <div className="pet-card">
          <img src={pet.imageUrl} alt="Animal Picture" />
          <div className="pet-info">
              <h2><span className="make-yellow">Name:</span> {pet.name}</h2>
              <p><span className="make-yellow">Breed:</span> {pet.breed}</p>
              <p><span className="make-yellow">Origin:</span> {pet.origin}</p>
              <Link className="details-btn" to={`/catalog/${pet._id}`} >More about <strong>{pet.name}</strong></Link>
          </div>
      </div>
    )
}