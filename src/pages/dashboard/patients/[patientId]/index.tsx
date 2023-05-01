import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { PatientBasicDetails } from '../../../../components/dashboard/patient/patient-basic-details';
import { PatientDataManagement } from '../../../../components/dashboard/patient/patient-data-management';
import { PatientXRays } from '../../../../components/dashboard/patient/patient-xrays';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import getPatient, { GetPatientError, GetPatientResponse } from 'src/api/patients/getPatient';

const tabs = [
  { label: 'Detalles', value: 'details' },
  { label: 'Radiografías', value: 'xrays' },
];

const PatientDetails: NextPage = () => {
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

  const patient = data?.data.patient;
  const [currentTab, setCurrentTab] = useState<string>('details');

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  if (isLoading || !patient) {
    return <Box width={"100%"} p={5} textAlign="center">
      <CircularProgress />
    </Box>
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Detalle de paciente | Oncoweb
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
          <div>
            <Box sx={{ mb: 4 }}>
              <NextLink
                href="/"
                passHref
              >
                <Link
                  color="textPrimary"
                  component="a"
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="subtitle2">
                    Pacientes
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(patient?.fullName)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {patient?.email}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      identificador:
                    </Typography>
                    <Chip
                      label={patient?._id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{ m: -1 }}
              >
                <NextLink
                  href={`/dashboard/patients/${patient?._id}/edit`}
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={(<PencilAltIcon fontSize="small" />)}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Edit
                  </Button>
                </NextLink>
                <NextLink
                  href={`/dashboard/radiographs/${patient?._id}/new`}
                  passHref
                >
                  <Button
                    component="a"
                    sx={{ m: 1 }}
                    variant="contained"
                  >
                    Agregar Radiografía
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === 'details' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <PatientBasicDetails {...patient}/>
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <PatientDataManagement onClick={() => {}} />
                </Grid>
              </Grid>
            )}
            {currentTab === 'xrays' && <PatientXRays patientId={patientId!}/>}
          </Box>
        </Container>
      </Box>
    </>
  );
};

PatientDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout hideSidebar={true}>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default PatientDetails;

