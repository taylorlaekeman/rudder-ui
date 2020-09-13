import { useMutation, useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';

import { cacheUpdates, mutations, queries } from 'api';
import LoadingIndicator from 'components/LoadingIndicator';
import type { Goal as GoalType, Sprint as SprintType } from 'types';
import {
  countDaysLeftInSprint,
  getNextSaturday,
  isSprintActive,
} from 'utils/date';
import Goal from 'views/Goal';

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

  return (
    <>
      <h2>This week</h2>
      {sprints[0].goals.length > 0 ? <p>test</p> : <p>No goals yet!</p>}
      <p>{`${daysLeft} days to go`}</p>
      <form>
        {sprint.goals.map((goal: GoalType) => (
          <Goal goal={goal} key={goal.id} sprint={sprint.id} />
        ))}
        <Goal goal={EMPTY_GOAL} isAdding sprint={sprint.id} />
      </form>
    </>
  );
};

const EMPTY_GOAL = {
  id: 'empty',
  isAchieved: false,
  text: '',
};

export default Sprint;
