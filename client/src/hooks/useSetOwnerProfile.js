import { useEffect, useState } from "react";
import { getAllProfiles, getProfileById } from "../api/profilesAPI";

export function useSetOwner(animal){
    const [ownerProfile, setOwnerProfile] = useState(null);
    const [hasProfile, sethasProifle] = useState(false);

    useEffect(() => {
        if (animal._ownerId) {
            const fetchOwnerProfile = async () => {
                try{
                const profiles = await getAllProfiles();
                const profile = profiles.find(profile => profile._ownerId === animal._ownerId);
                setOwnerProfile(profile);
                } catch (err){
                    console.log(err.message);
                }
            };
            fetchOwnerProfile();
        }
    }, [animal._ownerId]);

    if(ownerProfile){
        const getOwner = async () => {
            try{
                const response = await getProfileById(ownerProfile._id);

                if (typeof response == 'number') {
                   console.log(response);
                } 

                sethasProifle(true);
            } catch (err){
                console.log(err.message);
            }
          
        };
        getOwner();
    }

    return {
        ownerProfile,
        hasProfile
    }
}