import { useEffect } from "react";
import { useState } from "react";
import Catalog from "../catalog/Catalog";
import Home from "../home/Home";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function Header(){
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage){
      case 'catalog':
        return <Catalog pets={pets}/>;
      case 'home':
        return <Home />;
      default: 
        return <Home />
    }
  }

  const handleNavClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page)
  }

  useEffect(() => {
    (async function getPets(){
      const response = await fetch(`${baseUrl}/pets`);
      const data = await response.json();
      const petsResult =  Object.values(data);
      
      setPets(petsResult);
    })();
  },[]);

    return(
      <>
        <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
            <a className="navbar-brand" href="index.html">
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
                    <a className="nav-link" href="#"> Add Dogs </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"> Log In </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
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