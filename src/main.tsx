import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import Cropper from './pages/cropper'
import Fabric from './pages/fabric'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
let navigate = useNavigate()

import { Menu } from 'antd'
const MenuItems = [
  {
    label: "Fabric",
    path: "/",
    type: 'group',
    element: Fabric
  },
  {
    label: "Fabric",
    path: "/cropper",
    type: 'group',
    element: Cropper
  }
]
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Menu onClick={(e)=> {
      navigate(e.path)
    }} items={MenuItems}></Menu>
    <BrowserRouter>
      {/* <App /> */}
      <Routes>
        <Route index element={<Fabric />} />
        <Route path="cropper" element={<Cropper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
