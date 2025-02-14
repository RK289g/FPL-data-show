import React from "react";

interface Player {
  id: string;
  player_name: string;
  entry_name: string;
  rank: number;
  last_rank: number;
}

interface BiggestDropProps {
  players: Player[];
}

const BiggestDrop: React.FC<BiggestDropProps> = ({ players }) => {
  const biggestDrop = players.reduce(
    (prev, current) =>
      current.rank - current.last_rank > prev.rank - prev.last_rank
        ? current
        : prev,
    players[0]
  );

  return (
    <div className="highlight-card player-card">
      <h2>Biggest Drop</h2>
      <div>
        <strong>{biggestDrop.player_name}</strong> ({biggestDrop.entry_name})
        <br />
        Drop: {biggestDrop.rank - biggestDrop.last_rank} ranks
        <br />
        From: {biggestDrop.last_rank} → To: {biggestDrop.rank}
      </div>
    </div>
  );
};

export default BiggestDrop;
