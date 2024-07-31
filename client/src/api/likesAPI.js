import { get, post } from "./requester";

export async function getAllLikesPerPet(petId){
    const params = new URLSearchParams({
        where: `petId="${petId}"`
    })
    const res = await get(`data/likes?${params.toString()}`);
    return res;
}

export async function createLike(data){
    const createdLike = await post(`data/likes`, data);
    return createdLike;
}
