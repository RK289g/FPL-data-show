import { Flex, Image, Layout, Menu, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";

type MenuItem = Required<MenuProps>["items"][number];
const LayoutWrapper = () => {
  function getItem(label: React.ReactNode, key: string): MenuItem {
    return {
      key,
      label,
    };
  }
  const items = [
    getItem(<Link to="/">Home</Link>, ""),
    // getItem(<Link to="/leaderboard">Leaderboard</Link>, "leaderboard"),
    getItem(<Link to="/contact-us">Contact Us</Link>, "contact-us"),
  ];
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Flex justify="space-between" gap="200px">
          <Image
            src={logo}
            height={"50px"}
            width={"50px"}
            className="demo-logo"
            preview={false}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Flex>
      </Header>
      <Outlet />
    </Layout>
  );
};

export default LayoutWrapper;
