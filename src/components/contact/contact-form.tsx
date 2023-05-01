import type { FC, FormEvent } from 'react';
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import createAccountRequest from 'src/api/accountRequests/createAccountRequest';
import { useMounted } from 'src/hooks/use-mounted';
import toast from 'react-hot-toast';

export const ContactForm: FC = () => {
  const isMounted = useMounted();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      medicalCenter: '',
      linkedinID: '',
      message: '',
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
      medicalCenter: Yup
        .string()
        .max(255)
        .required('medicalCenter is required'),
      linkedinID: Yup
        .string()
        .max(255)
        .required('linkedinID is required'),
      message: Yup
        .string()
        .max(255)
        .required('message is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      toast.promise(
        createAccountRequest(values),
         {
           loading: 'Enviando...',
           success: () => {
            helpers.resetForm()
            return 'Solicitud enviada!';
           },
           error: (err) => {
            console.error(err);
            if (isMounted()) {
              helpers.setStatus({ success: false });
              helpers.setErrors({ submit: err.message });
              helpers.setSubmitting(false);
            }
            return 'Hubo un error'
           },
         }
      );
    }
  });

  return (
    <form 
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Nombre completo *
          </Typography>
          <TextField
            error={Boolean(formik.touched.fullName && formik.errors.fullName)}
            fullWidth
            helperText={formik.touched.fullName && formik.errors.fullName}
            margin="normal"
            name="fullName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.fullName}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Centro medico*
          </Typography>
          <TextField
            error={Boolean(formik.touched.medicalCenter && formik.errors.medicalCenter)}
            fullWidth
            helperText={formik.touched.medicalCenter && formik.errors.medicalCenter}
            margin="normal"
            name="medicalCenter"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.medicalCenter}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Correo corporativo *
          </Typography>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            value={formik.values.email}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            LinkedIn ID *
          </Typography>
          <TextField
            error={Boolean(formik.touched.linkedinID && formik.errors.linkedinID)}
            fullWidth
            helperText={formik.touched.linkedinID && formik.errors.linkedinID}
            margin="normal"
            name="linkedinID"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.linkedinID}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            sx={{ mb: 1 }}
            variant="subtitle2"
          >
            Message
          </Typography>
          <TextField
            error={Boolean(formik.touched.message && formik.errors.message)}
            fullWidth
            helperText={formik.touched.message && formik.errors.message}
            margin="normal"
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            value={formik.values.message}
            multiline
            rows={6}
          />
        </Grid>
      </Grid>
      {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>
              {formik.errors.submit}
            </FormHelperText>
          </Box>
        )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3
        }}
      >
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Enviar solicitud
        </Button>
      </Box>
      <Typography
        color="textSecondary"
        sx={{ mt: 3 }}
        variant="body2"
      >
        Al enviar esto, acepta la
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Política de privacidad
        </Link>
        {' '}
        y
        {' '}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          Política de cookies
        </Link>
        .
      </Typography>
    </form>
  );
};
