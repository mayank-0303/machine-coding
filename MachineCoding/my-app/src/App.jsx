import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import TopBar from "./TopBar/TopBar";
import Loader from "./Common/Loader";
import ProtectedAuth from "./Auth/ProtectedAuth";
import Animation from "./animation/Animation";
import Todo from "./TodoPage/Todo";

const Home = lazy(() => import("./Home/Home"));
const Hooks = lazy(() => import("./Hooks/Hooks"));
const JiraBoard = lazy(() => import("./JiraBoard/JiraBoard"));
const Memes = lazy(() => import("./Memes/Memes"));
const Virtualization = lazy(() => import("./Memes/Virtualization"));
const Misc = lazy(() => import("./MiscComponents/Misc"));
function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route element={<ProtectedAuth />}>
              <Route path="/hooks/:p?" element={<Hooks />} />
            </Route>
            <Route path="/jira-board" element={<JiraBoard />} />
            <Route path="/memes" element={<Memes />} />
            <Route path="/virtual" element={<Virtualization />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/misc" element={<Misc />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <div id="modal-portal"></div>
    </>
  );
}

export default App;
