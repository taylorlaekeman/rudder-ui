import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import analytics from 'utils/analytics';
import Goals from 'views/Goals';
import Header from 'views/Header';
import Journey from 'views/Journey';
import Login from 'views/Login';
import Sprint from 'views/Sprint';
import SprintCreator from 'views/SprintCreator';

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
          <Route path="/journey">
            <Journey />
          </Route>
          <Route path="/">
            <Sprint />
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const Main = styled.main`
  height: 100%;
  overflow-y: scroll;
  padding: 40px;
  padding-top: 0;
  width: 100%;

  @media (min-width: 580px) {
    width: 580px;
  }

  @media (min-width: 1080px) {
    padding: 80px 40px;
    padding-bottom: 160px;
    padding-top: 0;
    width: 1080px;
  }
`;

export default Rudder;
