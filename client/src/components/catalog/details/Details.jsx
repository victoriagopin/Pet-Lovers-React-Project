export default function Details({
    pet
}){
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
            <button type="submit" className="edit-delete submit">Edit</button>
            <button type="submit" className="edit-delete submit">Delete</button>
        </div>
    </section>
    )
}