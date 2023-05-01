import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import { ContactForm } from '../components/contact/contact-form';
import { ArrowLeft as ArrowLeftIcon } from '../icons/arrow-left';
import { Mail as MailIcon } from '../icons/mail';
import { gtm } from '../lib/gtm';
import NextLink from 'next/link';

const Contact: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Solicitar cuenta | Oncoweb
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(2, 1fr)',
            xs: 'repeat(1, 1fr)'
          },
          flexGrow: 1
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            py: 8
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15
              }
            }}
          >
            <NextLink
              href="/authentication/login"
              passHref
            >
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                Iniciar sesión
              </Button>
            </NextLink>
            <Typography
              variant="h3"
              sx={{ mt: 3 }}
            >
              Solicitar cuenta
            </Typography>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                mb: 6,
                mt: 8
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  mr: 2
                }}
                variant="rounded"
              >
                <MailIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline">
                Contactar a soporte
              </Typography>
            </Box>
            <Typography variant="h1">
              Ingresar información para perfil de especialista
            </Typography>
            <Typography
              sx={{ py: 3 }}
              variant="body1"
            >
              La información ingresada en el formulario será validada por nuestro equipo de soporte. En breve lo contactaremos vía correo para otorgarle sus credenciales.
            </Typography>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            px: 6,
            py: 15
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15
              }
            }}
          >
            <Typography
              sx={{ pb: 3 }}
              variant="h6"
            >
              Completa el formulario a continuación:
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
