import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { uuid } from "uuidv4";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import type { File } from '../../file-dropzone';
import { FileDropzone } from '../../file-dropzone';
import { QuillEditor } from '../../quill-editor';
import { fileToBase64 } from 'src/utils/file-to-base64';
import createRadiography from 'src/api/radiographs/createRadiography';
import axios from 'axios';
import FormData from 'form-data';
import { apiConfig } from 'src/config';
import { ref, uploadBytes } from "firebase/storage";
import storage from 'src/lib/storage';

export const RadiographyCreateForm = (props: { patientId: string }) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = async (file: File, url: string) => {
    const storageRef = ref(storage, url);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    await uploadBytes(storageRef, file);
  };

  const predict = async (base64String: string) => {
    // Create a new form instance
    const form = new FormData();

    // create Buffer from base64 data
    const bufferData = Buffer.from(base64String, 'base64');

    // create Blob from Buffer
    const blob = new Blob([bufferData], { type: 'image/png' });

    // Create a form and append image with additional fields
    form.append('file', blob, "prediction.png");

    // Send form data with axios
    const response = await axios.post(`${apiConfig.mlUrl}/prediction/vgg16`, form, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    const prediction = response.data?.prediction || [];
    let category;
    let acc;
    for (const pred of prediction) {
      const categoryVal = pred[0];
      const accVal = Number.parseFloat((pred[1] as string).replace("%", ""));
      if (!category || !acc || accVal > acc) {
        category = categoryVal;
        acc = accVal;
      }
    }
    return `${category} (${acc}%)`;
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      imageUrl: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required(),
      description: Yup.string().max(5000),
      imageUrl: Yup.string().required(),
      category: Yup.string(),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      toast.promise(
        createRadiography({ ...values, patient: props.patientId }),
        {
          loading: 'Enviando...',
          success: () => {
            router.back()
            return 'Operación completada';
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

  const handleDrop = (newFiles: File[]): void => {
    toast.promise(
      (async () => {
        const url = `radiographs/${uuid()}`;
        const base64 = await fileToBase64(newFiles[0]);
        const prediction = await predict(base64);
        await handleUpload(newFiles[0], url);
        formik.setFieldValue('imageUrl', url);
        formik.setFieldValue('category', prediction);
        setFiles(newFiles);
      })(),
      {
        loading: 'Validando...',
        success: 'Imagen guardada',
        error: (err) => {
          console.error(err);
          return 'Hubo un error'
        },
      }
    );
  };

  const handleRemove = (file: File): void => {
    formik.setFieldValue('image', '');
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

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
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Detalle
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nombre"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3
                }}
                variant="subtitle2"
              >
                Descripcción
              </Typography>
              <QuillEditor
                onChange={(value: string): void => {
                  formik.setFieldValue(
                    'description',
                    value
                  );
                }}
                placeholder="Escribe algo..."
                sx={{ height: 400 }}
                value={formik.values.description}
              />
              {Boolean(formik.touched.description && formik.errors.description) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Imagen
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <FileDropzone
                accept={{
                  'image/*': []
                }}
                multiple={false}
                files={files}
                maxFiles={1}
                onDrop={handleDrop}
                onRemove={handleRemove}
              />
              {Boolean(formik.touched.imageUrl && formik.errors.imageUrl) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {formik.errors.imageUrl}
                  </FormHelperText>
                </Box>
              )}
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
          Crear
        </Button>
      </Box>
    </form>
  );
};
