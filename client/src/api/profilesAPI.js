import { del, get, post, put } from "./requester";

export async function getAllProfiles(){
    const profiles = await get('data/profiles');
    return profiles;
}

export async function getProfileById(id){
    const profile = await get(`data/profiles/${id}`);
    return profile;
}

export async function updateProfile(id, data){
    const updatedProfile = await put(`data/profiles/${id}`, data);
    return updatedProfile;
}

export async function createProfile(data){
    const createdProfile = await post(`data/profiles`, data);
    return createdProfile;
}

export async function deleteProfile(id){
    const deleted = await del(`data/profiles/${id}`);
    return deleted;
}

export async function logout(){
    const res = await get('users/logout');
    return res;
}