import React from "react";

interface Player {
  id: number;
  event_total: number;
  player_name: string;
  entry_name: string;
  total: number;
}

interface LeagueTrendsProps {
  players: Player[];
}

const LeagueTrends: React.FC<LeagueTrendsProps> = ({ players }) => {
  const totalTeams = players.length;

  const averageGWPoints =
    players.reduce((sum, player) => sum + player.event_total, 0) / totalTeams;

  const averageTotalPoints =
    players.reduce((sum, player) => sum + player.total, 0) / totalTeams;

  return (
    <div className="league-trends-card player-card">
      <h2>League Trends</h2>
      <div>
        <p>
          <strong>Total Teams:</strong> {totalTeams}
        </p>
        <p>
          <strong>Average GW Points:</strong> {averageGWPoints.toFixed(2)}
        </p>
        <p>
          <strong>Average GW Points:</strong> {averageTotalPoints.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default LeagueTrends;
