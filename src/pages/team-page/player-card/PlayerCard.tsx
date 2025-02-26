import { Card, Typography } from "antd";
import { PlayerData, PlayerPick } from "../team-squad/TeamSqaud";

interface PlayerCardProps {
  player: PlayerPick;
  playerData?: PlayerData;
}

const PlayerCard = ({ player, playerData }: PlayerCardProps) => {
  return (
    <Card key={player.element} style={{ backgroundColor: "transparent" }}>
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
          style={{ width: "70px", height: "auto", borderRadius: "8px" }}
        />

        <Typography.Text>{playerData?.web_name || "Unknown"}</Typography.Text>
        <Typography.Text strong>
          Points: {playerData?.event_points || 0}
        </Typography.Text>
      </div>
    </Card>
  );
};

export default PlayerCard;
