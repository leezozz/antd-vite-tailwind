import React, { useEffect, useState } from "react"
import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Layout, Row, Select, Space, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from "@ant-design/icons";
import { usePagination } from "ahooks";
import { createStyles } from "antd-style";
import cx from "classnames";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type formDataType = {
  ruleName: string
  ruleDescription: string
  thresholdType: string
  expression: string
  thresholdSize: number
}

type optionsType = {
  label: string
  value: string
}

interface DataType {
  key: string;
  ruleName: string;
  ruleDescription: string;
  createTime: string;
  enabledStatus: boolean
}

interface RuleNameListsType {
  label: string
  value: string
}

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  color: '#fff',
};

const siderStyle: React.CSSProperties = {
  padding: '12px',
  margin: '24px',
  marginRight: 0,
  backgroundColor: '#fff',
};

const useStyle = createStyles({
  'content-item-style': {
    height: 'calc(100% - 48px)',
    margin: '24px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  'rule-name-search-input': {
    marginBottom: '10px',
  },
  'current-selected-item': {
    color: '#0052D9',
    backgroundColor: '#e6f0fc!important',
  },
  'item-rule-name-style': {
    cursor: 'pointer',
    lineHeight: '32px',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '4px',
    marginBottom: '4px',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: '#e2e2e2',
    }
  },
  'custom-rules-table': {
    flex: 1,
    '.ant-spin-nested-loading': {
      height: '100%',
    },
    '.ant-spin-container': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    '.ant-table': {
      flex: 1
    },
    '.ant-table-pagination': {
      marginBottom: '0!important',
    },
    '.ant-pagination-total-text': {
      flex: 1,
      textAlign: 'left',
    }
  }
})

