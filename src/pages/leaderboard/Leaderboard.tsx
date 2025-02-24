import { useLocation } from "react-router-dom";
import { Table } from "antd";
import "./Leaderboard.css";

interface Player {
  id: number;
  event_total: number;
  player_name: string;
  rank: number;
  last_rank: number;
  rank_sort: number;
  total: number;
  entry: number;
  entry_name: string;
  photo?: string;
}

const Leaderboard = () => {
  const location = useLocation();
  const players: Player[] = location.state?.players || [];

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
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
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <Table
        dataSource={players}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        rowClassName={(_, index) =>
          index % 2 === 0 ? "table-row-even" : "table-row-odd"
        }
      />
    </div>
  );
};

export default Leaderboard;
