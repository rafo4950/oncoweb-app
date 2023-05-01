import { useEffect } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { PatientCreateForm } from '../../../components/dashboard/patient/patient-create-form';
import { gtm } from '../../../lib/gtm';

const PatientCreate: NextPage = () => {
    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    return (
        <>
            <Head>
                <title>
                    Dashboard: Crear nuevo paciente | Oncoweb
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h4">
                            Crear nuevo paciente
                        </Typography>
                        <Breadcrumbs
                            separator="/"
                            sx={{ mt: 1 }}
                        >
                            <NextLink
                                href="/"
                                passHref
                            >
                                <Link variant="subtitle2">
                                    Pacientes
                                </Link>
                            </NextLink>
                            <Typography
                                color="textSecondary"
                                variant="subtitle2"
                            >
                                Crear paciente
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <PatientCreateForm />
                </Container>
            </Box>
        </>
    );
};

PatientCreate.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout hideSidebar={true}>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default PatientCreate;
