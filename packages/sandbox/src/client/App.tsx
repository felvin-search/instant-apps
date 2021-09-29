import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "./components/NavBar";
import GlobalStyles from "./shared/GlobalStyles";
import Theme from "./shared/Theme";
import MainArea from "./views/MainArea";
import Results from "./views/Results";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <AppContainer>
          <GlobalStyles />
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainArea} />
            <Route path="/search" component={Results} />
          </Switch>
          {/* Footer */}
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
