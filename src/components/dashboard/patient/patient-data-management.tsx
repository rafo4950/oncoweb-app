import { Box, Button, Card, CardContent, Typography } from '@mui/material';

export const PatientDataManagement = (props: { onClick: VoidFunction }) => (
  <Card {...props}>
    <CardContent>
      <Button
        color="error"
        variant="outlined"
        onClick={props.onClick}
      >
        Eliminar paciente
      </Button>
      <Box sx={{ mt: 1 }}>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Elimine estos datos del paciente si lo solicitó; de lo contrario, tenga en cuenta que lo que se eliminó nunca podrá recuperarse.
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
