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
    <Wrapper>
      <Details>
        <Title>This week</Title>
        <Summary>{getGoalsText(sprint.goals, isActive)}</Summary>
        {isActive && <Summary>{`${daysLeft} days to go`}</Summary>}
      </Details>
      <Form>
        {sprint.goals.map((goal: GoalType) => (
          <Goal goal={goal} key={goal.id} sprint={sprint.id} />
        ))}
        <Goal goal={EMPTY_GOAL} isAdding sprint={sprint.id} />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  height: 100%;

  grid-auto-rows: max-content;

  @media (min-width: 1080px) {
    grid-auto-rows: 1fr;
    grid-template-areas: 'details form';
    grid-template-columns: 1fr 1fr;
  }
`;

const Details = styled.article`
  @media (min-width: 1080px) {
    padding-right: 80px;
    padding-top: 40px;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 15px;

  @media (min-width: 1080px) {
    font-size: 4.5rem;
    margin-bottom: 50px;
  }
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.colours.text.sprint.summary};
  font-weight: 400;
  margin-bottom: 15px;
`;

const Form = styled.form`
  margin-top: 60px;

  @media (min-width: 1080px) {
    border-left: solid ${({ theme }) => theme.colours.border.divider} 1px;
    height: 100%;
    margin: 0;
    padding-left: 80px;
    padding-top: 40px;
  }
`;

const getGoalsText = (goals: GoalType[], isActive: boolean) => {
  if (goals.length === 0) return 'No goals yet!';
  const achievedGoals = goals.filter((goal: GoalType) => goal.isAchieved);
  if (isActive)
    return `${achievedGoals.length} of ${goals.length} goals achieved`;
  return `${achievedGoals.length} goals achieved!`;
};

export default Sprint;
