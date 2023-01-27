import {useRef, useState} from "react";
import {ActionType} from "@ant-design/pro-components";
import {message} from "antd";
import {RoleType} from "typelibrary/entity";

export default () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEidtModalOpen] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<RoleType | undefined>(undefined);
  const tableRef = useRef<ActionType>(null)
  return {
    createModalOpen,setCreateModalOpen,
    editModalOpen, setEidtModalOpen,
    currentRole, setCurrentRole,
    tableRef
  }
}
