import { Button, Divider, Input, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from 'antd/es/table/interface';
import cx from "classnames";
// import Mock from 'mockjs';
import {
  Member,
  generateMockMembers,
} from "../data/member";
import { createStyles } from "antd-style";
import { usePagination } from "ahooks";

type selectedRowInfoType = {
  name: string
  id: string
}

interface MemberModifyFormProps {
  onFinish: () => void;
  onClosed: () => void;
}

const mockDatas = JSON.stringify(generateMockMembers(50));
const mockMembers = JSON.parse(mockDatas);

const useStyle = createStyles({
  'custom-table-container-style': {
    '.ant-table-body': {
      'table': {
        height: '100%'
      }
    }
  },
  'custom-table-pagination-style': {
    '.ant-table-body': {
    },
    '.ant-table-pagination': {
      marginBottom: '12px!important'
    },
    '.ant-pagination-total-text': {
      flex: 1
    }
  },
  'custom-search-container-style': {
    marginBottom: '13px'
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
  const { styles } = useStyle()
  const [members, setMembers] = useState<Member[]>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowInfos, setSelectedRowInfos] = useState<selectedRowInfoType[]>([]);
  // const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState<string>('');
  const selectedTableRef = React.useRef<HTMLDivElement>(null)


  const userList = (current: number, pageSize: number, timeLimit: number) => {
    console.log('----', current, pageSize, timeLimit)

    // TODO: 接口请求
    // const { data, loading, run } = useRequest(getSearchList, {
    //   debounceWait: timeLimit,
    //   manual: true,
    // });
    const res = JSON.stringify(generateMockMembers(30))
    setSelectedRowKeys(selectedRowInfos?.map((item) => item.id));
    console.log('😈', res, JSON.stringify(selectedRowInfos), selectedRowInfos, JSON.stringify(selectedRowKeys))
    return {
      total: 30,
      list: JSON.parse(res)
    }
  };

  async function getUserList(params: {
    current: number;
    pageSize: 10;
  }): Promise<{ total: number; list: Member[] }> {
    console.log('++++++++++++', params)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userList(params.current, params.pageSize, 0));
      }, 1000);
    });
  }

  const { data, loading, pagination } = usePagination(getUserList, {
    defaultPageSize: 20,
  });
  
  const paginationConfig = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    showTotal: (total: number) => `共${total}条`,
    onChange: pagination.onChange,
  } 
  console.log('data 😯', data, data?.list)

  useEffect(() => {
    setTimeout(() => {
      setMembers(mockMembers);
    }, 800);
  }, []);


  const fetch = (value: string) => {
    console.log('fetch', value, selectedTableRef, ) 

    userList(1, 20, 500)

  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`handleSearch`, e, e.target)
    setInputValue(e.target.value)
    fetch(e.target.value);
  };

  
  // 用户手动选择/取消选择某行的回调
  const handleSelect = (record: Member, selected: boolean, selectedRows: Member[]) => {
    console.log('用户手动选择/取消选择某行的回调', record, selected, selectedRows)
    if (selected) {
      console.log('如果勾选')
      setSelectedRowKeys([...selectedRowKeys, record.id]);
      setSelectedRowInfos([...selectedRowInfos, record])
    } else {
      console.log('如果去除勾选')
      console.log('selectedRowKeys.filter(item => item !== record.id)', selectedRowKeys.filter(item => item !== record.id))
      console.log('selectedRowInfos.filter((item: any) => item.id !== record.id)', JSON.stringify(selectedRowInfos))
      console.log('---', selectedRowInfos.filter((item: any) => item.id !== record.id))
      setSelectedRowKeys(selectedRowKeys?.filter(item => item !== record.id));
      setSelectedRowInfos(selectedRowInfos?.filter((item: any) => item.id !== record.id))
    }
  }

  // 用户手动选择/取消选择所有行的回调
  const handleSelectAll = (selected: boolean, selectedRows: Member[], changeRows: Member[]) => {
    console.log('用户手动选择/取消选择所有行的回调', selected, selectedRows, changeRows)
    if (selected) {
      const newSelectedkeys = [...selectedRowKeys, ...changeRows.map((item) => item.id)]
      const newSelectedRowInfos = [...selectedRowInfos, ...changeRows]
      console.log('全部勾选', newSelectedkeys, newSelectedRowInfos)
      setSelectedRowKeys(newSelectedkeys)
      setSelectedRowInfos(newSelectedRowInfos)
    } else {
      // 根据 旧的选中id数组、现在状态改变的数组 过滤掉出取消勾选的信息
      const handleCounterElection = (allSelected: any[], changeItem: Member[]) => {
        const res = allSelected.filter((item: any) => {
         return !changeItem.some((arg: Member) => (arg.id === (item?.id ? item?.id : item)))
        })
        return res
      }
      console.log('aaa', handleCounterElection(selectedRowKeys, changeRows))

      setSelectedRowKeys(handleCounterElection(selectedRowKeys, changeRows))
      setSelectedRowInfos(handleCounterElection(selectedRowInfos, changeRows))
    }
  }

  const rowSelection: TableRowSelection<Member> = {
    selectedRowKeys,
    onSelect: handleSelect,
    onSelectAll: handleSelectAll,
  };
  console.log('selectedRowKeys', selectedRowKeys)
  console.log('selectedRowInfos', selectedRowInfos, JSON.stringify(selectedRowInfos))

  // 添加成员弹框中的删除
  const handleDeleteMember = (item: selectedRowInfoType) => {
    console.log('item', item, item.id)
    setSelectedRowKeys(selectedRowKeys.filter(arg => arg !== item.id))
    setSelectedRowInfos(selectedRowInfos.filter(arg => arg.id !== item.id))
    console.log('item---', selectedRowKeys)
  }

  const handleSubmit = () => {
    console.log("提交");

    if (selectedRowKeys.length) {
      // TODO: 提交接口
      // TODO: 提交成功，onfinish
      onFinish()
    } 
  };

  return (
    <div className="flex flex-col max-h-[530px] overflow-hidden">
      <div className="flex divide-x pl-6 flex-1 overflow-hidden">
        <div className="flex-1 space-y-3 pt-[12px] pr-[16px] border-0 border-r-[1px] border-slate-200 border-solid">
          <div className="flex flex-col">
          <Input
            className={styles['custom-search-container-style']}
            prefix={<SearchOutlined />}
            placeholder="请输入姓名或工号搜索"
            value={inputValue}
            onChange={handleSearch}
            />
            <div>
              <Table
                rowKey="id"
                className={cx({
                  [styles['custom-table-container-style']]: !members?.length,
                  [styles['custom-table-pagination-style']]: true
                })}
                pagination={paginationConfig}
                dataSource={data?.list}
                columns={columns}
                loading={loading}
                rowSelection={rowSelection}
                scroll={{
                  y: 300,
                }}
              />
                {/* dataSource={members} */}
            </div>
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
        <Button type="primary" htmlType="submit" disabled={!selectedRowInfos.length} onClick={handleSubmit}>
          提交
        </Button>
      </div>
    </div>
  );
};

export default MemberModifyForm;
