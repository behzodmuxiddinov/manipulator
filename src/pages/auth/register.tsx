import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TRegister } from '@/types';
import { getLocalStorage, setLocalStorage, setUser } from '@/utils';
import { ROUTES } from '@/constants';
import { addUser } from '@/utils';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { HOME } = ROUTES;
  const users = getLocalStorage('users', true);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<TRegister>();
  const password = watch('password', '');

  const onSubmit: SubmitHandler<TRegister> = async (data) => {
    const { confirmPassword, ...rest } = data;
    if(users.find((user: TRegister) => user.username === rest.username && user.password === rest.password)){
      setError('Пользователь уже существует');
      return;
    }else{
        setError(null);
        setLoading(true);
        setUser(rest);
        addUser(rest);
        setLoading(false);
        setLocalStorage('isLogged', 'true');
        navigate(HOME);
    }
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
          Регистрация
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Имя пользователя"
          variant="outlined"
          {...register('username', { required: 'Имя пользователя обязательно' })}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
        />

        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          {...register('password', {
            required: 'Пароль обязателен',
            minLength: { value: 4, message: 'Минимум 4 символа' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <TextField
          label="Подтвердите пароль"
          type="password"
          variant="outlined"
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: value => value === password || 'Пароли не совпадают',
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Зарегистрироваться'}
        </Button>

        <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
          Уже есть аккаунт?{' '}
          <Link component={RouterLink} to="/" underline="hover">
            Войти
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
