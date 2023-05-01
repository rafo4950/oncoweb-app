import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from '@mui/material';
import createPatient from 'src/api/patients/createPatient';
import { Patient } from 'src/@types/patient';
import updatePatient from 'src/api/patients/updatePatient';
import { useEffect } from 'react';

export const PatientCreateForm = ({ patient }: { patient?: Patient }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      fullName: patient?.fullName || '',
      email: patient?.email || '',
      phone: patient?.phone || '',
      country: patient?.country || '',
      region: patient?.region || '',
      address: patient?.address || '',
      reference: patient?.reference || '',
      submit: null
  },
  validationSchema: Yup.object({
      fullName: Yup
          .string()
          .max(255)
          .required('fullName is required'),
      email: Yup
          .string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
      phone: Yup
          .string()
          .max(255)
          .required('phone is required'),
      country: Yup
          .string()
          .max(255)
          .required('country is required'),
      region: Yup
          .string()
          .max(255)
          .required('region is required'),
      address: Yup
          .string()
          .max(255)
          .required('address is required'),
      reference: Yup
          .string()
          .max(255)
          .required('reference is required'),
  }),
    onSubmit: async (values, helpers): Promise<void> => {
      toast.promise(
        patient?._id ? updatePatient(patient._id, values) : createPatient(values),
         {
           loading: 'Guardando...',
           success: () => {
            router.push('/').catch(console.error);
            if (patient?._id) {
              return 'Paciente actualizado'
            }
            return 'Paciente creado';
           },
           error: (err) => {
            console.error(err);
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
            return 'Hubo un error'
           },
         }
      );
    }
  });

  useEffect(() => {
    formik.setValues({
      fullName: patient?.fullName || '',
      email: patient?.email || '',
      phone: patient?.phone || '',
      country: patient?.country || '',
      region: patient?.region || '',
      address: patient?.address || '',
      reference: patient?.reference || '',
      submit: null
    })
  }, [patient])
  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                fullWidth
                helperText={formik.touched.fullName && formik.errors.fullName}
                label="Nombre completo"
                name="fullName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Correo electrónico"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Celular"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label="País"
                name="country"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.region && formik.errors.region)}
                fullWidth
                helperText={formik.touched.region && formik.errors.region}
                label="Región"
                name="region"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.region}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Dirección"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <TextField
                error={Boolean(formik.touched.reference && formik.errors.reference)}
                fullWidth
                helperText={formik.touched.reference && formik.errors.reference}
                label="Referencia"
                name="reference"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.reference}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        
        
        <Button
          sx={{ m: 1, ml: "auto" }}
          type="submit"
          variant="contained"
        >
          {patient?._id ? "Guardar" : "Crear"}
        </Button>
      </Box>
    </form>
  );
};
