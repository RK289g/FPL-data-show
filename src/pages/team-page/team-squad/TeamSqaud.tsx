import { Card, Col, Row, Spin, Typography, Badge } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export interface PlayerPick {
  element: number; // Player ID
  position: number;
  multiplier: number;
}

export interface PlayerData {
  id: number;
  web_name: string;
  event_points: number;
  total_points: number;
}

interface TeamSquadProps {
  teamId: string;
  eventId: number; // Latest event ID
}

const formation = {
  1: [1], // Goalkeeper
  2: [2, 3, 4], // Defenders
  3: [5, 6, 7, 8], // Midfielders
  4: [9, 10, 11], // Forwards
};

const TeamSquad = ({ teamId, eventId }: TeamSquadProps) => {
  const [squad, setSquad] = useState<PlayerPick[]>([]);
  const [players, setPlayers] = useState<{ [key: number]: PlayerData }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("useEffect triggered with:", { teamId, eventId });

    const fetchSquad = async () => {
      if (!teamId) return;
      setLoading(true);
      try {
        console.log(
          `Fetching squad for team ${teamId} and event ${eventId}...`
        );

        // Fetch team picks from backend
        const response = await axios.get(
          `http://localhost:3000/user/${teamId}/event/${eventId}`
        );
        console.log("Picks Response:", response.data);
        const picks: PlayerPick[] = response.data.picks;

        // Fetch player data from backend
        const playersResponse = await axios.get(
          "http://localhost:3000/players"
        );
        console.log("Players Response:", playersResponse.data);
        const allPlayers: PlayerData[] = playersResponse.data;

        // Map player data
        const playerMap: { [key: number]: PlayerData } = {};
        allPlayers.forEach((p) => (playerMap[p.id] = p));

        setSquad(picks);
        setPlayers(playerMap);
      } catch (error) {
        console.error("Error fetching squad data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSquad();
  }, [teamId, eventId]);

  if (loading) return <Spin size="large" style={{ marginTop: 20 }} />;

  const startingXI = squad.filter(
    (p) => players[p.element] && p.position <= 11
  );
  const bench = squad.filter((p) => players[p.element] && p.position > 11);

  const renderPlayerCard = (player: PlayerPick) => {
    const playerData = players[player.element];

    return (
      <Card
        key={player.element}
        style={{ textAlign: "center", background: "#f0f2f5" }}
      >
        <Typography.Text>{playerData?.web_name || "Unknown"}</Typography.Text>
        <br />
        {player.multiplier > 1 && (
          <Badge
            count={player.multiplier === 2 ? "C" : "VC"}
            style={{
              backgroundColor: player.multiplier === 2 ? "gold" : "silver",
              fontSize: "14px",
            }}
          />
        )}
        <br />
        <Typography.Text strong>
          Points: {playerData?.event_points || 0}
        </Typography.Text>
      </Card>
    );
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "green" }}>
      <Typography.Title level={3}>My FPL Team</Typography.Title>

      {/* Formation Layout */}
      {Object.entries(formation).map(([key, positions]) => (
        <Row
          key={key}
          justify="center"
          gutter={[8, 8]}
          style={{ marginBottom: 10 }}
        >
          {positions.map((pos) => {
            const player = startingXI.find((p) => p.position === pos);
            return player ? (
              <Col span={6}>{renderPlayerCard(player)}</Col>
            ) : null;
          })}
        </Row>
      ))}

      <Typography.Title level={4} style={{ marginTop: 20 }}>
        Bench
      </Typography.Title>
      <Row justify="center" gutter={[8, 8]}>
        {bench.map((p) => (
          <Col key={p.element} span={6}>
            {renderPlayerCard(p)}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamSquad;
