import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Cropper from './pages/cropper'
import Fabric from './pages/fabric'
import { Routes, Route, HashRouter } from "react-router";

const Main = () => {
  return (
    <>
      <HashRouter>
        <App></App>
        <Routes>
          {/* <Route index element={<App />}></Route> */}
          <Route index element={<Fabric />} />
          <Route path="fabric" element={<Fabric />} />
          <Route path="cropper" element={<Cropper />} />
        </Routes>
      </HashRouter>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
