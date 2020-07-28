import { useQuery } from '@apollo/client';
import React, { FunctionComponent }  from 'react';
import styled from 'styled-components';

import { queries } from 'api';
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

function transformDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
}

const Sprints: FunctionComponent = () => {
  const { data } = useQuery(queries.getSprints);

  return (
    <>
      <Explanation>A sprint is a list of goals with a deadline.  Pick a date in the near future and decide what you want to have finished by that day.</Explanation>
      {data?.sprints.map((sprint: Sprint) => (
        <Link key={sprint.id} isStruck={new Date() > new Date(sprint.endDate)} to={`/sprints/${sprint.id}`}>
          {transformDate(sprint.endDate)}
        </Link>
      ))}
      <Adder text="+ Add a sprint" />
    </>
  );
};

export default Sprints;
