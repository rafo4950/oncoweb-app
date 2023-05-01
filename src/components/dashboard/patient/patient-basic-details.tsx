import type { FC } from 'react';
import { Card, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';
import { Patient } from 'src/@types/patient';

type PatientBasicDetailsProps = Omit<Patient, "xRays" | "owner" | "_id">;

export const PatientBasicDetails: FC<PatientBasicDetailsProps> = (props) => {
  const { address, country, email, fullName, phone, reference, region } = props;
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
    <Card>
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Nombre completo"
          value={fullName}
        />
        <PropertyListItem
          align={align}
          divider
          label="Correo electrónico"
          value={email}
        />
        <PropertyListItem
          align={align}
          divider
          label="Celular"
          value={phone}
        />
        <PropertyListItem
          align={align}
          divider
          label="País"
          value={country}
        />
        <PropertyListItem
          align={align}
          divider
          label="Región"
          value={region}
        />
        <PropertyListItem
          align={align}
          divider
          label="Dirección"
          value={address}
        />
        <PropertyListItem
          align={align}
          divider
          label="Referencia"
          value={reference}
        />
      </PropertyList>
    </Card>
  );
};
