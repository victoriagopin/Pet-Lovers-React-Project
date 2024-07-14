import About from "./components/about/About";
import Catalog from "./components/catalog/Catalog";
import CreatePet from "./components/create/Create";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import {Route, Routes} from "react-router-dom";
import LogIn from "./components/login/LogIn";
import Register from "./components/register/Register";
import { useState,useEffect } from "react";
import CatalogItem from "./components/catalog/catalog-item/CatalogItem";
import Details from "./components/catalog/details/Details";
import OwnerForm from "./components/owner-form/OwnerForm";
import OwnerProfile from "./components/owner-profile/OwnerProfile";
import EditPet from "./components/edit/Edit";

const baseUrl = 'http://localhost:3030/jsonstore'

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    (async function getPets(){
      const response = await fetch(`${baseUrl}/pets`);
      const data = await response.json();
      const petsResult =  Object.values(data);
      
      setPets(petsResult);
    })();
  },[]);
  return (
    <>
      <Header />

      <Routes >
        <Route path="/" element={< Home />}/>
        <Route path="/catalog" element={< Catalog pets={pets}/>}/>
        <Route path="/catalog/:petId" element={< Details/>}/>
        <Route path="/edit/:petId" element={<EditPet />} />
        <Route path="/create" element={< CreatePet/>}/>
        <Route path="/login" element={< LogIn/>}/>
        <Route path="/register" element={< Register/>}/>
        <Route path="/about" element={< About/>}/>
        <Route path="/setup-owner-profile/:ownerId" element={<OwnerForm />}/>
        <Route path="/profile/:ownerId" element={<OwnerProfile/>} />
      </Routes>
    </>
  )
}

export default App
