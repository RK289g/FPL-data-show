import { Button, Col, Input, Row } from "antd";

const TeamPage = () => {
  return (
    <div className="home-container">
      <Row gutter={16}>
        <Col>
          <div className="search-box">
            <Input
              type="text"
              title="Search by League ID"
              placeholder="Enter League ID"
              //   value={inputLeagueId}
              //   onChange={(e) => setInputLeagueId(e.target.value)}
              className="league-id-input"
            />
            <Button
              type="primary"
              //   onClick={fetchLeagueData}
              //   disabled={!inputLeagueId}
            >
              Fetch League
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TeamPage;
