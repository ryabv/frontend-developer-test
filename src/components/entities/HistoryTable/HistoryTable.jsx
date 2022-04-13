import React from 'react';

import {
  Box,
  Button,
  TableContainer,
  Paper,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import Table from '../../common/Table/Table';
import { useSortable } from '../../common/Table/hooks';
import useQuery  from '../../../hooks/useQuery';

import { initialOrderBy, headers, ERROR_MESSAGE, RETRY, FETCH_MORE } from './config';
import { useHistoryTable } from './hooks';

const HistoryTable = ({ title, apiHandler }) => {
  const {
    pending,
    data,
    error,
    refetch: fetchMore,
    response,
  } = useQuery(apiHandler);

  const { orderBy, handleSort } = useSortable({ initialOrderBy });
  const { sortedHistory } = useHistoryTable({ data, orderBy });
  const canFetchMore = sortedHistory.length !== response?.total;
  const hasError = Boolean(!pending && error);

  return (
    <Paper>
      {title && (
        <Box p={2}>
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}

      <TableContainer>
        <Table
          headers={headers}
          loading={pending}
          rows={sortedHistory}
          orderBy={orderBy}
          handleSort={handleSort}
        />
      </TableContainer>

      {canFetchMore && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={2}
        >
          {pending && (
            <CircularProgress />
          )}

          {hasError && (
            <Typography
              gutterBottom
              align="center"
              color="error"
            >
              {ERROR_MESSAGE}
            </Typography>
          )}

          {!pending && (
            <Button
              color="primary"
              variant="contained"
              onClick={fetchMore}
            >
              {hasError ? RETRY : FETCH_MORE}
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default HistoryTable;
