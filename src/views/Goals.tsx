import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

import Adder from 'components/Adder';
import Form from 'components/Form';
import { Goal as GoalType } from 'types';
import Goal from 'views/Goal';

const sprintQuery = gql`
  query getSprint($id: ID!) {
    sprint(id: $id) {
      id
      endDate
      goals {
        id
        text
        isAchieved
      }
    }
  }
`;

const addGoalMutation = gql`
  mutation AddGoal($sprint: ID!, $text: String!) {
    createGoal(input: { sprintId: $sprint, text: $text }) {
      id
      endDate
      goals {
        id
        text
        isAchieved
      }
    }
  }
`;

const Goals: React.FunctionComponent = () => {
  const { id } = useParams();

  const { data } = useQuery(sprintQuery, { variables: { id } });
  const [addGoal] = useMutation(addGoalMutation);

  return (
    <>
      <Form>
        {data?.sprint.goals.map((goal: GoalType) => (
          <Goal goal={goal} key={goal.id} />
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
