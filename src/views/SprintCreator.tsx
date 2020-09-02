import { useMutation } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { cacheUpdates, mutations } from 'api';
import Form from 'components/Form';
import DatePicker from 'components/Form/DatePicker';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Sprint } from 'types';

const SprintCreator: FunctionComponent = () => {
  const [createSprint, { data, loading: isLoading }] = useMutation<{
    createSprint: Sprint;
  }>(mutations.createSprint, cacheUpdates.saveNewSprint);

  if (data) return <Redirect to={`/sprints/${data.createSprint.id}`} />;

  return (
    <>
      <h2>Create a sprint</h2>
      <Subhead>Pick your end date.</Subhead>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Form>
          <DatePicker
            onChange={(date) => createSprint({ variables: { endDate: date } })}
          />
        </Form>
      )}
    </>
  );
};

const Subhead = styled.p`
  padding-bottom: 32px;
`;

export default SprintCreator;
