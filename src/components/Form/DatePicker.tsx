import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import { getWeekStructure, MONTHS, TODAY, TODAY_READABLE } from 'utils/date';
import noop from 'utils/noop';
import padWithZero from 'utils/padWithZero';

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
            isPlain
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
            isPlain
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
                    isDisabled={fullDate < TODAY_READABLE}
                    isPlain
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

type propTypes = {
  onChange?: { (value: string): void };
  value?: string;
};

const Input = styled.input`
  display: none;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  justify-items: center;
  padding: 4px 0;
  padding-bottom: 16px;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  padding: 4px 0;
`;

const Day = styled.div`
  height: 32px;
  width: max-content;
`;

export default DatePicker;
