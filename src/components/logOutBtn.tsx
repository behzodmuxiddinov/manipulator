import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ButtonProps } from '@mui/material';
import { logoutAndPreserve, removeLocalStorage } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const LogOutBtn = () => {
    const navigate = useNavigate();
    const { LOGIN } = ROUTES;
    const ColorButton = styled(Button)<ButtonProps>(() => ({
        color: 'white',
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    }));
    const logout = () => {
        logoutAndPreserve(['users'])
        navigate(LOGIN);
    };
    return (
        <ColorButton variant="text" color="error" onClick={logout}>
            Выйти
        </ColorButton>
    )
};