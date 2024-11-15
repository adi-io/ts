import * as React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Stack,
  Select,
  Option,
  Typography,
  Card,
  CardActions,
  CardOverflow,
} from '@mui/joy';
import { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import '@fontsource/inter';

// Simplified CardItself component
function CardItself() {
  return (
    <Card>
      <Box sx={{ mb: 1 }}>
        <Typography level="title-md">Personal info</Typography>
        <Typography level="body-sm">
          Customize how your profile information will appear to the networks.
        </Typography>
      </Box>
      <Divider />

      {/* Desktop layout */}
      <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}>
        <ProfilePicture />
        <ProfileForm />
      </Stack>

      {/* Mobile layout */}
      <Stack direction="column" spacing={2} sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}>
        <Stack direction="row" spacing={2}>
          <ProfilePicture />
          <NameInput />
        </Stack>
        <ProfileDetails />
      </Stack>

      <CardFooter />
    </Card>
  );
}

// Profile picture component for reuse
function ProfilePicture() {
  return (
    <Stack direction="column" spacing={1}>
      <AspectRatio ratio="1" maxHeight={200} sx={{ flex: 1, minWidth: 120, borderRadius: '50%' }}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
          alt=""
          loading="lazy"
        />
      </AspectRatio>
      <IconButton
        aria-label="upload new picture"
        size="sm"
        variant="outlined"
        color="neutral"
        sx={{
          bgcolor: 'background.body',
          position: 'absolute',
          zIndex: 2,
          borderRadius: '50%',
          left: 100,
          top: 170,
          boxShadow: 'sm',
        }}
      >
        <EditRoundedIcon />
      </IconButton>
    </Stack>
  );
}

// Reusable form sections
function NameInput() {
  return (
    <FormControl sx={{ gap: 2, display: { sm: 'flex-column', md: 'flex-row' } }}>
      <Input size="sm" placeholder="First name" />
      <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
    </FormControl>
  );
}

function ProfileForm() {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <NameInput />
      <ProfileDetails />
    </Stack>
  );
}

function ProfileDetails() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Input size="sm" defaultValue="UI Developer" />
        </FormControl>
        <FormControl sx={{ flexGrow: 1 }}>
          <FormLabel>Email</FormLabel>
          <Input
            size="sm"
            type="email"
            startDecorator={<EmailRoundedIcon />}
            placeholder="email"
            defaultValue="siriwatk@test.com"
          />
        </FormControl>
      </Stack>
      <TimezoneSelector />
    </>
  );
}

// Timezone selector for reuse
function TimezoneSelector() {
  return (
    <FormControl sx={{ display: { sm: 'contents' } }}>
      <FormLabel>Timezone</FormLabel>
      <Select size="sm" startDecorator={<AccessTimeFilledRoundedIcon />} defaultValue="1">
        <Option value="1">
          Indochina Time (Bangkok) <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>— GMT+07:00</Typography>
        </Option>
        <Option value="2">
          Indochina Time (Ho Chi Minh City) <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>— GMT+07:00</Typography>
        </Option>
      </Select>
    </FormControl>
  );
}

// Footer with action buttons
function CardFooter() {
  return (
    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
      <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
        <Button size="sm" variant="outlined" color="neutral">Cancel</Button>
        <Button size="sm" variant="solid">Save</Button>
      </CardActions>
    </CardOverflow>
  );
}

// Main ConfigNode component
const ConfigNode = memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = () => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', height: '100%', padding: 0 }}
      onClick={handleCardClick}
    >
      <CardItself />
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#dddddd',
          borderRadius: '50%',
          width: '12px',
          height: '12px',
          border: '2px solid white',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#dddddd',
          borderRadius: '50%',
          width: '12px',
          height: '12px',
          border: '2px solid white',
        }}
      />
    </Card>
  );
});

export default ConfigNode;
