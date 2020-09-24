import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { mutations } from 'api';
import LoadingIndicator from 'components/LoadingIndicator';
import Checkmark from 'components/icons/Checkmark';
import { Goal as GoalType } from 'types';
import useDebounce from 'hooks/useDebounce';

const Goal: FunctionComponent<propTypes> = ({
  goal,
  isAdding = false,
  isReadOnly = false,
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
    <Wrapper $isChecked={goal.isAchieved}>
      <HiddenInput
        id={goal.id}
        checked={goal.isAchieved}
        onChange={() => {
          if (isReadOnly) return;
          updateGoal({
            variables: { goal: goal.id, isAchieved: !goal.isAchieved, sprint },
          });
        }}
        type="checkbox"
      />
      <Checkbox
        $isAdding={isAdding}
        $isChecked={goal.isAchieved}
        htmlFor={goal.id}
      />
      <Input
        $isChecked={goal.isAchieved}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (!isAdding && !text && event.keyCode === BACKSPACE)
            deleteGoal({ variables: { goal: goal.id, sprint } });
        }}
        placeholder="start typing to add a goal"
        readOnly={isReadOnly || goal.isAchieved}
        type="text"
        value={text}
      />
      {isConfirmVisible && <Checkmark area="icon" />}
      {(isAddLoading || isUpdateLoading) && <LoadingIndicator area="icon" />}
    </Wrapper>
  );
};

type propTypes = {
  goal: GoalType;
  isAdding?: boolean;
  isReadOnly?: boolean;
  sprint: string;
};

const Wrapper = styled.div<{ $isChecked: boolean }>`
  align-items: center;
  display: grid;
  grid-template-areas: 'checkbox text icon';
  grid-template-columns: max-content 1fr max-content;
  justify-items: start;
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ $isChecked }) =>
    !$isChecked &&
    css`
      &:focus-within label {
        border-color: ${({ theme }) => theme.colours.border.checkbox.focus};
      }

      &:focus-within input {
        color: ${({ theme }) => theme.colours.text.input.focus};
      }
    `}
`;

const HiddenInput = styled.input`
  appearance: none;
`;

const Checkbox = styled.label<{ $isAdding: boolean; $isChecked: boolean }>`
  background-color: ${({ theme }) => theme.colours.background.checkbox.normal};
  border: solid 2px;
  border-color: ${({ theme }) => theme.colours.border.checkbox.normal};
  border-radius: 100%;
  grid-area: checkbox;
  height: 14px;
  width: 14px;

  ${({ $isAdding }) =>
    $isAdding &&
    css`
      border-color: ${({ theme }) => theme.colours.border.checkbox.isAdding};
    `}

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      background-color: ${({ theme }) =>
        theme.colours.background.checkbox.checked};
      border-color: ${({ theme }) => theme.colours.border.checkbox.checked};
    `}
`;

const Input = styled.input<{ $isChecked: boolean }>`
  border: none;
  color: ${({ theme }) => theme.colours.text.input.normal};
  font-size: 1.2rem;
  font-weight: 400;
  grid-area: text;
  margin-left: 20px;
  outline: none;
  width: 100%;

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      color: ${({ theme }) => theme.colours.text.input.checked};
      text-decoration: line-through;
    `}

  &::placeholder {
    color: ${({ theme }) => theme.colours.text.input.placeholder};
    font-style: italic;
    font-weight: 400;
    opacity: 1;
  }
`;

const BACKSPACE = 8;

export const EMPTY_GOAL = {
  id: 'empty',
  isAchieved: false,
  text: '',
};

export default Goal;
