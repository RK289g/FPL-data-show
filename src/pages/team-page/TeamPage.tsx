import { Button, Col, Input, Row, Card, Spin, Typography } from "antd";
import { useState } from "react";
import axios from "axios";
import TeamSquad from "./team-squad/TeamSqaud";

export interface Player {
  id: number;
  player_first_name: string;
  player_last_name: string;
  summary_overall_points: number;
  summary_overall_rank: number;
  name: string;
  current_event: number;
}

const TeamPage = () => {
  const [teamData, setTeamData] = useState<Player | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputTeamId, setInputTeamId] = useState<string>("");

  const fetchTeamData = async () => {
    if (!inputTeamId) return;
    setLoading(true);
    try {
      const response = await axios.get<Player>(
        `http://localhost:3000/user/${inputTeamId}`
      );
      setTeamData(response.data);
    } catch (error) {
      console.error("Error fetching the data:", error);
      setTeamData(null);
    } finally {
      setLoading(false);
    }
  };

  console.log("Team Data:", teamData);
  console.log("Latest Event:", teamData?.current_event);

  return (
    <div className="home-container">
      <Row gutter={16}>
        <Col>
          <div className="search-box">
            <Input
              type="text"
              title="Search by Team ID"
              placeholder="Enter Team ID"
              value={inputTeamId}
              onChange={(e) => setInputTeamId(e.target.value)}
              className="league-id-input"
            />
            <Button
              type="primary"
              onClick={fetchTeamData}
              disabled={!inputTeamId}
            >
              Fetch Team
            </Button>
          </div>
        </Col>
      </Row>

      {loading && <Spin size="large" style={{ marginTop: 20 }} />}

      {teamData && (
        <Card title={`Team: ${teamData.name}`} style={{ marginTop: 20 }}>
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

      {teamData && (
        <TeamSquad teamId={inputTeamId} eventId={teamData?.current_event} />
      )}
    </div>
  );
};

export default TeamPage;
