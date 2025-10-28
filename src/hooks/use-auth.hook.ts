import { getLocalStorage } from "@/utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";
import { useEffect } from "react";

export const useAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = getLocalStorage("isLogged", true);
        if (!isLoggedIn) {
            navigate(ROUTES.LOGIN);
        }
    }, [navigate]);
};