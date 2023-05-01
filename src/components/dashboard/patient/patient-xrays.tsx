import { useState } from 'react';
import { format } from 'date-fns';
import {
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import listRadiographs, { ListRadiographsResponse, ListRadiographsError } from 'src/api/radiographs/listRadiographs';
import { useQuery } from '@tanstack/react-query';
import TableNoData from 'src/components/widgets/table/TableNoData';
import TableLoading from 'src/components/widgets/table/TableLoading';
import RadiographsDetailsDialog from '../radiographs/radiographs-details-dialog';
import { Radiography } from 'src/@types/radiography';
import { ArrowRight } from '@mui/icons-material';

export const PatientXRays = (props: { patientId: string }) => {
  const [openRadiographyDialog, setOpenRadiographyDialog] = useState(false);
  const [radiography, setRadiography] = useState<Radiography>();
  const { data, isLoading } = useQuery<ListRadiographsResponse, ListRadiographsError>(
    ['listRadiographs', props.patientId],
    async () => await listRadiographs(props.patientId),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    }
  );

  const radiographs = data?.data.radiographs || [];

  return (
    <Card {...props}>
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                NOMBRE
              </TableCell>
              <TableCell>
                FECHA
              </TableCell>
              <TableCell>
                PREDICCIÓN
              </TableCell>
              <TableCell>
                ESTADO
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableNoData isNotFound={!isLoading && radiographs.length === 0} />
            <TableLoading isLoading={isLoading} />
            {radiographs.map((_radiography) => (
              <TableRow key={_radiography._id}>
                <TableCell>
                  {_radiography.name}
                </TableCell>
                <TableCell>
                  {format(new Date(_radiography.createdAt), 'MMM dd,yyyy')}
                </TableCell>
                <TableCell>
                  {_radiography.category}
                </TableCell>
                <TableCell>
                  {<SeverityPill color={_radiography.category ? "success" : "info"}>
                    {_radiography.category ? "Completado" : "Pendiente"}
                  </SeverityPill>}
                </TableCell>
                <TableCell align="right">
                    <IconButton component="a" onClick={() => {
                      setRadiography(_radiography);
                      setOpenRadiographyDialog(true);
                    }}>
                      <ArrowRight fontSize="small" />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={radiographs.length}
        onPageChange={(): void => {
        }}
        onRowsPerPageChange={(): void => {
        }}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <RadiographsDetailsDialog open={openRadiographyDialog} radiography={radiography} handleClose={() => setOpenRadiographyDialog(false)}/>
    </Card>
  );
};
