import { useMutation, useQuery } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { mutations, queries } from 'api';
import Button from 'components/Button';
import Form from 'components/Form';
import LoadingIndicator from 'components/LoadingIndicator';
import { Goal as GoalType } from 'types';
import { getReadableDate } from 'utils/date';
import Goal from 'views/Goal';

const Goals: FunctionComponent = () => {
  const [addGoal] = useMutation(mutations.addGoal);
  const { id } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [updateGoal] = useMutation<{ updateGoal: GoalType }>(
    mutations.updateGoal
  );

  const { data, loading: isLoading } = useQuery(queries.getSprint, {
    variables: { id },
  });

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <Title>{getReadableDate(data?.sprint?.endDate)}</Title>
      <Form>
        {data?.sprint.goals.map((goal: GoalType) => (
          <Goal
            goal={goal}
            key={goal.id}
            onSave={(text: string) =>
              updateGoal({ variables: { goal: goal.id, sprint: id, text } })
            }
            onToggle={(isAchieved: boolean) =>
              updateGoal({
                variables: { goal: goal.id, isAchieved, sprint: id },
              })
            }
          />
        ))}
        {isAdding ? (
          <Goal
            goal={EMPTY_GOAL}
            isEditing
            onCancel={() => setIsAdding(false)}
            onSave={(text: string) => {
              addGoal({ variables: { sprint: id, text } });
              setIsAdding(false);
            }}
          />
        ) : (
          <Button onClick={() => setIsAdding(true)}>Add a goal</Button>
        )}
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
