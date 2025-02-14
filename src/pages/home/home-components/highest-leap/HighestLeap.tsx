import React from "react";

interface Player {
  id: string;
  player_name: string;
  entry_name: string;
  rank: number;
  last_rank: number;
}

interface HighestLeapProps {
  players: Player[];
}

const HighestLeap: React.FC<HighestLeapProps> = ({ players }) => {
  const highestLeap = players.reduce(
    (prev, current) =>
      current.last_rank - current.rank > prev.last_rank - prev.rank
        ? current
        : prev,
    players[0]
  );

  return (
    <div className="highlight-card player-card">
      <h2>Highest Leap</h2>
      <div>
        <strong>{highestLeap.player_name}</strong> ({highestLeap.entry_name})
        <br />
        Leap: {highestLeap.last_rank - highestLeap.rank} ranks
        <br />
        From: {highestLeap.last_rank} → To: {highestLeap.rank}
      </div>
    </div>
  );
};

export default HighestLeap;
