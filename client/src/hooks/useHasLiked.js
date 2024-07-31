import { useEffect, useState } from "react";
import { getAllLikesPerPet } from "../api/likesAPI";

export function useHasLiked(petId, ownerId) {
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const res = await getAllLikesPerPet(petId);
                const userLiked = res.some(e => e._ownerId === ownerId);
                setHasLiked(userLiked);
            } catch (error) {
                console.error("Failed to fetch likes:", error);
            }
        };

        checkIfLiked();
    }, [petId, ownerId]);

    const changeLikeState = (state) => {
        setHasLiked(state);
    };

    return {
        hasLiked,
        changeLikeState
    };
}
