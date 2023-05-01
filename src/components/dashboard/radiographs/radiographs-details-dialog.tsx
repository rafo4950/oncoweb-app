import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Radiography } from 'src/@types/radiography';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { ref, getDownloadURL } from "firebase/storage";
import storage from 'src/lib/storage';
import { Box, CircularProgress } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

type RadiographsDetailsDialogProps = {
    open: boolean;
    handleClose: VoidFunction;
    radiography?: Radiography;
}

export default function RadiographsDetailsDialog({ open, radiography, handleClose }: RadiographsDetailsDialogProps) {
    const align = 'horizontal';
    const [publicUrl, setPublicUrl] = React.useState<string>();

    React.useEffect(() => {
        const imageUrl = radiography?.imageUrl;
        if (!imageUrl) {
            setPublicUrl(undefined);
            return;
        }
        const imageUrlRef = ref(storage, imageUrl);
        getDownloadURL(imageUrlRef).then(setPublicUrl).catch((err) => {
            console.log(err)
            setPublicUrl(undefined)
        })
    }, [radiography?.imageUrl])

    return (
        <div>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Radiografía
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <PropertyList>
                        <PropertyListItem
                            align={align}
                            divider
                            label="Nombre"
                            value={radiography?.name || ""}
                        />
                        <PropertyListItem
                            align={align}
                            divider
                            label="Descripcción"
                        >
                            {radiography?.description && <div dangerouslySetInnerHTML={{ __html: radiography?.description }} />}
                        </PropertyListItem>
                        <PropertyListItem
                            align={align}
                            divider
                            label="Predicción"
                            value={radiography?.category || ""}
                        />
                        <PropertyListItem
                            align={align}
                            divider
                            label="Fecha de creación"
                            value={radiography ? new Date(radiography.createdAt).toLocaleString() : ""}
                        />
                        <PropertyListItem
                            align={align}
                            divider
                            label="Imagen"
                        >
                            {!publicUrl && <Box p={5} textAlign="center"><CircularProgress /></Box>}
                            {publicUrl && <Box><img src={publicUrl} alt="Prediction" width="200" height="200"/></Box>}
                        </PropertyListItem>
                    </PropertyList>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}