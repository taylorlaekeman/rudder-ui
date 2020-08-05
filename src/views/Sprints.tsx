import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { queries } from 'api';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Sprint as SprintType } from 'types';
import Sprint from 'views/Sprint';

const Sprints: FunctionComponent = () => {
  const { data, loading: isLoading } = useQuery(queries.getSprints);

  const sprints = data?.sprints || [];
  const copiedSprints = [...sprints];
  const sortedSprints = copiedSprints?.sort((a: SprintType, b: SprintType) =>
    new Date(a.endDate) < new Date(b.endDate) ? 1 : -1
  );
  const visibleSprints = sortedSprints.slice(0, 3);

  const hasActiveSprint = sortedSprints.some(
    (sprint) => new Date(sprint.endDate) > new Date()
  );

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      <h2>Sprints</h2>
      <Explanation $hasActiveSprint={hasActiveSprint}>
        A sprint is a list of goals with a deadline. Pick a date in the near
        future and decide what you want to have finished by that day.
      </Explanation>
      {!hasActiveSprint && <Link to="/sprints/new">+ Start a sprint</Link>}
      <List>
        {visibleSprints?.map((sprint: SprintType) => (
          <Sprint key={sprint.id} sprint={sprint} />
        ))}
      </List>
    </>
  );
};

const Explanation = styled.p<{ $hasActiveSprint?: boolean }>`
  padding-top: 8px;
  padding-bottom: ${({ $hasActiveSprint }) =>
    $hasActiveSprint ? '0' : '32px'};
  ${({ theme }) => theme.font.small}
`;

const List = styled.ul`
  padding-top: 32px;
`;

export default Sprints;
