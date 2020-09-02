import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { queries } from 'api';
import Link from 'components/Link';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Sprint as SprintType } from 'types';
import { isSprintActive } from 'utils/date';
import Sprint from 'views/Sprint';

const Sprints: FunctionComponent = () => {
  const { data, loading: isLoading } = useQuery(queries.getSprints);

  const unsortedSprints = data?.sprints || [];
  const sprints = [...unsortedSprints]?.sort((a: SprintType, b: SprintType) =>
    new Date(a.endDate) < new Date(b.endDate) ? 1 : -1
  );

  const hasActiveSprint = sprints.some(isSprintActive);

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      {hasActiveSprint ? (
        <>
          <Title $hasActiveSprint>Sprints</Title>
          <Explanation>A list of goals with a deadline</Explanation>
        </>
      ) : (
        <>
          <Title>Where to next?</Title>
          <Link isButton to="/sprints/new">
            Start a sprint
          </Link>
        </>
      )}

      <List>
        {sprints?.map((sprint: SprintType) => (
          <Sprint key={sprint.id} sprint={sprint} />
        ))}
      </List>
    </>
  );
};

const Title = styled.h2<{ $hasActiveSprint?: boolean }>`
  ${({ $hasActiveSprint }) => !$hasActiveSprint && 'padding-bottom: 32px;'}
`;

const Explanation = styled.p<{ $hasActiveSprint?: boolean }>`
  padding-top: 4px;
  padding-bottom: 16px;
`;

const List = styled.ul`
  padding-top: 64px;
`;

export default Sprints;
