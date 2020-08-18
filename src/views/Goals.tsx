import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { queries } from 'api';
import Form from 'components/Form';
import LoadingIndicator from 'components/LoadingIndicator';
import { Goal as GoalType } from 'types';
import { getReadableDate } from 'utils/date';
import Goal from 'views/Goal';

const Goals: FunctionComponent = () => {
  const { id } = useParams();

  const { data, loading: isLoading } = useQuery(queries.getSprint, {
    variables: { id },
  });

  if (isLoading) return <LoadingIndicator isLarge />;

  return (
    <>
      <Title>{getReadableDate(data?.sprint?.endDate)}</Title>
      <Form>
        {data?.sprint.goals.map((goal: GoalType) => (
          <Goal goal={goal} key={goal.id} sprint={id} />
        ))}
        <Goal goal={EMPTY_GOAL} isAdding sprint={id} />
      </Form>
    </>
  );
};

const Title = styled.h2`
  padding-bottom: 32px;
`;

const EMPTY_GOAL = {
  id: 'empty',
  isAchieved: false,
  text: '',
};

export default Goals;
