import React from "react";
import {Card, theme} from "antd";
import {PageContainer} from "@ant-design/pro-components";
import {useModel} from "@umijs/max";

const Menu: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  return (
    <PageContainer>
      <Card style={{ borderRadius: 8 }}>
        Menu
      </Card>
    </PageContainer>
  );
}

export default Menu;
