import * as React from 'react';
import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import { Fingerprint, Visibility, VisibilityOff } from '@mui/icons-material';

import styles from '@/styles/Home.module.scss';
import { loginApi } from '@/utility/api/loginApi';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginResult = await loginApi({
      // TODO: Sanitize input!
      email: event.target.email.value,
      password: event.target.password.value
    });
    if (loginResult && loginResult.token) {
      router.push('/user-list');
    }
  }

  return (
    <>
      <Head>
        <title>Awesome User List | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Prove it's you:
            </Typography>
            <form onSubmit={handleLogin}>
              <div>
                <TextField
                  label="Your e-mail"
                  id="email"
                  sx={{ m: 1, width: '25ch' }}
                  required
                />
              </div>
              <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              <div className={styles.centeredContent}>
                <Button
                  sx={{ m: 1, width: '20ch' }}
                  variant="outlined"
                  startIcon={<Fingerprint />}
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
