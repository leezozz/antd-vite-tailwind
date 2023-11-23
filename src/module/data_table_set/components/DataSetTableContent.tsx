import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import {
  type SelectProps,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";

const useStyle = createStyles({
  'select-column-type': {
    '.ant-select-selector': {
      color: '#3A86EF'
    },
    '.ant-select-arrow': {
      color: '#3A86EF'
    },
  },
  'data-set-table': {
    '.ant-table-thead': {
      'th': {
        padding: '6px 12px!important'
      }
    },
  }
})

const DataSetTableContent: React.FC = () => {
  const { styles } = useStyle()
  const [form] = Form.useForm();
  const [locationOptions, setLocationOptions] = useState<
    SelectProps["options"]
  >([]);
  const [typeOptions, setTypeOptions] = useState<SelectProps["options"]>([]);
  const [selected, setSelected] = useState();
  const [editItem, seteditItem] = useState("");

  useEffect(() => {
    setLocationOptions([
      {
        label: "根目录",
        value: "old",
      },
      {
        label: "父目录",
        value: "parent",
      },
    ]);

    setTypeOptions([
      { value: "#", label: "# 数值" },
      { value: "T", label: "T 字符" },
      { value: "D", label: "D 日期" },
      { value: "T/F", label: "T/F 布尔值" },
    ]);

    form.setFieldsValue({
      data_name: "",
      show_name: "毛利日均-Sheet1",
      location_directory: "",
      notes: "",
    });
  }, [form]);

  const columnsData = [
    {
      title: "订单ID",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "产品ID产品ID产品ID产品ID产品ID产品ID产品ID产品ID",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "实测",
      dataIndex: "test",
      key: "test",
    },
    {
      title: "总计",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "car",
      dataIndex: "car",
      key: "car",
    },
    {
      title: "All",
      dataIndex: "all",
      key: "all",
    },
  ];

  const dataSource = [
    {
      key: "1",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "2",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "3",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "4",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "5",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "6",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "7",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "8",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "9",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "10",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "11",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "12",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
    {
      key: "13",
      order: "4727197191846",
      product: 217,
      test: "217",
      total: "2356",
      tax: "217",
      car: "667",
      all: "674",
    },
  ];

  const handleInput = (e) => {
    console.log("input", e, e.target.value);
  };

  const columns = columnsData.map((columnItem, index) => {
    console.log(columnItem, index);
    return {
      title: (
        <>
          <div className="flex items-center">
            {/* style={{ width: 70 }} */}
            <Select
              className={styles['select-column-type']}
              defaultValue="#"
              bordered={false}
              optionLabelProp="value"
              popupMatchSelectWidth={false}
              options={typeOptions}
              onChange={(value: string) => setSelected(value)}
            >
              {selected}
            </Select>
            {!(editItem === columnItem.key) ? (
              <div className="flex justify-between">
                <Tooltip title={columnItem.title} placement="topLeft">
                  <span
                    style={{
                      width: 70,
                      display: "inline-block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                    }}
                  >
                    {columnItem.title}
                  </span>
                </Tooltip>
                <EditOutlined
                  className="cursor-pointer"
                  onClick={() => seteditItem(columnItem.key)}
                />
              </div>
            ) : (
              <>
                <Input
                  suffix={<CheckOutlined />}
                  className="w-[110px]"
                  defaultValue={columnItem.title}
                  onChange={handleInput}
                />
              </>
            )}
          </div>
        </>
      ),
      dataIndex: columnItem.dataIndex,
      key: columnItem.key,
    };
  });

  return (
    <>
      <div className="m-[16px]">
        <Form
          name="dataSetForm"
          form={form}
          autoComplete="off"
          labelAlign="right"
        >
          <Row>
            <Col span={8}>
              <Form.Item
                label="数据表名"
                name="data_name"
                rules={[{ required: true, message: "请输入数据表名" }]}
                style={{ marginRight: 16 }}
                labelCol={{
                  style: { width: 100 },
                }}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="展示名称"
                name="show_name"
                style={{ marginRight: 16 }}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="位置目录" name="location_directory">
                <Select placeholder="请选择" options={locationOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="备注"
                name="notes"
                labelCol={{
                  style: { width: 100 },
                }}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* TODO: table样式 */}
        <div className="h-full w-full">
          <Table
            className={styles['data-set-table']}
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};
export default DataSetTableContent;
