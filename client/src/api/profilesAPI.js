import { get } from "./requester";

export async function getAllProfiles(){
    const profiles = await get('data/profiles');
    return profiles;
}

export async function getProfileById(id){
    const profile = await get(`data/profiles/${id}`);
    return profile;
}