import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { type InputRef, Input, Select, Table, Tooltip } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useRef, useState } from "react";

interface Field {
  key: string;
  data_type: string;
  new_field_name: string;
}

interface ResField {
  key: string;
  new_field_name: string;
  data_type: string;
}

type Body = Record<string, string | number>;
type ChangeData = Record<string, ResField>;

interface Props {
  value: unknown;
  onChange: (value: any) => void;
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

const CustomTable: React.FC<Props> = ({ value, onChange }) => {
  const { styles } = useStyle();
  const typeOptions = [
    { value: "Float32", label: "#", desc: "数值" },
    { value: "String", label: "T", desc: "字符" },
    { value: "Datetime", label: "D", desc: "日期" },
    { value: "UInt8", label: "T/F", desc: "布尔值" },
  ];
  const [editItem, setEditItem] = useState("");
  const [columnsData, setColumnsData] = useState<Field[]>([]);
  const [dataSource, setDataSource] = useState<Body[]>([]);
  const inputRef = useRef<InputRef>(null);
  // 记录改变的值。不需要每次更新渲染，使用useRef
  const changeTableData = useRef<ChangeData>({});

  console.log("更新 🌛", value, onChange);

  useEffect(() => {
    console.log("useEffct更新");
    setColumnsData([
      {
        key: "order",
        data_type: "String",
        new_field_name: "order"
      },
      {
        key: "product",
        data_type: "String",
        new_field_name: "product"
      },
      {
        key: "test",
        data_type: "String",
        new_field_name: "test"
      },
      {
        key: "total",
        data_type: "String",
        new_field_name: "total"
      },
      {
        key: "tax",
        data_type: "String",
        new_field_name: "tax"
      },
      {
        key: "car",
        data_type: "String",
        new_field_name: "car"
      },
      {
        key: "all",
        data_type: "String",
        new_field_name: "all"
      },
    ]);

    setDataSource([
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
    ]);
  }, []);

  const columns = columnsData.map((columnItem, index) => {
    console.log("表头更新了吗 test---+++", columnItem, index, changeTableData);

    const curEditItem = columnItem.key === editItem;
    // 重点：渲染的时候，修改过的数据优先级 > 原始的数据
    const currentItem = changeTableData.current[columnItem.key] || columnItem;

    // console.log("currentItem----------------------", currentItem);

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
              onChange={(value) => {
                changeTableData.current[columnItem.key] = {
                  ...columnItem,
                  data_type: value,
                };
                onChange(changeTableData.current);
              }}
            />
            {curEditItem && (
              <>
                <Input
                  ref={inputRef}
                  suffix={<CheckOutlined />}
                  className="w-[110px]"
                  defaultValue={currentItem.new_field_name}
                  onChange={(e) => {
                    if (e.target.value) {
                      changeTableData.current[columnItem.key] = {
                        ...columnItem,
                        new_field_name: e.target.value,
                      };
                    }
                  }}
                  onPressEnter={() => {
                    setEditItem("");
                    onChange(changeTableData.current);
                  }}
                />
              </>
            )}
            {!curEditItem && (
              <div className="flex justify-between">
                <Tooltip title={currentItem.new_field_name} placement="topLeft">
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
                    {currentItem.new_field_name}
                  </span>
                </Tooltip>
                <EditOutlined
                  className="cursor-pointer"
                  onClick={() => {
                    setEditItem(columnItem.key);
                    setTimeout(() => {
                      inputRef.current?.focus({
                        cursor: "end",
                      });
                    });
                  }}
                />
              </div>
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
      <Table
        className={styles["data-set-table"]}
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
    </>
  );
};
export default CustomTable;
