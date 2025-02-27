import { Button, Col, Input, Row, Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import TeamSquad from "./team-squad/TeamSqaud";
import { Player } from "../../models/team";

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
    <div>
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

      <Row gutter={16}>
        <Col span={12}>
          {loading ? (
            <Spin size="large" />
          ) : teamData ? (
            <TeamSquad teamId={inputTeamId} eventId={teamData.current_event} />
          ) : (
            <p>No data found for the team</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TeamPage;
