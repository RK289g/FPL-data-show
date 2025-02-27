import { Card, Col, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../player-card/PlayerCard";
import "./TeamSquad.css";
import { PlayerData, PlayerPick, TeamData } from "../../../models/team";

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
    <div className="team-squad-container">
      {/* Team Info Card */}
      {teamData && (
        <Card title={`Team: ${teamData.name}`} className="team-card">
          <Typography.Text>
            <strong>Manager:</strong> {teamData.player_first_name}{" "}
            {teamData.player_last_name}
          </Typography.Text>
          <br />
          <Typography.Text>
            <strong>Overall Points:</strong> {teamData.summary_event_points}
          </Typography.Text>
        </Card>
      )}

      <Typography.Title level={3} className="team-title">
        My FPL Team
      </Typography.Title>

      {/* Football Pitch Background */}
      <div className="football-pitch">
        {Object.entries(formation).map(([key, positions]) => (
          <Row key={key} className="formation-row">
            {positions.map((pos) => {
              const player = startingXI.find((p) => p.position === pos);
              return player ? (
                <div key={player.element} className="player-position">
                  <PlayerCard
                    player={player}
                    playerData={players[player.element]}
                  />
                </div>
              ) : null;
            })}
          </Row>
        ))}
      </div>

      {/* Bench Players */}
      <Typography.Title level={4} className="bench-title">
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
