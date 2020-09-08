import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import analytics from 'utils/analytics';
import Goals from 'views/Goals';
import Header from 'views/Header';
import Login from 'views/Login';
import SprintCreator from 'views/SprintCreator';
import Sprints from 'views/Sprints';

const Rudder: FunctionComponent<propTypes> = ({
  isAuthenticated = false,
  token = '',
}: propTypes) => {
  useEffect(() => {
    analytics.logVisit();
  }, []);

  if (!isAuthenticated)
    return (
      <Wrapper>
        <Main>
          <Login />
        </Main>
      </Wrapper>
    );

  if (!token)
    return (
      <Wrapper>
        <Main>
          <LoadingIndicator />
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

type propTypes = {
  isAuthenticated?: boolean;
  token?: string;
};

const Wrapper = styled.article`
  align-items: center;
  background-color: green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Main = styled.main`
  ${({ theme }) => theme.pageSize}
`;

export default Rudder;
