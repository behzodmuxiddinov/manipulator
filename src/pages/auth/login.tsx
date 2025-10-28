import { TLogin, TUser } from '@/types';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { getLocalStorage, setLocalStorage } from '@/utils';
import { ROUTES } from '@/constants';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<TLogin>();
    const users = getLocalStorage('users', true);
    const navigate = useNavigate();
    const { HOME, REGISTER } = ROUTES;

    const onSubmit = (data: TLogin) => {
        const { username, password } = data;
        setLoading(true);
        if(users && users.find((user: TUser) => user.username === username && user.password === password)){
            setLocalStorage('isLogged', 'true');
            navigate(HOME);
        }else{
            setError('Пользователь не найден');
        }
        setLoading(false);
    };
    return (
         <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: 360,
                    p: 4,
                    bgcolor: 'white',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h5" textAlign="center" fontWeight="bold">
                    Авторизоваться
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    label="Имя пользователя"
                    variant="outlined"
                    {...register('username', { required: 'Требуется имя пользователя' })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    fullWidth
                    onChange={() => setError('')}
                />

                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    {...register('password', {
                        required: 'Требуется пароль',
                        minLength: { value: 4, message: 'Минимум 4 символа' },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    fullWidth
                    onChange={() => setError('')}
                />
                <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                    Нет аккаунта?{' '}
                    <Link component={RouterLink} to={REGISTER} underline="hover">
                        Зарегистрироваться
                    </Link>
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 1 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Вход'}
                </Button>
            </Box>
        </Box>
    )
};

export default Login;