import { useMutation, useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { cacheUpdates, mutations, queries } from 'api';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Goal as GoalType, Sprint as SprintType } from 'types';
import {
  countDaysLeftInSprint,
  getNextSaturday,
  isSprintActive,
} from 'utils/date';
import Goal, { EMPTY_GOAL } from 'views/Goal';

const Sprint: FunctionComponent = () => {
  const { data, loading: isFetchingSprints } = useQuery(queries.getSprints);
  const [createSprint] = useMutation<{
    createSprint: SprintType;
  }>(mutations.createSprint, cacheUpdates.saveNewSprint);

  if (isFetchingSprints) return <LoadingIndicator />;

  const unsortedSprints = data?.sprints || [];
  const sprints = [...unsortedSprints]?.sort((a: SprintType, b: SprintType) =>
    new Date(a.endDate) < new Date(b.endDate) ? 1 : -1
  );

  const hasActiveSprint = sprints.some(isSprintActive);
  if (!hasActiveSprint) {
    const nextSaturday = getNextSaturday();
    createSprint({ variables: { endDate: nextSaturday } });
    return <LoadingIndicator />;
  }

  const sprint = sprints[0];

  const daysLeft = countDaysLeftInSprint(sprint);

  const { goals } = sprint;
  const achievedGoals = goals.filter((goal: GoalType) => goal.isAchieved);

  return (
    <>
      <Title>This week</Title>
      {sprints[0].goals.length > 0 ? (
        <Summary>{`${achievedGoals.length} of ${goals.length} goals achieved`}</Summary>
      ) : (
        <Summary>No goals yet!</Summary>
      )}
      <Summary>{`${daysLeft} days to go`}</Summary>
      <Form>
        {sprint.goals.map((goal: GoalType) => (
          <Goal goal={goal} key={goal.id} sprint={sprint.id} />
        ))}
        <Goal goal={EMPTY_GOAL} isAdding sprint={sprint.id} />
      </Form>
    </>
  );
};

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 15px;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colours.text.sprint.summary};
  font-weight: 400;
  margin-bottom: 15px;
`;

const Form = styled.form`
  margin-top: 60px;
`;

export default Sprint;
