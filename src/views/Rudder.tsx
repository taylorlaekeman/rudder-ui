import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from 'hooks';
import settings from 'settings';
import analytics from 'utils/analytics';
import Goals from 'views/Goals';
import Header from 'views/Header';
import Login from 'views/Login';
import SprintCreator from 'views/SprintCreator';
import Sprints from 'views/Sprints';
import WaitingListSignup from 'views/WaitingListSignup';

const Main = styled.main`
  ${({ theme }) => theme.pageSize}
`;

const Wrapper = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 64px;
`;

const Rudder: FunctionComponent = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    analytics.logVisit();
  }, []);

  if (!settings.featureFlags.IS_BYPASSING_WAITING_LIST)
    return (
      <Wrapper>
        <Header />
        <Main>
          <WaitingListSignup />
        </Main>
      </Wrapper>
    );

  if (!isAuthenticated)
    return (
      <Wrapper>
        <Main>
          <Login />
        </Main>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Header />
      <Main>
        <Switch>
          <Route path="/sprints/new">
            <SprintCreator />
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
};

export default Rudder;
