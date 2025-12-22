import { Routes, Route } from "react-router-dom";
import FirstPage from "./pages/first/FirstPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import SignupPage from "./pages/signup/SignupPage.tsx";
import OverviewPage from "./pages/overview/OverviewPage.tsx";
import ReviewPage from "./pages/review/ReviewPage.tsx";
import ReportPage from "./pages/report/ReportPage.tsx";
import { AnimatePresence } from "framer-motion";
import ProtectedPage from "./pages/ProtectedPage.tsx";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedPage />}>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
