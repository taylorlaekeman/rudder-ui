import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { mutations } from 'api';
import { ReactComponent as UnstyledCheckmark } from 'assets/icons/checkmark.svg';
import Checkbox from 'components/Form/Checkbox';
import Input, { BACKSPACE } from 'components/Form/Input';
import LoadingIndicator from 'components/LoadingIndicator';
import { Goal as GoalType } from 'types';
import { useDebounce } from 'hooks';

type propTypes = {
  goal: GoalType;
  isAdding?: boolean;
  sprint: string;
};

const Goal: FunctionComponent<propTypes> = ({
  goal,
  isAdding = false,
  sprint,
}: propTypes) => {
  const [addGoal, { called: isAddCalled, loading: isAddLoading }] = useMutation(
    mutations.addGoal
  );
  const [deleteGoal] = useMutation(mutations.deleteGoal);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [text, setText] = useState(goal.text);
  const [
    updateGoal,
    { called: isUpdateCalled, loading: isUpdateLoading },
  ] = useMutation(mutations.updateGoal);

  const debouncedText = useDebounce(text, 1000);

  useEffect(() => {
    if (debouncedText && debouncedText !== goal.text) {
      if (isAdding) {
        addGoal({ variables: { goal: goal.id, sprint, text: debouncedText } });
      } else {
        updateGoal({
          variables: { goal: goal.id, sprint, text: debouncedText },
        });
      }
    }
  }, [addGoal, debouncedText, goal, isAdding, sprint, updateGoal]);

  useEffect(() => {
    if (isAddCalled && !isAddLoading) setText('');
  }, [isAddCalled, isAddLoading]);

  useEffect(() => {
    if ((isAddCalled || isUpdateCalled) && !isAddLoading && !isUpdateLoading)
      setIsConfirmVisible(true);
    const timeout = setTimeout(() => setIsConfirmVisible(false), 1000);
    return () => clearTimeout(timeout);
  }, [isAddCalled, isAddLoading, isUpdateCalled, isUpdateLoading]);

  return (
    <Wrapper>
      <Checkbox
        area="checkbox"
        id={goal.id}
        onChange={(value) =>
          updateGoal({
            variables: { goal: goal.id, isAchieved: value, sprint },
          })
        }
        value={goal.isAchieved}
      />
      <Input
        area="text"
        isStruck={goal.isAchieved}
        onChange={setText}
        onKeyDown={(key: number) => {
          if (text === '' && key === BACKSPACE && !isAdding)
            deleteGoal({ variables: { goal: goal.id, sprint } });
        }}
        placeholder="start typing to add a goal"
        value={text}
      />
      {isConfirmVisible && <Checkmark />}
      {(isAddLoading || isUpdateLoading) && <LoadingIndicator />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 16px;
  grid-template-areas: 'checkbox text save cancel';
  grid-template-columns: max-content 1fr max-content max-content;
  justify-items: start;
  margin-bottom: 16px;
`;

const Checkmark = styled(UnstyledCheckmark)`
  fill: ${({ theme }) => theme.colours.logo};
  width: 16px;
  ${({ theme }) => theme.animations.fadein}
`;

export default Goal;
