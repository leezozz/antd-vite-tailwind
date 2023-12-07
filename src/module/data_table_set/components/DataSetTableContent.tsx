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
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

interface Field {
  key: string;
  data_type: string;
  new_field_name: string;
  old_field_name: string;
}

const useStyle = createStyles({
  "select-column-type": {
    ".ant-select-selector": {
      color: "#3A86EF",
    },
    ".ant-select-arrow": {
      color: "#3A86EF",
    },
  },
  "data-set-table": {
    height: "calc(100% - 112px)",
    overflow: "auto",
    ".ant-table-thead": {
      th: {
        padding: "6px 12px!important",
      },
    },
  },
});

const DataSetTableContent = (props, ref) => {
  const { styles } = useStyle();
  const [form] = Form.useForm();
  const [locationOptions, setLocationOptions] = useState<
    SelectProps["options"]
  >([]);
  const [typeOptions, setTypeOptions] = useState<SelectProps["options"]>([]);
  const [editItem, seteditItem] = useState("");
  const [columnsData, setColumnsData] = useState<Field[]>([]);
  console.log('更新')

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
      { value: "Float32", label: "#", desc: "数值" },
      { value: "String", label: "T", desc: "字符" },
      { value: "Datetime", label: "D", desc: "日期" },
      { value: "UInt8", label: "T/F", desc: "布尔值" },
    ]);

    setColumnsData([
      {
        key: "order",
        data_type: "String",
        new_field_name: "order",
        old_field_name: "order",
      },
      {
        key: "product",
        data_type: "String",
        new_field_name: "product",
        old_field_name: "product",
      },
      {
        key: "test",
        data_type: "String",
        new_field_name: "test",
        old_field_name: "test",
      },
      {
        key: "total",
        data_type: "String",
        new_field_name: "total",
        old_field_name: "total",
      },
      {
        key: "tax",
        data_type: "String",
        new_field_name: "tax",
        old_field_name: "tax",
      },
      {
        key: "car",
        data_type: "String",
        new_field_name: "car",
        old_field_name: "car",
      },
      {
        key: "all",
        data_type: "String",
        new_field_name: "all",
        old_field_name: "all",
      },
    ]);

    form.setFieldsValue({
      data_name: "",
      show_name: "毛利日均-Sheet1",
      location_directory: "",
      notes: "",
    });
  }, [form]);

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

  const formValidate = () => {
    console.log("form 校验");
    const submitRes = async () => {
      try {
        await form.validateFields();
        return true;
      } catch (error) {
        return false;
      }
    };
    return {
      validate: submitRes(),
      formValue: form.getFieldsValue(),
      // TODO: 表头修改数据
      headerData: "test",
    };
  };

  useImperativeHandle(ref, () => ({
    formValidate,
  }));


  let newColumn: Field[] = columnsData
  let curIptValue = ''
  const handleInput = (value: string, key: string, title: string) => {
    console.log("input", value, key, title);
    curIptValue = value
    // const newColumn = columnsData.map((item: Field) => {
    //   const newTitle = item.key === key ? value : item.new_field_name;
    //   return {
    //     ...item,
    //     title: newTitle,
    //   };
    // });
    // console.log("newColumn", newColumn);
    // setColumnsData(newColumn);
  };

  const handleBlur = (key: string) => {
    console.log("blur");
    seteditItem("");

    newColumn = columnsData.map((item: Field) => {
      const uniqueKey = (item.key === key)
      const newTitle = (uniqueKey && curIptValue) ? curIptValue : item.new_field_name;
      // if (newTitle !== item.new_field_name) {
      //   setChangeTable({
      //     ...changeTable,
      //     [item?.field_name]: {
      //       new_field_name: newTitle,
      //       data_type: item.data_type,
      //     }
      //   })
      // }

      return {
        ...item,
        new_field_name: newTitle,
      };
    });

    setColumnsData(newColumn);
  };

  const hangleChange = (value, item) => {
    console.log("---", value, item);
  };

  const columns = columnsData.map((columnItem, index) => {
    console.log('表头更新了吗 test---')
    return {
      title: (
        <>
          <div className="flex items-center">
            <Select
              className={styles["select-column-type"]}
              defaultValue="#"
              bordered={false}
              optionLabelProp="label"
              options={typeOptions}
              popupMatchSelectWidth={false}
              onChange={(value) => hangleChange(value, columnItem)}
            />
            {!(editItem === columnItem.new_field_name) ? (
              <div className="flex justify-between">
                <Tooltip title={columnItem.new_field_name} placement="topLeft">
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
                    {columnItem.new_field_name}
                  </span>
                </Tooltip>
                <EditOutlined
                  className="cursor-pointer"
                  onClick={() => seteditItem(columnItem.new_field_name)}
                />
              </div>
            ) : (
              <>
                <Input
                  suffix={<CheckOutlined />}
                  className="w-[110px]"
                  defaultValue={columnItem.new_field_name}
                  onChange={(e) =>
                    handleInput(
                      e.target.value,
                      columnItem.new_field_name,
                      columnItem.new_field_name,
                    )
                  }
                  onBlur={() => handleBlur(columnItem.key,)}
                />
              </>
            )}
          </div>
        </>
      ),
      dataIndex: columnItem.key,
      key: columnItem.key,
    };
  });

  return (
    <>
      <div className="m-[16px] h-[calc(100%-32px)]">
        <Form
          name="dataSetForm"
          form={form}
          autoComplete="off"
          labelAlign="right"
          className="overflow-y-auto"
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
        <Table
          className={styles["data-set-table"]}
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />
      </div>
    </>
  );
};
export default forwardRef(DataSetTableContent);
