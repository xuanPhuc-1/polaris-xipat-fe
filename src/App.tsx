import React from "react";
import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import { HomeIcon, SettingsIcon, ProductIcon } from "@shopify/polaris-icons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import DashboardPage from "./pages/dashboard";
import ProductsPage from "./pages/products";
import SettingPage from "./pages/settings";

function App() {
  return (
    <AppProvider i18n={{}}>
      <Router>
        <AppFrame />
      </Router>
    </AppProvider>
  );
}

function AppFrame() {
  const location = useLocation();

  return (
    <Frame
      navigation={
        <Navigation location={location.pathname}>
          <Navigation.Section
            items={[
              {
                url: "/dashboard",
                label: "Dashboard",
                icon: HomeIcon,
              },
              {
                url: "/products",
                label: "Products",
                icon: ProductIcon,
              },
              {
                url: "/settings",
                label: "Settings",
                icon: SettingsIcon,
              },
            ]}
          />
        </Navigation>
      }
    >
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </Frame>
  );
}

export default App;
