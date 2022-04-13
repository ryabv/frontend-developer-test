import React from 'react';

import HistoryTable from '../../entities/HistoryTable/HistoryTable';
import api from '../../../lib/api';

const UsersHistoryTable = () => (
  <HistoryTable apiHandler={api.getUsersDiff} title="Users History" />
);

export default UsersHistoryTable;
