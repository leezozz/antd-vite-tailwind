import { Button, Divider, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import {
  Member,
  generateMockMembers,
} from "../data/member";
import { createStyles } from "antd-style";

type selectedRowInfoType = {
  name: string
  id: string
}

interface MemberModifyFormProps {
  onFinish: (members: Member[]) => void;
  onClosed: () => void;
}
const { Search } = Input;
const mockMembers = generateMockMembers(100);

const useStyle = createStyles({
  'selectd-member-list-info': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    marginBottom: '4px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#EFF1F4',
    }
  }
})

const columns: ColumnsType<Member> = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "工号",
    dataIndex: "id",
  },
];

const MemberModifyForm: React.FC<MemberModifyFormProps> = ({
  onFinish,
  onClosed,
}) => {
  const { styles } =  useStyle()
  const [members, setMembers] = useState<Member[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowInfos, setSelectedRowInfos] = useState<selectedRowInfoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMembers(mockMembers);
      setLoading(false);
    }, 800);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    console.log('newSelectedRowKeys', newSelectedRowKeys, selectedRows)
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowInfos(selectedRows)
  }

  const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
    //   console.log('selectedRowKeys', selectedRowKeys, selectedRows)
    //   setSelectedRowKeys(selectedRowKeys);
    //   setSelectedRowInfos(selectedRows)
    // },
    // getCheckboxProps: (record: Member) => ({
    //   name: record.name,
    // }),
    selectedRowKeys,
    onChange: onSelectChange,
  };
  console.log('selectedRowKeys', selectedRowKeys)

  // 添加成员弹框中的删除
  const handleDeleteMember = (item: any) => {
    console.log('item', item, item.id)
    // setSelectedRowKeys([])
    setSelectedRowKeys(selectedRowKeys.filter(arg => arg !== item.id))
    setSelectedRowInfos(selectedRowInfos.filter(arg => arg.id !== item.id))
    console.log('item---', selectedRowKeys)
  }

  const handleSearch = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      setMembers(mockMembers.filter(member => member.id.includes(value)));
      setLoading(false);
    }, 800);
  };
  const handleSubmit = () => {
    console.log("");
  };

  return (
    <div>
      <div className="flex divide-x px-6">
        <div className="flex-1 space-y-3 pt-[12px] pr-[16px] border-0 border-r-[1px] border-slate-200 border-solid">
          <Search
            placeholder="请输入姓名或工号搜索"
            loading={loading}
            prefix={<SearchOutlined />}
            onSearch={handleSearch}
          />
          <Table
            rowKey="id"
            dataSource={members}
            columns={columns}
            loading={loading}
            rowSelection={rowSelection}
            scroll={{
              y: 300,
            }}
          ></Table>
        </div>
        <div className="w-[300px] pl-[16px] pt-[12px]">
          { JSON.stringify(selectedRowKeys) }
          {
            selectedRowInfos?.map((item, index) => {
              return (
                <div className={styles['selectd-member-list-info']} key={index}>
                  <div className="flex items-center">
                    <UserOutlined />
                    <span className="inline-block w-[120px] overflow-x-hidden whitespace-nowrap text-ellipsis pl-[8px] pr-[32px]">{ item.name }</span>
                    <span>{item.id}</span>
                  </div>
                  <CloseOutlined className="cursor-pointer" onClick={() => handleDeleteMember(item)} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="flex justify-end space-x-3 px-6 py-3 border-0 border-t-[1px] border-slate-200 border-solid">
        <Button htmlType="button" onClick={onClosed}>
          取消
        </Button>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          新建
        </Button>
      </div>
    </div>
  );
};

export default MemberModifyForm;
