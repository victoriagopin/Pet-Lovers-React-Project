export default function CreatePet(){
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
                  <form action="">
                    <div>
                      <input type="text" placeholder="Name"/>
                    </div>
                    <div>
                      <input type="text" placeholder="Breed"/>
                    </div>
                    <div>
                      <input type="text" placeholder="Origin"/>
                    </div>
                    <div>
                      <input type="number" placeholder="Age"/>
                    </div>
                    <div>
                      <input type="text" placeholder="Eye Color"/>
                    </div>
                    <div>
                      <input type="text" placeholder="Fun story with your furry friend..."/>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn_on-hover submit">
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