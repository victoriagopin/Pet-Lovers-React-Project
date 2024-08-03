import { useContext, useEffect } from "react";
import { UserContext } from "../../conetxts/UserContext";
import { Navigate, Outlet} from "react-router-dom";

export default function HasAccess(){
    const {isAuthenticated} = useContext(UserContext);

    useEffect(() => {
        if (!isAuthenticated) {
            localStorage.clear();
        }
    }, [isAuthenticated]);

    return (
        isAuthenticated 
        ? <Outlet /> 
        : <Navigate to={'/login'} />
    )
}