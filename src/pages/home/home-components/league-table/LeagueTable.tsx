import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Player } from "../../Home";

interface LeagueTableProps {
  players: Player[];
  leagueTitle: string;
}

const LeagueTable = ({ players, leagueTitle }: LeagueTableProps) => {
  const navigate = useNavigate();

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
    <div className="league-table">
      <h1 className="league-title">{leagueTitle}</h1>
      <Table
        dataSource={players.slice(0, 10)}
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
  );
};

export default LeagueTable;
