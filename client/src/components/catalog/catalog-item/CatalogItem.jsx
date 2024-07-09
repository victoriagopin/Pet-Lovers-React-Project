export default function CatalogItem({
    pet,
    onDetailsClick={onDetailsClick},
}){
    return (
        <div className="pet-card">
          <img src={pet.imageUrl} alt="Animal Picture" />
          <div className="pet-info">
              <h2><span className="make-yellow">Name:</span> {pet.name}</h2>
              <p><span className="make-yellow">Breed:</span> {pet.breed}</p>
              <p><span className="make-yellow">Origin:</span> {pet.origin}</p>
              <button className="details-btn" onClick={() => {onDetailsClick(pet)}}>More about <strong>{pet.name}</strong></button>
          </div>
      </div>
    )
}