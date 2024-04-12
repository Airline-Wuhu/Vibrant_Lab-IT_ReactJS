import { Breadcrumb, Layout, Input, Image, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import StudentTable from "./StudentTable";
const { Header, Content, Sider, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [searchText, setSearchText] = useState("");
  const siderRef = useRef(null);

  // use effect for side bar
  // collapse when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (siderRef.current && !siderRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [siderRef]);

  // console.log(searchText);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        ref={siderRef}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={() => setCollapsed(false)}
          items={[
            {
              key: "1",
              icon: <SearchOutlined />,
              label: (
                <Input
                  placeholder="search Text"
                  onChange={(event) => setSearchText(event.target.value)} 
                  //event listener to user input, pass to searchtext
                />
              ),
              title: "search",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={[{ title: "User" }, { title: "Employees" }]}
          />
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <StudentTable searchText={searchText}/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          This is a footer!
          <br />
          <Image
            width={35}
            src="https://image11.m1905.cn/uploadfile/2016/0205/20160205103239628184.jpg"
          />
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
