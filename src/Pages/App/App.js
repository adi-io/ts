import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';

export default function AppPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme></CssBaseline>
    </AppTheme>
          );
        }