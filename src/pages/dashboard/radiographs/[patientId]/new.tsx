import { useEffect } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RadiographyCreateForm } from '../../../../components/dashboard/radiographs/radiographs-create-form';
import { gtm } from '../../../../lib/gtm';
import { useRouter } from 'next/router';

const RadiographyCreate: NextPage = () => {
    const { query } = useRouter();
    const patientId = query.patientId as string | undefined;

    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    return (
        <>
            <Head>
                <title>
                    Dashboard: Crear nueva radiografía | Oncoweb
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
                            Crear nueva radiografía
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
                                Crear radiografía
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    <RadiographyCreateForm patientId={patientId || ""} />
                </Container>
            </Box>
        </>
    );
};

RadiographyCreate.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout hideSidebar={true}>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default RadiographyCreate;
