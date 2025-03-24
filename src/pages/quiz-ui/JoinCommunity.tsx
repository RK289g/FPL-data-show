import { Button } from "antd";
import "./JoinCommunity.css";

const JoinCommunity = () => {
  return (
    <div className="join-community-wrapper">
      <div className="join-community-inner-wrapper">
        <p className="join-community-title">Join our Community</p>
        <p className="join-community-description">
          Connect, learn, and share. Your insights make a difference—let’s grow
          together!
        </p>
        <div className="join-community-button-wrapper">
          <Button color="default" shape="round" variant="solid" size="large">
            Join Us
          </Button>
          <Button
            shape="round"
            variant="solid"
            color="default"
            style={{ background: "transparent", borderColor: "#ffffff" }}
            size="large"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunity;
