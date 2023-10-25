import { Button, Modal, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { createStyles } from 'antd-style';
import {
  Member,
  generateMockMembers,
} from "../data/member";
import MemberModifyForm from "./MemberModifyForm";

interface MemberConfigFormProps {
  projectId: string;
  onClosed: () => void;
}

// 使用antd-style修改内置的嵌套样式
const useStyles = createStyles(() => ({
  'custom-add-member-modal-style': {
    '.ant-modal-confirm-paragraph': {
      maxWidth: '100%',
      rowGap: 0
    }
  },
  'custom-table-style': {
    marginBottom: '8px!important',
  }
}))

const MemberConfigForm: React.FC<MemberConfigFormProps> = ({ projectId }) => {
  const { styles } = useStyles();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMembers(generateMockMembers(20));
      setLoading(false);
    }, 1000);
  }, [projectId]);

  const columns: ColumnsType<Member> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "工号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "职称",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "部门",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      render: (_, { id }) => (
        <>
          <Button type="link" danger onClick={() => handleDeleteModal(id)}>删除</Button>
        </>
      ),
    },
  ];

  const handleDeleteModal = (id: string) => {
    const handleDeleteMember = () => {
      console.log('删除', id)
      // TODO: 删除接口
      destroy()
      // TODO: 重新获取列表接口 【待确定：footer的提交、取消按钮应该不需要】
      // setLoading(true);
      // setLoading(false);
    }

    const { destroy } = Modal.warning({
      title: '删除项目',
      content: '是否删除该项目',
      // centered: true,
      footer: <>
         <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
            <Button onClick={() => destroy()}>取消</Button>
            <Button className="ml-[10px]" type="primary" danger onClick={handleDeleteMember} >确定</Button>
          </div>
      </>,
    });
  };

  const handleAppendMember = () => {
    const handleAppended = async () => {
      console.log('回调')
      destroy()
      // TODO: 重新获取成员管理列表
      // setLoading(true);
      // setLoading(false);
    };

    const { destroy } = modal.info({
      className: styles['custom-add-member-modal-style'],
      title: (
        <div className="flex justify-between px-6 border-0 border-b-[1px] border-slate-200 border-solid">
          <p>添加成员</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      width: 800,
      content: (
        <MemberModifyForm
          onFinish={handleAppended}
          onClosed={() => destroy()}
        />
      ),
      icon: null,
    });
  };
  return (
    <div className="space-y-3 px-6 py-4">
      <Button
        type="primary"
        className="mb-[4px]"
        icon={<PlusOutlined />}
        onClick={handleAppendMember}
      >
        添加成员
      </Button>
      <Table
        rowKey="id"
        className={styles['custom-table-style']}
        dataSource={members}
        pagination={false}
        columns={columns}
        loading={loading}
        scroll={{
          x: 1000,
          y: 400,
        }}
      />
      {contextHolder}
    </div>
  );
};

export default MemberConfigForm;
