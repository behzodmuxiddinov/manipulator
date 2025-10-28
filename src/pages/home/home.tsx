import { Box } from "@mui/material";
import { AnimationField } from "@/components";

const Home = () => {
    return (
        <Box 
            sx={{
                width: '100%',
                height: '100%', 
                paddingTop: '24px',
                paddingBottom: '56px',
            }}
        >
            <AnimationField />
        </Box>
    )
};

export default Home;