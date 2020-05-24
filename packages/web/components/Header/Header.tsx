import * as React from "react";
import { Button, Layout, Row, Space } from "antd";

import "./Header.css";

import Logo from "../Logo/Logo";
import NavMenu from "../NavMenu/NavMenu";
import { SearchLine } from "../SearchLine/SearchLine";

export const Header = () => {
  return (
    <React.Fragment>
      <Layout>
        <Row justify="space-between">
          <Space>
            <Logo />
            <NavMenu />
            <SearchLine />
            <Button type="default" shape="round">
              Войти
            </Button>
            <Button type="primary" shape="round">
              Зарегистрироваться
            </Button>
          </Space>
        </Row>
      </Layout>
    </React.Fragment>
 );
};
