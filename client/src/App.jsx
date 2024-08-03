import About from "./components/about/About";
import Catalog from "./components/catalog/Catalog";
import CreatePet from "./components/create/Create";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import {Route, Routes} from "react-router-dom";
import LogIn from "./components/login/LogIn";
import Register from "./components/register/Register";
import Details from "./components/catalog/details/Details";
import OwnerForm from "./components/owner-form/OwnerForm";
import OwnerProfile from "./components/owner-profile/OwnerProfile";
import EditPet from "./components/edit/Edit";
import Footer from "./components/footer/Footer";
import EditProfile from "./components/edit-profile/EditProfile";
import Search from "./components/search/Search";
import HasAccess from "./components/hasAccess/HasAccess";
import Error from "./components/error/Error";



function App() {

  return (
    <>
      <Header />

      <Routes >
        <Route path="/" element={< Home />}/>
        <Route path="/search" element={< Search />} />
        <Route path="/catalog" element={< Catalog/>}/>
        <Route element={<HasAccess />}>
        <Route path="/catalog/:petId" element={< Details/>}/>
        <Route path="/edit/:petId" element={<EditPet />} />
        <Route path="/create" element={< CreatePet/>}/>
        <Route path="/setup-owner-profile" element={<OwnerForm />}/>
        <Route path="/profile/:ownerId" element={<OwnerProfile/>} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        </Route>
        <Route path="/login" element={< LogIn/>}/>
        <Route path="/register" element={< Register/>}/>
        <Route path="/about" element={< About/>}/>
        <Route path="*" element={<Error />}></Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
