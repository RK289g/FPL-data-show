import { Player } from "../../Home";

interface BiggestDropProps {
  players?: Player[];
}

const BiggestDrop = ({ players = [] }: BiggestDropProps) => {
  if (!players) {
    return <div className="player-card">No player data available</div>;
  }

  if (players.length === 0) {
    return (
      <div className="highlight-card player-card">
        <h2>Biggest Drop</h2>
        <p>No data available.</p>
      </div>
    );
  }

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
