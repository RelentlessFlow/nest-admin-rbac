import React, {useCallback, useState} from "react";
import {Button, Card, theme} from "antd";
import {FormattedMessage, useIntl, useModel} from "@umijs/max";
import {ModalForm, PageContainer, ProColumns, ProFormText, ProFormTextArea, ProTable} from "@ant-design/pro-components";
import request from "umi-request";
import {PlusOutlined} from "@ant-design/icons";
import RoleItem = AdminApi.RoleItem;

// 新建数据模态框
const CreateModal: React.FC = () => {
  // 国际化
  const intl = useIntl();
  const messageServerException = intl.formatMessage({id: 'page.api.error', defaultMessage: 'server exception.'})
  // Hooks
  const {
    createModalOpen,
    setCreateModalOpen,
    tableRef, messageApi
  } = useModel('Admin.Role.model');
  const handleOnFinish = useCallback(async (value: Record<string, any>) => {
    try {
      const { success, message } = await request.post<AdminApi.RoleAddResult>('http://localhost:9080/api/rbac/role', {data: value});
      messageApi.open({type: success ? 'success' : 'error', content: message ?? messageServerException});
      setCreateModalOpen(false);
      tableRef?.current?.reload();
    } catch (e) {
      messageApi.open({ type: 'error', content: messageServerException + (e as Error).message });
    }
  }, [messageApi, setCreateModalOpen, tableRef])
  // JSX
  return <ModalForm
    title={intl.formatMessage({
      id: 'page.admin.role.createModal.form.title', defaultMessage: 'New role'
    })}
    width={'400px'}
    open={createModalOpen}
    onOpenChange={(v) => setCreateModalOpen(v)}
    onFinish={handleOnFinish}
  >
    <ProFormText
      name={'name'} label={'name'} width={'md'}
      rules={[{
        min: 2, max: 10, required: true, message: (<FormattedMessage
          id={'page.admin.role.createModal.form.roleName'}
          defaultMessage={'Role name is required'}
        />)
      }]}
    />
    <ProFormTextArea
      name="description" label={'desc'} width="md"
      rules={[{min: 4, max: 100}]}
    />
  </ModalForm>
}

// ProTable查询列表
const QueryTable: React.FC = () => {
  // 国际化
  const intl = useIntl();
  const messageServerException = intl.formatMessage({id: 'page.api.error', defaultMessage: 'server exception.'})
  const columns: ProColumns<RoleItem>[] = [{
    dataIndex: 'index', valueType: "indexBorder", width: 48
  }, {
    dataIndex: 'id', title: 'ID'
  }, {
    dataIndex: 'name', title: 'Name'
  }, {
    dataIndex: 'description', title: 'Description'
  }, {
    dataIndex: 'createTime', title: 'Create Time'
  }, {
    dataIndex: 'updateTime', title: 'Update Time'
  }, {
    title: 'actions',
    key: 'actions2',
    valueType: 'option',
    render: (text, record, _, action) => [<a key={'actions_edit'}>
      <FormattedMessage
        id="page.admin.role.action.edit"
        defaultMessage="Edit"
      />
    </a>, <a key={'actions_detail'}>
      <FormattedMessage
        id="page.admin.role.action.detail"
        defaultMessage="Detail"
      />
    </a>,]
  },]
  const {
    setCreateModalOpen,
    tableRef,
    messageApi
  } = useModel('Admin.Role.model');
  const [pagination, setPagination] = useState({
    pageSize: 10, current: 1
  })
  return (<ProTable<RoleItem>
    headerTitle={"Role Table"}
    columns={columns}
    actionRef={tableRef}
    pagination={{
      pageSize: pagination.pageSize, current: pagination.current, onChange: (current, pageSize) => {
        setPagination((prev) => ({...prev, current: current}))
      }
    }}
    rowKey={'id'}
    request={async (params = {}, sort, filter) => {
      try {
        return await request.post<AdminApi.RoleQueryResult>('http://localhost:9080/api/rbac/role/query', {
          data: params
        })
      } catch (e) {
        messageApi.open({ type: 'error', content: messageServerException + (e as Error).message });
        return []
      }
    }}
    showSorterTooltip={true}
    toolBarRender={() => [<Button
      type="primary"
      key="primary"
      onClick={() => setCreateModalOpen(true)}
    >
      <PlusOutlined/> <FormattedMessage id="pages.searchTable.new" defaultMessage="New"/>
    </Button>,]}
  />)
}

const Role: React.FC = () => {
  const {token} = theme.useToken();
  const {initialState} = useModel('@@initialState');
  const { contextHolder } = useModel('Admin.Role.model');

  return (<PageContainer>
    <Card style={{borderRadius: 8}}>
      {/*查询列表*/}
      <QueryTable/>
      {/*新建实体*/}
      <CreateModal/>
    </Card>
    {contextHolder}
  </PageContainer>);
}

export default Role;
