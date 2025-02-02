import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import UserPage from "./Pages/UserPage";
import ResumeTemplate from "./Pages/ResumeTemplate";
import AdminPage from "./Pages/AdminPage";

const RouteComponents = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/resume" element={<ResumeTemplate />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default RouteComponents;
