import { useState, useEffect, useCallback, FormEvent, useRef } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { AuthGuard } from '../components/authentication/auth-guard';
import { DashboardLayout } from '../components/dashboard/dashboard-layout';
import { PatientListTable } from '../components/dashboard/patient/patient-list-table';
import { Plus as PlusIcon } from '../icons/plus';
import { Search as SearchIcon } from '../icons/search';
import { gtm } from '../lib/gtm';
import type { Patient } from '../@types/patient';
import { useQuery } from '@tanstack/react-query';
import listPatients, { ListPatientsError, ListPatientsResponse } from 'src/api/patients/listPatients';

interface Filters {
  query?: string;
}

const applyFilters = (
  patients: Patient[],
  filters: Filters
): Patient[] => patients.filter((patient) => {
  if (filters.query) {
    let queryMatched = false;
    const properties: ('email' | 'fullName')[] = ['email', 'fullName'];

    properties.forEach((property) => {
      if ((patient[property]).toLowerCase().includes(filters.query!.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  return true;
});

const applyPagination = (
  patients: Patient[],
  page: number,
  rowsPerPage: number
): Patient[] => patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const PatientList: NextPage = () => {
  const queryRef = useRef<HTMLInputElement | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    query: ''
  });
  const { isLoading } = useQuery<ListPatientsResponse, ListPatientsError>(
    ['listPatients'],
    async () => await listPatients(),
    {
      onSuccess(data) {
        setPatients(data?.data.patients)
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const handleQueryChange = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      query: queryRef.current?.value
    }));
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredPatients = applyFilters(patients, filters);
  const paginatedPatients = applyPagination(filteredPatients, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Lista de pacientes | Oncoweb
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Pacientes
                </Typography>
              </Grid>
              <Grid item>
                <NextLink
                  href="/dashboard/patients/new"
                  passHref
                >
                  <Button
                    startIcon={<PlusIcon fontSize="small" />}
                    variant="contained"
                  >
                    Agregar
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1.5,
                p: 3
              }}
            >
              <Box
                component="form"
                onSubmit={handleQueryChange}
                sx={{
                  flexGrow: 1,
                  m: 1.5
                }}
              >
                <TextField
                  defaultValue=""
                  fullWidth
                  inputProps={{ ref: queryRef }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                  placeholder="Buscar pacientes"
                />
              </Box>
            </Box>
            <PatientListTable
              loading={isLoading}
              patients={paginatedPatients}
              patientsCount={filteredPatients.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

PatientList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout hideSidebar={true}>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default PatientList;
