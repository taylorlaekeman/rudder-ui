import { useQuery, gql } from '@apollo/client';
import React from 'react';

import Adder from 'components/Adder';
import Link from 'components/Link';

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
  'December'
];

const sprintsQuery = gql`
{
  sprints {
    id,
    endDate,
    goals {
      id,
      text
    }
  }
}
`;

function transformDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${MONTHS[parseInt(month, 10) - 1]} ${day}, ${year}`;
};

const Sprints = () => {
  const { loading, error, data } = useQuery(sprintsQuery);

  return (
    <>
      {data?.sprints.map(({ endDate, id }: { endDate: string, id: string }) => (
        <Link to={`/sprints/${id}`} key={id}>{transformDate(endDate)}</Link>
      ))}
      <Adder text="+ Add a sprint" />
    </>
  );
};

export default Sprints;
