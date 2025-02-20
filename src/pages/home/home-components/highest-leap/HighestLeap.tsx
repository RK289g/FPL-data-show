import { Player } from "../../Home";

interface HighestLeapProps {
  players?: Player[];
}

const HighestLeap = ({ players = [] }: HighestLeapProps) => {
  if (players.length === 0) {
    return <div className="player-card">No player data available</div>;
  }

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
