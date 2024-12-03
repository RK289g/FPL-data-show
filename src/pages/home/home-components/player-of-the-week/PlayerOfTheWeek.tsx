import React from "react";
import avatar from "../../../../../public/avatar.png";

interface Player {
  id: number;
  event_total: number;
  player_name: string;
  entry_name: string;
  photo?: string;
}

interface PlayerOfTheWeekProps {
  player: Player;
}

const PlayerOfTheWeek: React.FC<PlayerOfTheWeekProps> = ({ player }) => {
  return (
    <div className="player-card">
      <h2>Player of the Week</h2>
      <div className="player-details">
        <img
          src={player.photo || avatar}
          alt={player.player_name}
          className="player-avatar"
        />
        <strong className="player-name">{player.player_name}</strong>
        <span className="player-entry-name">{player.entry_name}</span>
        <div className="player-gw-points">GW Points: {player.event_total}</div>
      </div>
    </div>
  );
};

export default PlayerOfTheWeek;
