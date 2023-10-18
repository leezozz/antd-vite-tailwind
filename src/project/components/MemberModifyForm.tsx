import { Button, Divider, Input, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { SelectProps } from 'antd';
import jsonp from 'fetch-jsonp';
import qs from 'qs';
import cx from "classnames";
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

const mockDatas = JSON.stringify(generateMockMembers(10));
const mockMembers = JSON.parse(mockDatas);

const useStyle = createStyles({
  'custom-table-container-style': {
    '.ant-table-body': {
      height: '300px',
      'table': {
        height: '100%'
      }
    }
  },
  'custom-search-container-style': {
    
  },
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
  const [inputValue, setInputValue] = useState<string>('');
  const selectedTableRef = React.useRef<HTMLDivElement>(null)

  let timeout: ReturnType<typeof setTimeout> | null;

  useEffect(() => {
    setTimeout(() => {
      setMembers(mockMembers);
      setLoading(false);
    }, 800);
  }, []);


  const fetch = (value: string) => {
    console.log('fetch', value, selectedTableRef, )
  
    const fake = () => {
      console.log('fetch', value)
      setMembers(mockMembers.filter(member => member.id.includes(value)));
    };
    if (value) {
      console.log('如果value存在', value)
      timeout = setTimeout(fake, 300);
    } else {
      setMembers(JSON.parse(mockDatas))
      setTimeout(
        () => {
          console.log('否则', value, JSON.stringify(selectedRowKeys), setSelectedRowInfos, selectedRowInfos?.map((item) => item.id))
          setSelectedRowKeys(selectedRowInfos?.map((item) => item.id));
        }, 1000
      )
    }
  };


  // const fetch = (value: string, callback: Function) => {
  //   console.log('fetch', value, callback)
  //   if (timeout) {
  //     clearTimeout(timeout)
  //     timeout = null
  //   }

  //   const getSearchResult = async() => {
  //     const res = await fetch('xxx', {
  //       searchValue: value
  //     })
  //     if (!res.error) {
  //       callback(res)
  //     }
  //   }
  // }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`handleSearch`, e, e.target)
    setInputValue(e.target.value)
    fetch(e.target.value);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: any) => {
    console.log('newSelectedRowKeys', newSelectedRowKeys, selectedRows)
    setSelectedRowKeys(newSelectedRowKeys);
    // // TODO: 确定哪个是去除勾选的
    setSelectedRowInfos(selectedRows)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  console.log('selectedRowKeys', selectedRowKeys)

  // 添加成员弹框中的删除
  const handleDeleteMember = (item: any) => {
    console.log('item', item, item.id)
    setSelectedRowKeys(selectedRowKeys.filter(arg => arg !== item.id))
    setSelectedRowInfos(selectedRowInfos.filter(arg => arg.id !== item.id))
    console.log('item---', selectedRowKeys)
  }

  const handleSubmit = () => {
    console.log("新建");
  };

  return (
    <div className="flex flex-col h-[480px] overflow-hidden">
      <div className="flex divide-x pl-6 flex-1 overflow-hidden">
        <div className="flex-1 space-y-3 py-[12px] pr-[16px] border-0 border-r-[1px] border-slate-200 border-solid">
          {/* {inputValue} */}
          <Input
            className={styles['custom-search-container-style']}
            prefix={<SearchOutlined />}
            placeholder="请输入姓名或工号搜索"
            value={inputValue}
            onChange={handleSearch}
          />
          <div ref={selectedTableRef}>
            <Table
              rowKey="id"
              className={cx({
                [styles['custom-table-container-style']]: !members?.length
              })}
              pagination={false}
              dataSource={members}
              columns={columns}
              loading={loading}
              rowSelection={rowSelection}
              scroll={{
                y: 300,
              }}
            ></Table>
          </div>
        </div>
        <div className="w-[300px] pl-[16px] pt-[12px] pr-[16px] overflow-y-auto">
          {
            selectedRowInfos?.map((item, index) => {
              return (
                <div className={styles['selectd-member-list-info']} key={index}>
                  <div className="flex items-center">
                    <UserOutlined />
                    <Tooltip title={item.name}>
                      <span className="inline-block w-[120px] overflow-x-hidden whitespace-nowrap text-ellipsis pl-[8px] pr-[32px]">{ item.name }</span>
                    </Tooltip>
                    <span>{item.id}</span>
                  </div>
                  <CloseOutlined className="cursor-pointer" onClick={() => handleDeleteMember(item)} />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="flex justify-end space-x-3 h-[33px] px-6 py-3 border-0 border-t-[1px] border-slate-200 border-solid">
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
