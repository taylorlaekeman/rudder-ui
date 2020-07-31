import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import noop from 'utils/noop';

const Day = styled.div`
  height: 32px;
  text-align: center;
`;

const getWeekStructure = (year: number, month: number) => {
  const result: number[][] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  result.push([]);
  let week = 0;
  for (let day = 1 - firstDay.getDay(); day <= lastDay.getDate(); day += 1) {
    if (result[week].length === 7) {
      result.push([]);
      week += 1;
    }
    result[week].push(day);
  }
  while (result[week].length < 7) result[week].push(-10);
  return result;
};

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

const Input = styled.input`
  display: none;
`;

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const padWithZero = (number: number): string =>
  number < 10 ? `0${number}` : `${number}`;

const TODAY = new Date();

const TODAY_READABLE = `${TODAY.getFullYear()}-${padWithZero(
  TODAY.getMonth() + 1
)}-${padWithZero(TODAY.getDate())}`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 16px 0;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
`;

type propTypes = {
  onChange?: { (value: string): void };
  value?: string;
};

const DatePicker: FunctionComponent<propTypes> = ({
  onChange = noop,
  value = TODAY_READABLE,
}: propTypes) => {
  const [month, setMonth] = useState(TODAY.getMonth());
  const [year, setYear] = useState(TODAY.getFullYear());

  const weekStructure = getWeekStructure(year, month);

  return (
    <>
      <Input readOnly type="date" value={value} />
      <Wrapper>
        <Header>
          <Button
            onClick={() => {
              if (month === 0) {
                setMonth(11);
                setYear(year - 1);
              } else {
                setMonth(month - 1);
              }
            }}
          >
            &lt;
          </Button>
          <span>{`${MONTHS[month]} ${year}`}</span>
          <Button
            onClick={() => {
              if (month === 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(month + 1);
              }
            }}
          >
            &gt;
          </Button>
        </Header>
        {weekStructure.map((week) => (
          <Week key={`week-${week[0]}`}>
            {week.map((day) => {
              const fullDate = `${year}-${padWithZero(month + 1)}-${padWithZero(
                day
              )}`;
              if (day === -10) return null;
              if (day < 1) return <div key={fullDate} />;
              return (
                <Day key={fullDate}>
                  <Button
                    isUnderlined={fullDate === TODAY_READABLE}
                    onClick={() => onChange(fullDate)}
                  >
                    {day || null}
                  </Button>
                </Day>
              );
            })}
          </Week>
        ))}
      </Wrapper>
    </>
  );
};

export default DatePicker;
