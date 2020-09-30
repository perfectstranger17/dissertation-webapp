import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import { MainComponent } from './components/MainComponent';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UpgradesComponent } from './components/UpgradesComponent';

const restLink = new RestLink({ uri: 'http://localhost:3001/' });

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

function App() {
  return (
    <>
      <div className="App">
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route path="/" exact component={MainComponent}></Route>
              <Route
                path="/upgrades"
                exact
                component={UpgradesComponent}
              ></Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    </>
  );
}

export default App;
