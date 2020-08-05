import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Checkbox from 'components/Form/Checkbox';
import Input from 'components/Form/Input';
import { Goal as GoalType } from 'types';
import noop from 'utils/noop';

const Wrapper = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 16px;
  grid-template-areas: 'checkbox text save cancel';
  grid-template-columns: max-content 1fr max-content max-content;
  justify-items: start;
  padding-bottom: 16px;
`;

type propTypes = {
  goal: GoalType;
  isEditing?: boolean;
  onCancel?: { (): void };
  onSave?: { (value: string): void };
  onToggle?: { (value: boolean): void };
};

const Goal: FunctionComponent<propTypes> = ({
  goal,
  isEditing: isEditingInitially = false,
  onCancel = noop,
  onSave = noop,
  onToggle = noop,
}: propTypes) => {
  const [isEditing, setIsEditing] = useState(isEditingInitially);
  const [text, setText] = useState(goal.text);
  return (
    <Wrapper>
      <Checkbox
        area="checkbox"
        id={goal.id}
        onChange={onToggle}
        value={goal.isAchieved}
      />
      {isEditing ? (
        <>
          <Input area="text" onChange={setText} value={text} />
          <Button
            area="save"
            onClick={() => {
              onSave(text);
              setIsEditing(false);
            }}
          >
            Save
          </Button>
          <Button
            area="cancel"
            onClick={() => {
              onCancel();
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          area="text"
          isText
          isStruck={goal.isAchieved}
          onClick={() => setIsEditing(true)}
        >
          {goal.text}
        </Button>
      )}
    </Wrapper>
  );
};

export default Goal;
