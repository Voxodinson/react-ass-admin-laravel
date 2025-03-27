import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar, Sidebar } from "../src/components/index";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
