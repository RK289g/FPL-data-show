import { useState } from "react";
import axios from "axios";
import { Button, Col, Row, Input } from "antd";
// import { useNavigate } from "react-router-dom";
import "./Home.css";
import LeagueTrends from "./home-components/league-trends/LeagueTrends";
import PlayerOfTheWeek from "./home-components/player-of-the-week/PlayerOfTheWeek";
import HighestLeap from "./home-components/highest-leap/HighestLeap";
import BiggestDrop from "./home-components/biggest-drop/BiggestDrop";
import FPLBarChart from "./home-components/bar-chart/BarChart";
import LeagueTable from "./home-components/league-table/LeagueTable";

export interface Player {
  id: string;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
  captain: string;
  photo?: string;
}

interface StandingsResponse {
  standings: {
    results: Player[];
  };
  league: {
    name: string;
  };
}

const Home = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [leagueTitle, setLeagueTitle] = useState<string>("");
  const [inputLeagueId, setInputLeagueId] = useState<string>("");

  // const navigate = useNavigate();

  const fetchLeagueData = async () => {
    if (!inputLeagueId) return;
    setLoading(true);
    try {
      const response = await axios.get<StandingsResponse>(
        `http://localhost:3000/league/${inputLeagueId}`
      );
      setPlayers(response.data.standings.results);
      setLeagueTitle(response.data.league.name);
    } catch (error) {
      console.error("Error fetching the data:", error);
      setPlayers([]);
      setLeagueTitle("League not found");
    } finally {
      setLoading(false);
    }
  };

  const highestScorer = players.reduce(
    (prev, current) =>
      prev.event_total > current.event_total ? prev : current,
    players[0]
  );

  return (
    <div className="home-container">
      <Row gutter={16}>
        <Col>
          <div className="search-box">
            <Input
              type="text"
              title="Search by League ID"
              placeholder="Enter League ID"
              value={inputLeagueId}
              onChange={(e) => setInputLeagueId(e.target.value)}
              className="league-id-input"
            />
            <Button
              type="primary"
              onClick={fetchLeagueData}
              disabled={!inputLeagueId}
            >
              Fetch League
            </Button>
          </div>
        </Col>
      </Row>

      {inputLeagueId && !loading && (
        <div className="home-content">
          <Row gutter={40}>
            <Col span={12}>
              <LeagueTable players={players} leagueTitle={leagueTitle} />
            </Col>

            <Col span={12}>
              <Row gutter={16}>
                <Col span={24}>
                  <FPLBarChart players={players} />
                </Col>
                <Col span={8}>
                  <LeagueTrends players={players} />
                </Col>
                <Col span={8}>
                  <PlayerOfTheWeek player={highestScorer} />
                </Col>
                <Col span={8}>
                  <HighestLeap players={players} />
                </Col>
                <Col span={8}>
                  <BiggestDrop players={players} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Home;
