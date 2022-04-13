import React from 'react';

import HistoryTable from '../../entities/HistoryTable/HistoryTable';
import api from '../../../lib/api';

const ProjectsHistoryTable = () => (
  <HistoryTable apiHandler={api.getProjectsDiff} title="Projects History" />
);

export default ProjectsHistoryTable;
