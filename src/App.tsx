import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceRockOverlay from "./components/ServiceRockOverlay";
import ProcessPage from "./pages/ProcessPage";
import FluentPage from "./pages/FluentPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />}>
            <Route path=":slug" element={<ServiceRockOverlay />} />
          </Route>
          <Route path="process" element={<ProcessPage />} />
          <Route path="fluent-it" element={<FluentPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
