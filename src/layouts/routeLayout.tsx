import App from "@/App";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/hooks";
import { LogOutBtn } from "@/components";
import { Box } from "@mui/material";

export const RouteLayout = () => {
    useAuth();
    return (
        <App>
            <Box sx={{ position: "relative", minHeight: "100vh"}}>
                <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                    <LogOutBtn />
                </Box>

                <Box sx={{ pt: 2 }}>
                    <Outlet />
                </Box>
            </Box>
        </App>
    )
};