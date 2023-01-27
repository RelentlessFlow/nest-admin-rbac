import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, Card, message, theme} from "antd";
import {FormattedMessage, useIntl, useModel} from "@umijs/max";
import {ModalForm, PageContainer, ProColumns, ProFormInstance, ProFormText, ProFormTextArea, ProTable} from "@ant-design/pro-components";
import {PlusOutlined} from "@ant-design/icons";
import * as rbacApi from '../../../services/rbac/api'
import moment from "moment";
import { orderMap } from "@/common";
import {RoleType} from "typelibrary/entity";
import {CreateRoleDtoType, UpdateRoleDtoType} from "typelibrary/dto/common";

// 新建角色模态框
const CreateModal: React.FC = () => {
  // 国际化
  const intl = useIntl();
  // 数据流
  const {
    createModalOpen,
    setCreateModalOpen,
    tableRef,
  } = useModel('Admin.Role.model', (model) => ({
    createModalOpen: model.createModalOpen,
    setCreateModalOpen: model.setCreateModalOpen,
    tableRef: model.tableRef,
  }));
  const handleOnFinish = useCallback(async (data: CreateRoleDtoType) => {
    let { success: _success, message: _message } = await rbacApi.addRole(data)
    message.success(_message, 0.8);
    tableRef?.current?.reload();
    return _success
  }, [setCreateModalOpen, tableRef])
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

// 编辑角色模态框
const EditModal: React.FC<{
  role?: RoleType
}> = ({role}) => {
  const intl = useIntl()
  const { eidtModalOpen, setEidtModalOpen, tableRef } = useModel('Admin.Role.model', (model) => ({
    eidtModalOpen: model.editModalOpen,
    setEidtModalOpen: model.setEidtModalOpen,
    tableRef: model.tableRef
  }))
  useEffect(() => { eidtModalOpen ? formRef?.current?.setFieldsValue(role) : null }, [eidtModalOpen]) // 当表单展示的时候刷新表单数据，
  const formRef = useRef<ProFormInstance>();
  const handleOnFinish = useCallback(async(role: UpdateRoleDtoType) => {
    const {success: _success, message: _message} = await rbacApi.editRole(role)
    message.success(_message, 0.8);
    tableRef?.current?.reload();
    return _success
  }, [])
  return <ModalForm
    formRef={formRef}
    title={intl.formatMessage({
      id: 'page.admin.role.updateModal.form.title', defaultMessage: 'Edit role'
    }) + `:${role?.name}`}
    width={'400px'}
    open={eidtModalOpen}
    onOpenChange={(v) => setEidtModalOpen(v)}
    onFinish={handleOnFinish}
    initialValues={role}
  >
    <ProFormText name={'id'} hidden/>
    <ProFormText
      name={'name'} label={'name'} width={'md'}
      rules={[{
        min: 2, max: 10, required: true, message: (<FormattedMessage
          id={'page.admin.role.updateModal.form.roleName'}
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
  // 数据流
  const {
    setCreateModalOpen, setEidtModalOpen, setCurrentRole, tableRef,
  } = useModel('Admin.Role.model', (model) => ({
    setCreateModalOpen: model.setCreateModalOpen,
    setEidtModalOpen: model.setEidtModalOpen,
    setCurrentRole: model.setCurrentRole,
    tableRef: model.tableRef,
  }));
  const [pagination, setPagination] = useState({
    pageSize: 10, current: 1
  })
  const columns: ProColumns<RoleType>[] = [{
    dataIndex: 'index', valueType: "indexBorder", width: 48
  }, {
    dataIndex: 'id', title: 'ID', width: 50,
  }, {
    dataIndex: 'name', title: 'Name', sorter: true, width: 150,
    ellipsis: true, copyable: true
  }, {
    dataIndex: 'description', title: 'Desc', sorter: true, width: 200,
    ellipsis: true
  }, {
    dataIndex: 'createTime', title: 'CreateTime', sorter: true, width: 200,
    renderText: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss')
  }, {
    dataIndex: 'updateTime', title: 'UpdateTime', sorter: true, width: 200,
    renderText: (time) => moment(time).format('YYYY-MM-DD HH:mm:ss')
  }, {
    title: 'actions',
    key: 'actions2',
    valueType: 'option',
    render: (text, record, _, action) => [
    <a key={'actions_edit'} onClick={() => {
      setCurrentRole(record);
      setEidtModalOpen(true);
    }}>
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

  return (<ProTable<RoleType>
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
      const data = await rbacApi.role({...params, ...orderMap(sort)})
      return data;
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
  const { currentRole } = useModel('Admin.Role.model', (model) => ({
    currentRole: model.currentRole
  }));

  return (<PageContainer>
    <Card style={{borderRadius: 8}}>
      {/*查询列表*/}
      <QueryTable />
      {/*新建实体*/}
      <CreateModal />
      <EditModal role={currentRole}/>
    </Card>
  </PageContainer>);
}

export default Role;
