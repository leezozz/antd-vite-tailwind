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
const useStyles = createStyles(({ token, css }) => ({
  'custom-add-member-modal-style': {
    '.ant-modal-confirm-paragraph': {
        maxWidth: '100%',
        rowGap: 0
      }
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
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteMember(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDeleteMember = async (id: string) => {
    setLoading(true);
    const success = (await new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 600);
    })) as boolean;
    if (success) {
      setMembers(members.filter(member => member.id !== id));
    }
    setLoading(false);
  };

  const handleAppendMember = () => {
    const handleAppended = async (newMembers: Member[]) => {
      setLoading(true);
      await new Promise(resolve => {
        setTimeout(() => {
          setMembers([...newMembers, ...members]);
          setLoading(false);
          resolve(undefined);
        }, 600);
      });
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
        icon={<PlusOutlined />}
        onClick={handleAppendMember}
      >
        添加成员
      </Button>
      <Table
        dataSource={members}
        rowKey="id"
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
