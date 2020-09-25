import { useMutation, useQuery } from '@apollo/client';
import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { cacheUpdates, mutations, queries } from 'api';
import LoadingIndicator from 'components/LoadingIndicator';
import useHasFinished from 'hooks/useHasFinished';
import type { Goal as GoalType, Sprint as SprintType } from 'types';
import {
  countDaysLeftInSprint,
  getNextSaturday,
  getReadableDate,
  isSprintActive,
} from 'utils/date';
import Goal, { EMPTY_GOAL } from 'views/Goal';

const Sprint: FunctionComponent = () => {
  const [createSprint] = useMutation<{
    createSprint: SprintType;
  }>(mutations.createSprint, cacheUpdates.saveNewSprint);
  const { data, loading: isFetchingSprints } = useQuery(queries.getSprints);
  const { id } = useParams();

  const hasFetched = useHasFinished(isFetchingSprints);
  const unsortedSprints = data?.sprints || [];

  const sprints = [...unsortedSprints]?.sort((a: SprintType, b: SprintType) =>
    new Date(a.endDate) < new Date(b.endDate) ? 1 : -1
  );

  const hasActiveSprint = sprints.some(isSprintActive);

  useEffect(() => {
    if (hasFetched && !hasActiveSprint) {
      const nextSaturday = getNextSaturday();
      createSprint({ variables: { endDate: nextSaturday } });
    }
  }, [createSprint, hasActiveSprint, hasFetched]);

  if (!hasActiveSprint) return <LoadingIndicator />;

  const sprint = id ? sprints.find((item) => item.id === id) : sprints[0];

  const daysLeft = countDaysLeftInSprint(sprint);

  const isActive = daysLeft > 0;

  return (
    <>
      <article>
        {isActive ? (
          <Title>This week</Title>
        ) : (
          <Title>{getReadableDate(sprint.endDate)}</Title>
        )}
        <Summary>{getGoalsText(sprint.goals, isActive)}</Summary>
        {isActive && <Summary>{`${daysLeft} days to go`}</Summary>}
      </article>
      <Form>
        {sprint.goals.map((goal: GoalType) => (
          <Goal
            goal={goal}
            isReadOnly={!isActive}
            key={goal.id}
            sprint={sprint.id}
          />
        ))}
        {isActive && <Goal goal={EMPTY_GOAL} isAdding sprint={sprint.id} />}
      </Form>
    </>
  );
};

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 20px;

  @media (min-width: 500px) {
    font-size: 2.6rem;
  }

  @media (min-width: 1000px) {
    font-size: 3rem;
  }
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colours.text.sprint.summary};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 15px;

  @media (min-width: 500px) {
    font-size: 1rem;
  }

  @media (min-width: 1000px) {
    font-size: 1.2rem;
  }
`;

const Form = styled.form`
  margin-top: 60px;
`;

const getGoalsText = (goals: GoalType[], isActive: boolean) => {
  if (goals.length === 0) return 'No goals yet!';
  const achievedGoals = goals.filter((goal: GoalType) => goal.isAchieved);
  if (isActive)
    return `${achievedGoals.length} of ${goals.length} goals achieved`;
  return `${achievedGoals.length} goals achieved!`;
};

export default Sprint;
