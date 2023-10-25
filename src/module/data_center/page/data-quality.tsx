import React, { useEffect, useState } from "react"
import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Layout, Row, Select, Space, Switch, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from "@ant-design/icons";
import { usePagination } from "ahooks";

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

const { Header, Footer, Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
};

const DataQuality: React.FC = ({ id }) => {
  console.log('数据质量', id)

  // const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
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
      render: () => (
        <Button type="link" onClick={showDrawer}>编辑</Button>
      ),
    },
  ];

  useEffect(() => {
    console.log('useEffect')

    // TODO: 接口获取API

    setInitialData({
      ruleName: "11",
      ruleDescription: 'sasa',
      thresholdType: "1",
      expression: "2",
      thresholdSize: undefined,
    })

    setThresholdTypeOptions([
      {
        label: '固定值',
        value: '1'
      },
      {
        label: '固定值1',
        value: '2'
      }
    ])

    setExpressionOptions([
      {
        label: '等于',
        value: '1'
      },
      {
        label: '大于',
        value: '2'
      },
      {
        label: '小于',
        value: '3'
      }
    ])
  }, [id])

  const fetch = (value: string) => {
    console.log('fetch', value)
    
    userList(1, 20, 500)
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`handleSearch`, e, e.target)
    setInputValue(e.target.value)
    fetch(e.target.value);
  };

  // 更改启用状态
  const changeStatus = (value: DataType) => {
    // value.enabledStatus = !value.enabledStatus
    console.log('---', value);
    // TODO: 使用 !value 去获取接口。然后刷新列表
  };

  // TODO: 获取页面表格数据API
  const userList = (current: number, pageSize: number, timeLimit: number) => {
    console.log('----', current, pageSize, timeLimit)

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
    console.log('changed', value);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('取消')
    setOpen(false);
  }

  const handleSubmit = () => {
    console.log('提交')
    form.submit();
    // TODO: 提交的接口
  }

  const handleFinish = () => {
    console.log('handleFinish')
    // setLoading(true);
    setTimeout(() => {
      // setLoading(false);
      console.log('form.getFieldsValue()', form.getFieldsValue())
      if (form.getFieldsValue()) {
        console.log('😁')
      }
    }, 1000);
  };

  return (
    <>
      <Layout>
        <Sider style={siderStyle}>Sider</Sider>
        <Layout>
          <Content style={contentStyle}>
          <div className="m-[24px] p-[24px] bg-white">
            <div className="flex my-[16px] justify-end">
              <Input
                className="w-[300px]"
                prefix={<SearchOutlined />}
                placeholder="请输入规则名称或描述"
                value={inputValue}
                onChange={handleSearch}
              />
            </div>
            {/* dataSource={data.list} */}
            <Table columns={columns} dataSource={tableData} pagination={paginationConfig} />
            <Drawer
              title="编辑规则"
              width={500}
              onClose={onClose}
              open={open}
              destroyOnClose
              styles={{
                body: {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                },
              }}
            >
              <Form layout="horizontal" form={form} labelCol={{ span: 4 }} initialValues={initialData} onFinish={handleFinish}>
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
                        <InputNumber min={0} onChange={() => changeNumber} />
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
      </Layout>
    </>  
  )
}

export default DataQuality