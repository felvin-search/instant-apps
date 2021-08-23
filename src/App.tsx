import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import GlobalStyles from "./shared/GlobalStyles";
import Theme from "./shared/Theme";

import MainArea from "./views/MainArea";
import Results from "./views/Results";

//--------Styled Components---------------

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

//========================================

function App() {
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

          <Footer />
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
