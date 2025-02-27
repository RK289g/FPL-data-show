import { Typography } from "antd";
import { PlayerData, PlayerPick } from "../../../models/team";

interface PlayerCardProps {
  player: PlayerPick;
  playerData?: PlayerData;
}

const PlayerCard = ({ player, playerData }: PlayerCardProps) => {
  return (
    <div
      key={player.element}
      style={{
        backgroundColor: "transparent",
        border: "none",
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${playerData?.code}.png`}
          alt={playerData?.web_name}
          style={{ width: "70px", height: "100px", borderRadius: "8px" }}
        />

        <Typography.Text>{playerData?.web_name || "Unknown"}</Typography.Text>
        <Typography.Text strong>
          Points: {playerData?.event_points || 0}
        </Typography.Text>
      </div>
    </div>
  );
};

export default PlayerCard;
