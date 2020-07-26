import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';

import Adder from 'components/Adder';
import Button from 'components/Button';
import Form from 'components/Form';
import Checkbox from 'components/Form/Checkbox';
import { Goal } from 'types';

const sprintQuery = gql`
  query getSprint($id: ID!) {
    sprint(id: $id) {
      id
      endDate
      goals {
        id
        text
      }
    }
  }
`;

const Goals: React.FunctionComponent = () => {
  const { id } = useParams();

  const { data } = useQuery(sprintQuery, { variables: { id } });

  return (
    <>
      <Form>
        {data?.sprint.goals.map((goal: Goal) => (
          <section key={goal.id}>
            <Checkbox />
            <Button>{goal.text}</Button>
          </section>
        ))}
      </Form>
      <Adder text="+ Add a goal" />
    </>
  );
};

export default Goals;
