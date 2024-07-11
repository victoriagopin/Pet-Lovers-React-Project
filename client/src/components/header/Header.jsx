import { useEffect } from "react";
import { useState } from "react";
import Catalog from "../catalog/Catalog";
import Home from "../home/Home";
import About from "../about/About"
import Register from "../register/Register";
import LogIn from "../register/login/LogIn";
import CreatePet from "../create/Create";
import Details from "../catalog/details/Details";


const baseUrl = 'http://localhost:3030/jsonstore'

export default function Header(){
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [showDetails, setShowDetails] = useState(null);

  const renderPage = () => {
    switch(currentPage){
      case 'catalog':
        return  <Catalog 
                 pets={pets}
                 onDetailsClick={onDetailsClickHandler}
               />;
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'register':
        return <Register />;
      case 'login':
        return <LogIn />;
      case 'create':
        return <CreatePet onCreate={createPet}/>;
      case 'details':
        return <Details 
                  pet={showDetails}
                  onDelete={onDeleteClick}
              />
      default: 
        return <Home />
    }
  }

  const handleNavClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    setShowDetails(null);
  }

  useEffect(() => {
    (async function getPets(){
      const response = await fetch(`${baseUrl}/pets`);
      const data = await response.json();
      const petsResult =  Object.values(data);
      
      setPets(petsResult);
    })();
  },[pets]);

  const onDetailsClickHandler = (pet) => {
    setShowDetails(pet);
    onDetailsShow(pet);
  }

  const onDetailsShow = async (pet) => {
      const petId = pet._id;
      
      try {
        const response = await fetch(`${baseUrl}/pets/${petId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setShowDetails(data);
        setCurrentPage('details');
        renderPage();
      } catch (error) {
        console.error('Failed to fetch pet details:', error);
      }
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

    setPets([...pets, createPet]);
    setCurrentPage('catalog');
   }


  const  onDeleteClick = async (pet) => {
    const id = pet._id;
      const response = await fetch(`${baseUrl}/pets/${id}`,{
        method: 'DELETE'
      });

      setPets(oldPets => oldPets.filter(pet => pet._id !== id));
      setCurrentPage('catalog');
   }
    return(
      <>
        <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
            <a className="navbar-brand" href="/" onClick={(e) => handleNavClick(e,'home')}>
              <span>
                PetLovers
              </span>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className="navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav">
                  
                  <li className="nav-item">
                    <a className="nav-link" href="/catalog" onClick={(e) => handleNavClick(e,'catalog')}> Catalog </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/create" onClick={(e) => handleNavClick(e,'create')}> Add Pet </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="logIn" onClick={(e) => handleNavClick(e,'login')}> Log In </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="register" onClick={(e) => handleNavClick(e,'register')}>Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about" onClick={(e) => handleNavClick(e,'about')}>About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Log Out</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main>
      {renderPage()}
      </main>
      </>
    );
}