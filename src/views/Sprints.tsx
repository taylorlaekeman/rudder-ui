import { useQuery, gql } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';

import Adder from 'components/Adder';
import Link from 'components/Link';
import { Sprint } from 'types';

const Explanation = styled.p`
  font-size: 0.8rem;
`;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const sprintsQuery = gql`
  {
    sprints {
      id
      endDate
      goals {
        id
        text
      }
    }
  }
`;

function transformDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
}

const Sprints: React.FunctionComponent = () => {
  const { data } = useQuery(sprintsQuery);

  return (
    <>
      <Explanation>A sprint is a list of goals with a deadline.  Pick a date in the near future and decide what you want to have finished by that day.</Explanation>
      {data?.sprints.map((sprint: Sprint) => (
        <Link to={`/sprints/${sprint.id}`} key={sprint.id}>
          {transformDate(sprint.endDate)}
        </Link>
      ))}
      <Adder text="+ Add a sprint" />
    </>
  );
};

export default Sprints;
