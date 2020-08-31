import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Link from 'components/Link';
import type { Sprint as SprintType } from 'types';
import {
  countDaysLeftInSprint,
  getReadableDate,
  isSprintActive,
} from 'utils/date';

type propTypes = {
  sprint: SprintType;
};

const Sprint: FunctionComponent<propTypes> = ({ sprint }: propTypes) => {
  const achievedGoals = sprint.goals.filter((goal) => goal.isAchieved);
  const daysLeft = countDaysLeftInSprint(sprint);
  const isActive = isSprintActive(sprint);

  return (
    <Link to={`/sprints/${sprint.id}`}>
      <Wrapper>
        <EndDate $isActive={isActive}>
          {getReadableDate(sprint.endDate)}
        </EndDate>
        {isActive ? (
          <>
            <Text>
              {sprint.goals.length === 0
                ? 'No goals yet!'
                : `${achievedGoals.length} goal${
                    achievedGoals.length === 1 ? '' : 's'
                  } achieved, ${
                    sprint.goals.length - achievedGoals.length
                  } still in-progress`}
            </Text>
            <Text>{`${daysLeft} day${daysLeft === 1 ? '' : 's'} to go`}</Text>
          </>
        ) : (
          <Text>{`${achievedGoals.length} of ${sprint.goals.length} goals achieved`}</Text>
        )}
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  margin-bottom: 32px;
`;

const EndDate = styled.h3<{ $isActive: boolean }>`
  padding-bottom: 8px;
  text-decoration: ${({ $isActive }) => !$isActive && 'line-through'} underline;
  ${({ theme }) => theme.fonts.title}
`;

const Text = styled.p`
  padding-bottom: 4px;
`;

export default Sprint;
