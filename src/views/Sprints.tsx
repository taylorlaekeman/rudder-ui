import { useQuery } from '@apollo/client';
import React, { FunctionComponent }  from 'react';
import styled from 'styled-components';

import { queries } from 'api';
import Adder from 'components/Adder';
import Link from 'components/Link';
import { Sprint } from 'types';

const Explanation = styled.p`
  ${({ theme }) => theme.font.small}
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
  const currentDate = new Date();

  const sprints = data?.sprints;

  const finishedSprints = sprints?.filter((sprint : Sprint) => currentDate > new Date(sprint.endDate));
  const currentSprints = sprints?.filter((sprint : Sprint) => currentDate < new Date(sprint.endDate));

  return (
    <>
      <Explanation>A sprint is a list of goals with a deadline.  Pick a date in the near future and decide what you want to have finished by that day.</Explanation>
      {currentSprints?.map((sprint: Sprint) => (
        <Link key={sprint.id} isStruck={false} to={`/sprints/${sprint.id}`}>
          {transformDate(sprint.endDate)}
        </Link>
      ))}
      <Adder text="+ Add a sprint" />
      {finishedSprints?.map((sprint: Sprint) => (
        <Link key={sprint.id} isStruck={true} to={`/sprints/${sprint.id}`}>
          {transformDate(sprint.endDate)}
        </Link>
      ))}
    </>
  );
};

export default Sprints;
