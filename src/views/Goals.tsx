import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

import { mutations, queries } from 'api';
import Adder from 'components/Adder';
import Form from 'components/Form';
import { Goal as GoalType } from 'types';
import Goal from 'views/Goal';

const Goals: React.FunctionComponent = () => {
  const { id } = useParams();

  const { data } = useQuery(queries.getSprint, { variables: { id } });
  const [addGoal] = useMutation(mutations.addGoal);

  return (
    <>
      <h2>Goals</h2>
      <Form>
        {data?.sprint.goals.map((goal: GoalType) => (
          <Goal goal={goal} key={goal.id} sprint={id} />
        ))}
      </Form>
      <Adder
        onAdd={(text) =>
          addGoal({ variables: { sprint: data?.sprint.id, text } })
        }
        text="+ Add a goal"
      />
    </>
  );
};

export default Goals;
