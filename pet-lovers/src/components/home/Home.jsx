export default function Home(){
    return (
        <section className="pet_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-box">
              <img src="images/pet-img.png" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="detail-box">
              
                <h2>
                  Welcome to PetLovers, the ultimate online community for pets enthusiasts!
                </h2>
              </div>
              <p>
                Here, you can share adorable photos of your furry friend and explore a vibrant gallery of animals from fellow pet lovers around the world.
              </p>
              <div className="btn-box">
                <a href="">
                  <span>
                    Show Pets
                  </span>
                  <img src="images/link-arrow.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
    </section>
    );
}