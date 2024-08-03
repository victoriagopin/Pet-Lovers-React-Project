import { NavLink,  useNavigate } from "react-router-dom";
import { useContext} from "react";
import { UserContext } from "../../conetxts/UserContext";
import { logout } from "../../api/profilesAPI.js";

export default function Header(){
   const {user, setUser, updateIsAuthenticated} = useContext(UserContext);
    const navigate = useNavigate();

    const loggingOut = async ()=> {
      try {
        await logout();

          setUser(null);
          updateIsAuthenticated();
          localStorage.clear();
          navigate('/');
  
      } catch (err){
        console.log(err.message);
      }
     
    }

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
                    <NavLink className="nav-link" to="/search" > Search </NavLink>
                  </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/catalog" > Catalog </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/about" >About</NavLink>
                  </li>
                  {user ? 
                  <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/create" > Add Pet </NavLink>
                  </li> 
                  <li className="nav-item">
                    <NavLink className="nav-link" to="#" onClick={loggingOut}>Log Out</NavLink>
                  </li>
                  </>
                  : <>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logIn" > Log In </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register" >Register</NavLink>
                  </li>
                  </>}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      </>
    );
}