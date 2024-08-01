import { useEffect, useState } from "react";
import { getProfileById } from "../api/profilesAPI";

export function useGetProfile(id){
    const [profile, setProifle] = useState(null);

    useEffect(() => {
        (async function getUser (){
          try{
            const foundUser = await getProfileById(id);
            setProifle(foundUser);
          } catch (err){
            console.log(err.message);
          }
          
        })()
    },[])

    return {
        profile,
        setProifle
    }
}