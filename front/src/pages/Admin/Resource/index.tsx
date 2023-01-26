import React from "react";
import {Card, theme} from "antd";
import {useModel} from "@umijs/max";
import {PageContainer} from "@ant-design/pro-components";

const Resource: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  return (
    <PageContainer>
      <Card style={{ borderRadius: 8 }}>
        Resource
      </Card>
    </PageContainer>
  );
}

export default Resource;
