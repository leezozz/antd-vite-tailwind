import { Layout, Menu } from "antd";
import { Outlet } from 'react-router-dom'

const { Header, Content, Footer } = Layout;

const Layouts: React.FC = () => {
  return (
    <>
      <Layout className="h-screen w-screen">
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Content className="bg-bg-main p-10">
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>  
  )
}

export default Layouts
