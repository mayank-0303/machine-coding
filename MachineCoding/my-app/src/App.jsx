import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import TopBar from "./TopBar/TopBar";
import Home from "./Home/Home";
import Loader from "./Common/Loader";
import ProtectedAuth from "./Auth/ProtectedAuth";
import Misc from "./MiscComponents/Misc";
import JiraBoard from "./JiraBoard.jsx/JiraBoard";

const Hooks = lazy(() => import("./Hooks/Hooks"));
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route element={<ProtectedAuth />}>
            <Route
              path="/hooks/:p?"
              element={
                <Suspense fallback={<Loader />}>
                  <Hooks />
                </Suspense>
              }
            />
          </Route>
          <Route path="/jira-board" element={<JiraBoard />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
      <div id="modal-portal"></div>
    </>
  );
}

export default App;
