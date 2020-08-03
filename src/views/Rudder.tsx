import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Goals from 'views/Goals';
import Header from 'views/Header';
import OldSprints from 'views/OldSprints';
import SprintCreator from 'views/SprintCreator';
import Sprints from 'views/Sprints';

const Main = styled.main`
  ${({ theme }) => theme.pageSize}
`;

const Wrapper = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Rudder: React.FunctionComponent = () => (
  <Wrapper>
    <Header />
    <Main>
      <Switch>
        <Route path="/sprints/new">
          <SprintCreator />
        </Route>
        <Route path="/sprints/finished">
          <OldSprints />
        </Route>
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
