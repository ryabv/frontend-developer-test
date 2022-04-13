import React from 'react';

import { Box, Container } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import ProjectsDiffTable from './widgets/ProjectsHistoryTable/ProjectsHistoryTable';
import UsersDiffTable from './widgets/UsersHistoryTable/UsersHistoryTable';
import { theme } from '../styles';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Container className="app" disableGutters fixed>
      <Box data-testid="app-box" m={2}>
        <Box mb={2}>
          <ProjectsDiffTable />
        </Box>

        <UsersDiffTable />
      </Box>
    </Container>
  </ThemeProvider>
);

export default App;
