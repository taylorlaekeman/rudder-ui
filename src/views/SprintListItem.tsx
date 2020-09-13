import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Boat from 'components/icons/Boat';
import Trophy from 'components/icons/Trophy';
import Link from 'components/Link';
import type { Sprint as SprintType } from 'types';
import {
  countDaysLeftInSprint,
  getReadableDate,
  isSprintActive,
} from 'utils/date';

const Sprint: FunctionComponent<propTypes> = ({ sprint }: propTypes) => {
  const achievedGoals = sprint.goals.filter((goal) => goal.isAchieved);
  const daysLeft = countDaysLeftInSprint(sprint);
  const isActive = isSprintActive(sprint);

  return (
    <Wrapper>
      <Link to={`/sprints/${sprint.id}`}>
        <Grid>
          <EndDate $isActive={isActive}>
            {getReadableDate(sprint.endDate)}
          </EndDate>
          {isActive ? (
            <>
              <DaysLeft>
                {`${daysLeft} day${daysLeft === 1 ? '' : 's'} to go`}
              </DaysLeft>
              <Goals $isActive>
                {sprint.goals.length === 0
                  ? 'No goals yet!'
                  : `${achievedGoals.length} goal${
                      achievedGoals.length === 1 ? '' : 's'
                    } achieved, ${
                      sprint.goals.length - achievedGoals.length
                    } still in-progress`}
              </Goals>
            </>
          ) : (
            <Goals $isActive={false}>
              {`${achievedGoals.length} of ${sprint.goals.length} goals achieved`}
            </Goals>
          )}
          {isActive ? <Boat area="icon" /> : <Trophy area="icon" isDisabled />}
        </Grid>
      </Link>
    </Wrapper>
  );
};

type propTypes = {
  sprint: SprintType;
};

const Wrapper = styled.div`
  margin-bottom: 64px;
  width: 100%;
`;

const Grid = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 0 8px;
  grid-template-areas:
    'title icon'
    'days  icon'
    'goals icon';
  grid-template-columns: 1fr auto;
  width: 100%;
`;

const EndDate = styled.h3<{ $isActive: boolean }>`
  ${({ $isActive, theme }) =>
    $isActive
      ? theme.colours.text.listSprint.normal
      : theme.colours.text.listSprint.disabled}
  grid-area: title;
  padding-bottom: 16px;

  ${({ theme }) => theme.fonts.listSprint.title}

  &:hover {
    color: red;
  }
`;

const DaysLeft = styled.p`
  padding-bottom: 4px;

  ${({ theme }) => theme.fonts.listSprint.days}
`;

const Goals = styled.p<{ $isActive: boolean }>`
  ${({ $isActive, theme }) =>
    $isActive
      ? theme.colours.text.listSprint.normal
      : theme.colours.text.listSprint.disabled}
  ${({ theme }) => theme.fonts.listSprint.goals}
`;

export default Sprint;
