import { Card, Col, Row, Spin, Typography } from "antd";
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
  total_points: number;
}

interface TeamSquadProps {
  teamId: string;
  eventId: number; // Latest event ID
}

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

  // Separate Starting XI and Bench
  const startingXI = squad.filter(
    (p) => players[p.element] && p.position <= 11
  );

  console.log("Starting XI:", startingXI);

  const bench = squad.filter((p) => players[p.element] && p.position > 11);
  console.log("Bench:", bench);

  return (
    <div>
      <Typography.Title level={4}>Starting XI</Typography.Title>
      <p>squad</p>
      <Row gutter={[16, 16]}>
        {startingXI.map((p) => (
          <Col key={p.element} span={6}>
            <Card>
              <Typography.Text>
                {players[p.element]?.web_name || "Unknown"}
              </Typography.Text>
              <br />
              <Typography.Text strong>
                Points: {players[p.element]?.total_points || 0}
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Typography.Title level={4} style={{ marginTop: 20 }}>
        Bench
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {bench.map((p) => (
          <Col key={p.element} span={6}>
            <Card>
              <Typography.Text>
                {players[p.element]?.web_name || "Unknown"}
              </Typography.Text>
              <br />
              <Typography.Text strong>
                Points: {players[p.element]?.total_points || 0}
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamSquad;
