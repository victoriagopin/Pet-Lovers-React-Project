import { del, get, put } from "./requester";

export async function getAllPets(){
    const pets = await get('data/pets');
    return pets;
}

export async function getPetById(id){
    const pet = await get(`data/pets/${id}`);
    return pet;
}

export async function updatePet(id, data){
    const updatedPet = await put(`data/pets/${id}`, data);
    return updatedPet;
}

export async function deletePetById(id){
    const deleted = await del(`data/pets/${id}`);
    return deleted;
}