import { useEffect } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, CircularProgress, Container, Link, Typography } from '@mui/material';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { PatientCreateForm } from '../../../../components/dashboard/patient/patient-create-form';
import { gtm } from '../../../../lib/gtm';
import { useQuery } from '@tanstack/react-query';
import getPatient, { GetPatientResponse, GetPatientError } from 'src/api/patients/getPatient';
import { useRouter } from 'next/router';

//
const PatientEdit: NextPage = () => {
  const { query } = useRouter();
  const patientId = query.patientId as string | undefined;
  const { data, isLoading } = useQuery<GetPatientResponse, GetPatientError>(
    ['getPatient', patientId],
    async () => await getPatient(patientId!),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !!patientId,
      cacheTime: 0,
    }
  );

    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    return (
        <>
            <Head>
                <title>
                    Dashboard:  Editar paciente | Oncoweb
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
                            Editar paciente
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
                                Editar paciente
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                    {isLoading && <Box width={"100%"} p={5} textAlign="center">
                      <CircularProgress />
                    </Box>}
                    {data?.data.patient && <PatientCreateForm patient={data?.data.patient}/>}
                </Container>
            </Box>
        </>
    );
};

PatientEdit.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout hideSidebar={true}>
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default PatientEdit;
