import React, { Component } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import Header from "../Header/header";
import Home from "../Home/Home";
import Corpus from "../Corpus/Corpus";
import Upload from "../Upload/Upload";
import Datasets from "../Datasets/Datasets";
import CorpusContainer from "../CorpusContainer/CorpusContainer";
import Document from "../Document/Document";

class App extends Component {
  render() {
    const routing = (
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/corpus/:id" element={<CorpusContainer />} />
          <Route path="/corpus" element={<Corpus />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/document/:id" element={<Document />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    );

    return <div className="App">{routing}</div>;
  }
}

export default App;
