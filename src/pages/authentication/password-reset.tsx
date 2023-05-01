import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Card, Container, Divider, Link, Typography } from '@mui/material';
import { GuestGuard } from '../../components/authentication/guest-guard';
import { FirebasePasswordReset } from '../../components/authentication/firebase-password-reset';
import { Logo } from '../../components/logo';
import { gtm } from '../../lib/gtm';

const PasswordReset: NextPage = () => {

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Password Reset | Oncoweb
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: '60px',
              md: '120px'
            }
          }}
        >
          <Card
            elevation={16}
            sx={{ p: 4 }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">
                Password Reset
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ mt: 2 }}
                variant="body2"
              >
                Reset your account password using your code
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3
              }}
            >
              <FirebasePasswordReset />
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
                <NextLink
                  href={'/authentication/password-recovery'}
                  passHref
                >
                  <Link
                    color="textSecondary"
                    variant="body2"
                  >
                    Did you not receive the code?
                  </Link>
                </NextLink>
              </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

PasswordReset.getLayout = (page) => (
  <GuestGuard>
    {page}
  </GuestGuard>
);

export default PasswordReset;
