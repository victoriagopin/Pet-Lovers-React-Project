import { useParams } from "react-router-dom"

export default function OwnerProfile(){
    const {ownerId} = useParams();

    return (
        <section className="owner-details">
        <div className="owner-card-details">
          <div className="owner-photo">
            <img className="owner-img" src="https://img.freepik.com/premium-vector/happy-cute-little-kid-boy-girl-play-with-pet-dog_97632-2981.jpg" alt="Animal Picture" />
          </div>
          <div className="owner-info-details">
            <h2><span className="owner-make-yellow">Name:</span> Bella</h2>
            <p><span className="owner-make-yellow">Breed:</span> Labrador Retriever</p>
            <p><span className="owner-make-yellow">Origin:</span> USA</p>
            <p><span className="owner-make-yellow">Age:</span> 4</p>
            <p><span className="owner-make-yellow">Eye Color:</span> Blue</p>
            <p><span className="owner-make-yellow">Fun Story with your Furry Friend:</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste amet, beatae sequi ut, provident quam facilis quasi temporibus, ex expedita consectetur eligendi. Debitis nulla illo optio excepturi placeat dicta facere quod deleniti, saepe, dolore maxime provident, voluptas facilis ipsam reprehenderit.</p>
          </div>
         
        </div>
      </section>
    )
}