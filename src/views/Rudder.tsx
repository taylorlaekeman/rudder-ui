import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Goals from 'views/Goals';
import Sprints from 'views/Sprints';

const responsiveSizing = css`
  width: 100%;

  @media (min-width: 432px) {
    width: 400px;
  }

  @media (min-width: 532px) {
    padding: 0 50px;
    width: 100%;
  }

  @media (min-width: 700px) {
    padding: 0;
    width: 600px;
  }
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colours.text};
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin: 0;
  margin-bottom: 32px;
  margin-top: 16px;
  text-transform: uppercase;
  ${responsiveSizing}
`;

const Main = styled.main`
  ${responsiveSizing}
`;

const Wrapper = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Rudder: React.FunctionComponent = () => (
  <Wrapper>
    <Heading>Rudder</Heading>
    <Main>
      <Switch>
        <Route path="/sprints/:id">
          <Goals />
        </Route>
        <Route path="/">
          <Sprints />
        </Route>
      </Switch>
    </Main>
  </Wrapper>
);

export default Rudder;
