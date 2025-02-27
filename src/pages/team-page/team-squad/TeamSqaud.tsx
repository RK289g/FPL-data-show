import { Card, Col, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../player-card/PlayerCard";

export interface PlayerPick {
  element: number;
  position: number;
  multiplier: number;
}

export interface PlayerData {
  id: number;
  web_name: string;
  event_points: number;
  total_points: number;
  code: number;
}

export interface TeamData {
  name: string;
  player_first_name: string;
  player_last_name: string;
  summary_overall_points: number;
}

interface TeamSquadProps {
  teamId: string;
  eventId: number;
}

const formation = {
  1: [1],
  2: [2, 3, 4],
  3: [5, 6, 7, 8],
  4: [9, 10, 11],
};

const TeamSquad = ({ teamId, eventId }: TeamSquadProps) => {
  const [squad, setSquad] = useState<PlayerPick[]>([]);
  const [players, setPlayers] = useState<{ [key: number]: PlayerData }>({});
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSquad = async () => {
      if (!teamId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/user/${teamId}/event/${eventId}`
        );
        const picks: PlayerPick[] = response.data.picks;

        const playersResponse = await axios.get(
          "http://localhost:3000/players"
        );
        const allPlayers: PlayerData[] = playersResponse.data;

        const playerMap: { [key: number]: PlayerData } = {};
        allPlayers.forEach((p) => (playerMap[p.id] = p));

        // Fetch team data
        const teamResponse = await axios.get(
          `http://localhost:3000/user/${teamId}`
        );
        setTeamData(teamResponse.data);

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

  return (
    <div style={{ textAlign: "center", backgroundColor: "green" }}>
      {/* Team Info Card */}
      {teamData && (
        <Card title={`Team: ${teamData.name}`} style={{ marginBottom: 20 }}>
          <Typography.Text>
            <strong>Manager:</strong> {teamData.player_first_name}{" "}
            {teamData.player_last_name}
          </Typography.Text>
          <br />
          <Typography.Text>
            <strong>Overall Points:</strong> {teamData.summary_overall_points}
          </Typography.Text>
        </Card>
      )}

      <Typography.Title level={3}>My FPL Team</Typography.Title>

      {Object.entries(formation).map(([key, positions]) => (
        <Row
          key={key}
          justify="center"
          gutter={[2, 2]}
          // style={{ marginBottom: 10 }}
        >
          {positions.map((pos) => {
            const player = startingXI.find((p) => p.position === pos);
            return player ? (
              <PlayerCard
                player={player}
                playerData={players[player.element]}
              />
            ) : null;
          })}
        </Row>
      ))}

      <Typography.Title level={4} style={{ marginTop: 20 }}>
        Bench
      </Typography.Title>
      <Row justify="center" gutter={[8, 8]}>
        {bench.map((p) => (
          <Col key={p.element} span={4}>
            <PlayerCard player={p} playerData={players[p.element]} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeamSquad;
