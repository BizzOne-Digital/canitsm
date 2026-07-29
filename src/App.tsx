import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceCategoryPage from "./pages/ServiceCategoryPage";
import ProcessPage from "./pages/ProcessPage";
import FluentPage from "./pages/FluentPage";
import ContactPage from "./pages/ContactPage";
import ResourcesPage from "./pages/ResourcesPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/*" element={<ServiceCategoryPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="contact" element={<ContactPage />} />
          {/* Legacy routes kept as secondary destinations */}
          <Route path="process" element={<ProcessPage />} />
          <Route path="fluent-it" element={<FluentPage />} />
          <Route path="blog" element={<Navigate to="/resources" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
