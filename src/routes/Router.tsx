import { Route, Routes } from "react-router-dom";
import LayoutWrapper from "../components/layout-wrapper/LayoutWrapper";
import Home from "../pages/home/Home";
import Leaderboard from "../pages/leaderboard/Leaderboard";
import TeamPage from "../pages/team-page/TeamPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/team-page" element={<TeamPage />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
