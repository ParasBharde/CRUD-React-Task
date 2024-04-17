import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TabelDataListing from "./pages/tabelDataListing";
import Edit from "./pages/edit";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TabelDataListing />,
    },
    {
      path: "/edit",
      element: <Edit />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