const DataQuality: React.FC = () => {
  console.log('数据质量')

  const {styles} = useStyle()

  const mockRulesValue = [
    {
      label: '空值校验',
      value: '0'
    },
    {
      label: '唯一值校验',
      value: '1'
    },
    {
      label: '重复值校验',
      value: '2'
    }
  ]

  // const [loading, setLoading] = useState(false);
  const [activeRuleName, setActiveRuleName] = useState('');
  // let activeRuleName: string
  // {
  //   rule: activeRuleName
  // }
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const nav = useNavigate()
  console.log('pathname', pathname)
  const [currentRowId, setCurrentRowId] = useState<string>('');
  const [inputRulesValue, setInputRulesValue] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [ruleNameLists, setRuleNameLists] = useState<RuleNameListsType[]>([])
  const [tableData, setTableData] = useState<DataType[]>([
    {
      key: '1',
      ruleName: 'John Brown',
      ruleDescription: 'New York No. 1 Lake Park',
      createTime: '2023-07-02 10:12:30',
      enabledStatus: true
    },
    {
      key: '2',
      ruleName: 'Jim Green',
      ruleDescription: 'London No. 1 Lake Park',
      createTime: '2023-07-02 10:12:30',
      enabledStatus: false
    },
    {
      key: '3',
      ruleName: 'Joe Black',
      ruleDescription: 'Sydney No. 1 Lake Park',
      createTime: '2023-07-02 10:12:30',
      enabledStatus: true
    },
  ]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [thresholdTypeOptions, setThresholdTypeOptions] = useState<Array<optionsType>>([])
  const [expressionOptions, setExpressionOptions] = useState<Array<optionsType>>([])

  const columns: ColumnsType<DataType> = [
    {
      title: '规则名称',
      dataIndex: 'ruleName',
      key: 'ruleName',
    },
    {
      title: '规则描述',
      dataIndex: 'ruleDescription',
      key: 'ruleDescription',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '启用状态',
      dataIndex: 'enabledStatus',
      key: 'enabledStatus',
      render: (_, arg) => (
        <>
          {/* checked={arg.enabledStatus} */}
          <Switch defaultChecked={arg.enabledStatus} onClick={() => changeStatus(arg)} />
        </>  
      ),
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, {key}) => (
        <Button type="link" onClick={() => showDrawer(key)}>编辑</Button>
      ),
    },
  ];

  useEffect(
    () => {
      console.log('useEffect ------')
      setRuleNameLists(mockRulesValue)
      // TODO: 初次获取规则名称列表之后，默认选中第一个规则名称
      // handleClickRule(res[0].value)
      handleClickRule(mockRulesValue[0].value)
    }, []
  )

  useEffect(() => {
    console.log('useEffect ++++++++++', currentRowId)

    // TODO: 接口获取API，抽屉接口：currentRowId

    setInitialData({
      ruleName: "11",
      ruleDescription: 'sasa',
      thresholdType: "1",
      expression: "1",
      thresholdSize: undefined,
    })

    setThresholdTypeOptions([
      {
        label: '固定值1',
        value: '1'
      },
      {
        label: '固定值2',
        value: '2'
      }
    ])

    setExpressionOptions([
      {
        label: '等于1',
        value: '1'
      },
      {
        label: '大于2',
        value: '2'
      },
      {
        label: '小于3',
        value: '3'
      }
    ])
  }, [currentRowId])

  const fetch = (value: string) => {
    console.log('fetch', value, searchParams.get('ruleName'))
    
    userList(1, 20, 500)
  };


  // 搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`handleSearch`, e, e.target)
    setInputValue(e.target.value)
    // TODO: 搜索API
    setRuleNameLists(mockRulesValue)
  };

  // 点击规则
  const handleClickRule = (val: string) => {
    console.log('点击规则', val) 
    // activeRuleName = val
    setActiveRuleName(val)

    searchParams.set('ruleName', val)

    nav({
      pathname,
      search: searchParams.toString()
    })
  }

  // 搜索规则名称
  const handleRulesSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`搜索规则`, e, e.target)
    setInputRulesValue(e.target.value)
    fetch(e.target.value);
  }

  // 更改启用状态
  const changeStatus = (value: DataType) => {
    // value.enabledStatus = !value.enabledStatus
    console.log('---', value);
    // TODO: 使用 !value 去获取接口。然后刷新列表
  };

  // TODO: 获取页面表格数据API
  const userList = (current: number, pageSize: number, timeLimit: number) => {
    console.log('----', current, pageSize, timeLimit, searchParams.get('ruleName'))

    // TODO: 接口请求
    // const { data, loading, run } = useRequest(getSearchList, {
    //   debounceWait: timeLimit,
    //   manual: true,
    // });  

    return {
      total: 30,
      list: []
    }
  };

  async function getUserList(params: {
    current: number;
    pageSize: 10;
  }): Promise<{ total: number; list: DataType[] }> {
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

  const changeNumber = (value: number) => {
    form.setFieldValue('thresholdSize', value)
    console.log('changed', value);
  };

  const showDrawer = (val: string) => {
    console.log('点击编辑', val);
    setOpen(true);
    setCurrentRowId(val);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('取消')
    setOpen(false);
  }

  const handleSubmit = () => {
    console.log('提交', currentRowId)
    form.submit();
    // TODO: 提交的接口：currentRowId
  }

  const handleFinish = () => {
    console.log('handleFinish')
    // setLoading(true);
    setTimeout(() => {
      // setLoading(false);
      console.log('form.getFieldsValue()', form.getFieldsValue())
      if (form.getFieldsValue()) {
        console.log('😁')
        setOpen(false);

        // TODO: 编辑成功之后，刷新列表，API接口
      }
    }, 1000);
  };

  return (
    <>
      <Layout className="h-[100vh]">
        <Sider style={siderStyle}>
          <div>
            <Input
              className={styles['rule-name-search-input']}
              prefix={<SearchOutlined />}
              placeholder="请输入关键字"
              value={inputValue}
              onChange={handleSearch}
            />
          </div>
          <div>
            {
              ruleNameLists.map((item) => (
                <p className={
                  cx({
                    [styles['current-selected-item']]: activeRuleName === item.value,
                    [styles['item-rule-name-style']]: true
                  })} onClick={() => handleClickRule(item.value)} key={item.value}>{item.label}</p>  
              ))
            }
          </div>
        </Sider>
        <Content style={contentStyle}>
          <div className={styles['content-item-style']}>
            <div className="flex mb-[16px] justify-end">
              <Input
                className="w-[300px]"
                prefix={<SearchOutlined />}
                placeholder="请输入规则名称或描述"
                value={inputRulesValue}
                onChange={handleRulesSearch}
              />
            </div>
            {/* TODO: 更新：dataSource={data.list} */}
            {/* dataSource={data.list} */}
              <Table className={ styles['custom-rules-table'] } columns={columns} dataSource={tableData} pagination={paginationConfig} />
            <Drawer
              title="编辑规则"
              width={500}
              onClose={onClose}
              open={open}
              destroyOnClose={true}
              styles={{
                body: {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                },
              }}
              >
              <Form layout="horizontal" form={form} labelCol={{ span: 5 }} initialValues={initialData} onFinish={handleFinish} preserve={false}>
                <Row gutter={16}> 
                  <Col span={24}>
                    <Form.Item
                      name="ruleName"
                      label="规则名称"
                      rules={[{ required: true}]}
                    >
                      <Input placeholder="请输入" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="ruleDescription"
                      label="规则描述"
                      rules={[{ required: true}]}
                    >
                      <Input.TextArea
                        placeholder="请输入"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="thresholdType"
                      label="阈值类型"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="请选择" options={thresholdTypeOptions} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="expression"
                      label="表达式"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="请选择" options={expressionOptions}>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      name="thresholdSize"
                      label="阈值大小"
                      rules={[{ required: true }]}
                    >
                        <div>
                          {/* onChange={changeNumber} onStep={changeNumber}  */}
                          <InputNumber
                            min={0}
                            onChange={changeNumber}
                          />
                        <span className="ml-[4px]">行</span>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div className="text-right">
                <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
                  取消
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                  提交
                </Button>
              </div>
            </Drawer>
          </div>
        </Content>
      </Layout>
    </>  
  )
}

export default DataQuality