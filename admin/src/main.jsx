import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

import { SidebarProvider } from "./context/SidebarContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);