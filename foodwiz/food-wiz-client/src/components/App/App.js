import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";

import Header from "../Header/header";
import Home from "../Home/Home";
import Corpus from "../Corpus/Corpus";
import Upload from "../Upload/Upload";
import Datasets from "../Datasets/Datasets";
import CorpusContainer from "../Corpus/CorpusContainer";
import Document from "../Document/Document";

class App extends Component {
  render() {
    const routing = (
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/corpus">
            <Corpus />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/datasets">
            <Datasets />
          </Route>
          <Route path="/corpus/:id">
            <CorpusContainer />
          </Route>
          <Route path="/document/:id">
            <Document />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </HashRouter>
    );

    return <div className="App">{routing}</div>;
  }
}

export default App;
