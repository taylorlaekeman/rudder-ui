import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';

import { queries } from 'api';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Sprint } from 'types';
import { getReadableDate } from 'utils/date';

const OldSprints: FunctionComponent = () => {
  const { data, loading: isLoading } = useQuery(queries.getSprints);
  const today = new Date();

  const sprints = data?.sprints;

  const finishedSprints = sprints?.filter(
    (sprint: Sprint) => today > new Date(sprint.endDate)
  );

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <h2>Completed sprints</h2>
      {finishedSprints?.map((sprint: Sprint) => (
        <Link key={sprint.id} to={`/sprints/${sprint.id}`}>
          {getReadableDate(sprint.endDate)}
        </Link>
      ))}
    </>
  );
};

export default OldSprints;
