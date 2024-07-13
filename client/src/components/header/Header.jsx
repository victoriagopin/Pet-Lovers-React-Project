import { Link, NavLink, Navigate } from "react-router-dom";

const baseUrl = 'http://localhost:3030/jsonstore'

export default function Header(){
    return(
      <>
        <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
            <NavLink className="navbar-brand" to="/" >
              <span>
                PetLovers
              </span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className="navbar-collapse" id="navbarSupportedContent">
              <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav">
                  
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/catalog" > Catalog </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/create" > Add Pet </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/logIn" > Log In </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register" >Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about" >About</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="#">Log Out</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* <main>
      {renderPage()}
      </main> */}
      </>
    );
}