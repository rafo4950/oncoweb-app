import { useEffect, useState } from 'react';
import type { ChangeEvent, FC, MouseEvent } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import type { Patient } from '../../../@types/patient';
import { Scrollbar } from '../../scrollbar';
import TableLoading from 'src/components/widgets/table/TableLoading';
import TableNoData from 'src/components/widgets/table/TableNoData';

interface PatientListTableProps {
  loading: boolean;
  patients: Patient[];
  patientsCount: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  rowsPerPage: number;
}

export const PatientListTable: FC<PatientListTableProps> = (props) => {
  const {
    loading,
    patients,
    patientsCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [patients]
  );
 
  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: 'visible' }}>
            <TableRow>
              <TableCell>
                Nombre
              </TableCell>
              <TableCell>
                Radiografías
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableNoData isNotFound={!loading && patients.length === 0} />
            <TableLoading isLoading={loading} />
            {patients.map((patient) => {
                return (
                  <TableRow
                    hover
                    key={patient._id}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Box sx={{ ml: 1 }}>
                          <NextLink
                            href={`/dashboard/patients/${patient._id}`}
                            passHref
                          >
                            <Link
                              color="inherit"
                              variant="subtitle2"
                            >
                              {patient.fullName}
                            </Link>
                          </NextLink>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                          >
                            {patient.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {patient.xRays}
                    </TableCell>
                    <TableCell align="right">
                      <NextLink
                        href={`/dashboard/patients/${patient._id}/edit`}
                        passHref
                      >
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                      <NextLink
                        href={`/dashboard/patients/${patient._id}`}
                        passHref
                      >
                        <IconButton component="a">
                          <ArrowRightIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={patientsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

PatientListTable.propTypes = {
  patients: PropTypes.array.isRequired,
  patientsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
