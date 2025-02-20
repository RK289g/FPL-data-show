import { Player } from "../../Home";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  players?: Player[];
}

const FPLBarChart = ({ players = [] }: BarChartProps) => {
  if (!players) {
    return <div className="player-card">No player data available</div>;
  }

  const data = players.slice(0, 10).map((player) => ({
    name: player?.entry_name?.split(" ")[0] || "Unknown",
    points: player?.event_total,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="points"
          fill="#8884d8"
          style={{ maxWidth: "10px", background: "red" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FPLBarChart;
