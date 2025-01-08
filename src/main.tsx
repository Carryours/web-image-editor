import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import Cropper from './pages/cropper'
import Fabric from './pages/fabric'
import { BrowserRouter,Routes, Route } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route index element={<Fabric />} />
        <Route path="cropper" element={<Cropper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
