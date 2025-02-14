import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "../components/layout-wrapper/LayoutWrapper";
import Home from "../pages/home/Home";
import Leaderboard from "../pages/leaderboard/Leaderboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
