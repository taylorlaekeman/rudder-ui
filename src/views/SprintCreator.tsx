import { useMutation } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { cacheUpdates, mutations } from 'api';
import Form from 'components/Form';
import DatePicker from 'components/Form/DatePicker';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Sprint } from 'types';

const Title = styled.h2`
  ${({ theme }) => theme.fonts.subtitle}
`;

const SprintCreator: FunctionComponent = () => {
  const [createSprint, { data, loading: isLoading }] = useMutation<{
    createSprint: Sprint;
  }>(mutations.createSprint, cacheUpdates.saveNewSprint);

  if (data) return <Redirect to={`/sprints/${data.createSprint.id}`} />;

  return (
    <>
      <Title>Create a sprint</Title>
      <p>
        The create a sprint, just select your target date. This date will serve
        as the deadline for the goals you include as part of this sprint.
      </p>
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

export default SprintCreator;
