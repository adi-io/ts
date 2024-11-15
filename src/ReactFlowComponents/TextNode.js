import { Handle, useStore, Position, useReactFlow } from '@xyflow/react';
import React, { memo, Fragment, useState } from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import SvgIcon from '@mui/joy/SvgIcon';
import AspectRatio from '@mui/joy/AspectRatio';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';

import '@fontsource/inter';


function CountrySelect() {
  return (
    <Autocomplete
      placeholder="Choose a source"
      slotProps={{
        input: {
          autoComplete: 'new-password', // disable autocomplete and autofill
        },
      }}
      sx={{ width: 300 }}
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>
          <ListItemDecorator>
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
          </ListItemDecorator>
          <ListItemContent sx={{ fontSize: 'sm' }}>
            {option.label}
            <Typography level="body-xs">
              ({option.code}) +{option.phone}
            </Typography>
          </ListItemContent>
        </AutocompleteOption>
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'manual', label: 'Website ', phone: '376' },
  { code: 'bulk', label: 'Email ', phone: '376' },
];


const dimensionAttrs = ['width', 'height'];

function MultipleInteractionCard({ isSelected, onClick }) {
  return (
    <Card
        color="danger"
        invertedColors
        orientation="vertical"
        size="lg"
        variant="plain"
      >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
            Upload document
        </Typography>
        <Typography level="body-sm">
          <CountrySelect />
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">6.3k views</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">1 hour ago</Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}

const ClickableCard = memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = () => {
    // Update the selected ID to the current card's ID
    setSelectedId(prevId => (prevId === id ? null : id));
  };

  return (
    <>

      <Card
        variant="outlined" 
        sx={{ 
          width: '100%',           // Make card fit the parent width
          height: '100%',          // Make card fit the parent height
        }}
        style={{
          padding: '0',            // Remove padding
        }}
        onClick={handleCardClick} // Handle card click
      >
        <MultipleInteractionCard 
          isSelected={selectedId === id} 
          onClick={handleCardClick}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{
            background: '#dddddd',   // Change handle color
            borderRadius: '50%',     // Make it circular
            width: '12px',           // Handle width
            height: '12px',          // Handle height
            border: '2px solid white' // Add border
          }}
        />
      </Card>
    </>
  );
});

export default ClickableCard;
