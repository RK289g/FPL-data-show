import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Row, Table, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import LeagueTrends from "./home-components/league-trends/LeagueTrends";
// import PlayerOfTheWeek from "./home-components/player-of-the-week/PlayerOfTheWeek";
// import HighestLeap from "./home-components/highest-leap/HighestLeap";
// import BiggestDrop from "./home-components/biggest-drop/BiggestDrop";

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

const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [leagueTitle, setLeagueTitle] = useState<string>("");
  const [inputLeagueId, setInputLeagueId] = useState<string>("");

  const navigate = useNavigate();

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

  // const highestScorer = players.reduce(
  //   (prev, current) =>
  //     prev.event_total > current.event_total ? prev : current,
  //   players[0]
  // );

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (rank: number, player: Player) => (
        <span>
          {rank}
          {player.last_rank !== rank && (
            <span
              style={{
                marginLeft: "5px",
                color: rank < player.last_rank ? "#4CAF50" : "#E57373",
              }}
            >
              {rank < player.last_rank ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Team & Manager",
      dataIndex: "entry_name",
      key: "entry_name",
      render: (_: string, player: Player) => (
        <div>
          <strong>{player.entry_name}</strong>
          <br />
          <span className="player-name">{player.player_name}</span>
        </div>
      ),
    },
    {
      title: "GW Points",
      dataIndex: "event_total",
      key: "event_total",
    },
    {
      title: "Total Points",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div className="home-container">
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

      {inputLeagueId && !loading && (
        <div className="home-content">
          <div className="league-table">
            <h1 className="league-title">{leagueTitle}</h1>
            <Table
              dataSource={players.slice(0, 5)}
              columns={columns}
              pagination={false}
              rowKey="id"
              rowClassName={(_, index) =>
                index % 2 === 0 ? "table-row-even" : "table-row-odd"
              }
            />

            <Button
              type="primary"
              className="see-full-table-btn"
              onClick={() => navigate("/leaderboard", { state: { players } })}
              disabled={players.length === 0}
            >
              See Full Table
            </Button>
          </div>

          <Row>
            <Col span={6}>
              <LeagueTrends players={players} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Home;
