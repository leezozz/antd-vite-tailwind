import { faker } from "@faker-js/faker";
import { Anchor, Col, Layout, Row } from "antd";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { mockItems } from "../data";

/**
 * 测试antd组件库中的anchor描点
 * @returns
 */
const TestAnchor: React.FC = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#fff",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    overflowY: 'auto',
  };

  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    backgroundColor: "#fff",
  };

  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    backgroundColor: "#fff",
  };

  const [currentLink, setCurrentLink] = useState("");
  const containerRef = useRef(null);

  const mockData = mockItems()
  console.log('mockData', mockData)

  const handleClick = (
    e: MouseEvent<HTMLElement, MouseEvent>,
    link: { title: ReactNode; href: string },
  ) => {
    console.log("handleClick", e, link);
    setCurrentLink(link.href);
  };

  useEffect(() => {
    console.log("containerRef", containerRef, faker.database.mongodbObjectId());
  }, [containerRef]);

  return (
    <>
      {/* <Row>
        <Col span={16}>
          <div ref={containerRef}>
            <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }} />
            <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }} />
            <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }} />
          </div>
        </Col>
        <Col span={8}>
          <Anchor
            affix={false}
            getContainer={() => containerRef.current!}
            getCurrentAnchor={() => currentLink}
            onClick={handleClick}
            items={[
              {
                key: 'part-1',
                href: '#part-1',
                title: 'Part 1',
              },
              {
                key: 'part-2',
                href: '#part-2',
                title: 'Part 2',
              },
              {
                key: 'part-3',
                href: '#part-3',
                title: 'Part 3',
              },
            ]}
          />
        </Col>
      </Row> */}
      {/* <div className="h-full"> */}
      <Layout className="h-[100vh]">
        <Sider style={siderStyle}>
          {/* getContainer={() => containerRef.current!}
          getCurrentAnchor={() => currentLink} */}
          <Anchor
            affix={false}
            replace
            onClick={handleClick}
            items={[
              {
                key: "part-1",
                href: '#' + faker.database.mongodbObjectId(),
                title: "标题1",
              },
              {
                key: "part-2",
                href: "#part-2",
                title: "标题2",
              },
              {
                key: "part-3",
                href: "#part-3",
                title: "标题3",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={headerStyle}>Header</Header>
          <Content style={contentStyle}>
            <div
              id="part-1"
              style={{ height: "100%", color: '#000', background: "rgba(255,0,0,0.02)" }}
            >111</div>
            <div
              id="part-2"
              style={{ height: "100%", color: '#000', background: "rgba(0,255,0,0.02)" }}
            >222</div>
            <div
              id="part-3"
              style={{ height: "100%",color: '#000',  background: "rgba(0,0,255,0.02)" }}
            >333</div>
          </Content>
          <Footer style={footerStyle}>Footer</Footer>
        </Layout>
      </Layout>
      {/* </div> */}
    </>
  );
};
export default TestAnchor;
