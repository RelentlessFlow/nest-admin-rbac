import React, {useRef} from 'react';
import {Card, Space, Tag, theme} from "antd";
import {useModel} from "@@/exports";
import {PageContainer, ProColumnType, ProColumns, ActionType, ProTable} from "@ant-design/pro-components";
import {request} from "@umijs/max";

const proTableRender = () => {
  type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
      name: string;
      color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index', valueType: 'indexBorder',
      width: 48,
    },
    {
      dataIndex: 'title', title: '标题',
      tooltip: '标题',
      copyable: true, ellipsis: true,
      formItemProps: { rules: [ { required: true, message: '此项为必填项', }, ], },
    },
    {
      dataIndex: 'state', title: '状态', disable: true, valueType: 'select',
      valueEnum: {
        all: {text: '超长'.repeat(50)},
        open: {text: '未解决', status: 'Error',},
        closed: {text: '已解决', status: 'Success', disabled: true,},
        processing: {text: '解决中', status: 'Processing',},
      },
      filters: true, onFilter: false, ellipsis: true,
    },
    {
      dataIndex: 'labels', title: '标签', disable: true, search: { transform: (value) => { return value} },
      renderFormItem: (_, { defaultRender }) => { return defaultRender(_); },
      render: (_, record) => (
        <Space>
          {record.labels.map(({ name, color }) => (
            <Tag color={color} key={name}> {name} </Tag>
          ))}
        </Space>
      ),
    },
    {
      dataIndex: 'created_at', title: '创建时间', valueType: 'date', key: 'showTime',
      sorter: true,  search: {
        transform: (value) => { return { startTime: value[0], endTime: value[1], }; },
      },
    },
    {
      title: '操作', key: 'option', valueType: 'option',
      render: (text, record, _, action) => [
        <><a>编辑</a><a>查看</a></>
      ]
    },
  ]

  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      headerTitle="高级表格"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params, sort);
        return request<{ data: GithubIssueItem[]; }>('https://proapi.azurewebsites.net/github/issues', {params,});
      }}
      editable={{type: 'multiple',}}
      pagination={{ pageSize: 5,  onChange: (page) => console.log(page), }}
    />
  )
}

const Test: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  return (
    <PageContainer>
      <Card style={{ borderRadius: 8 }}>
        {proTableRender()}
      </Card>
    </PageContainer>
  );
}

export default Test;
