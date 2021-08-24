import React from "react";
import { Redirect } from "react-router-dom";
import { Button, message } from "antd";
import axios from "axios";
import "./style.css";

interface State {
  loaded: boolean;
  isLogin: boolean;
  data: object;
}

interface Data {
  src: string;
  time: number;
}

class Home extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loaded: false,
      isLogin: true,
      data: {},
    };
  }

  checkLogin = async () => {
    const res = await axios.get("/api/isLogin");
    if (res.data) {
      console.log("已登录");
      this.setState({ isLogin: true, loaded: true });
    } else {
      this.setState({ isLogin: false, loaded: true });
      console.log("未登录");
    }
  };

  handleLogout = async () => {
    const res = await axios.get("/api/logout");

    if (res.data?.data) {
      this.setState({ isLogin: false });
    }
  };

  handleCrowller = async () => {
    const res = await axios.get("/api/getData");

    if (res.data?.data) {
      message.success("爬取成功");
    }
  };

  handleShowData = async () => {
    const res = await axios.get("/api/showData");

    if (res.data?.data) {
      console.log(res);
      this.setState({ data: res.data.data });
    }
  };

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    const { isLogin, loaded, data } = this.state;
    let list: JSX.Element[] = [];
    Object.values(data).forEach((item) => {
      list.push(<img src={item.src} alt={item.time} key={item.time} />);
    });

    if (isLogin) {
      if (loaded) {
        return (
          <div>
            <div className="btn-wrap">
              <Button type="primary" onClick={this.handleCrowller}>
                爬取
              </Button>
              <Button type="primary" onClick={this.handleShowData}>
                展示
              </Button>
              <Button type="ghost" onClick={this.handleLogout}>
                退出
              </Button>
            </div>
            <div className="img-wrap">{list}</div>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Home;
