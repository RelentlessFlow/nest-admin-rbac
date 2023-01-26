import {useRef, useState} from "react";
import {ActionType} from "@ant-design/pro-components";
import {message} from "antd";

export default () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const tableRef = useRef<ActionType>(null)
  const [messageApi, contextHolder] = message.useMessage();
  return {
    createModalOpen,
    setCreateModalOpen,
    tableRef,
    messageApi,
    contextHolder
  }
}
