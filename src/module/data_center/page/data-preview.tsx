import {
  Button,
  ConfigProvider,
  Dropdown,
  Form,
  MenuProps,
  Modal,
  Table,
} from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { usePagination } from "ahooks";
import { createStyles, cx } from "antd-style";
import { CloseOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import CustomSplitNewForm, {
  FieldNewType,
} from "../component/CustomSplitNewForm";
import CustomMergeForm from "../component/CustomMergeForm";

interface UserListItem {
  id: string;
  ruleName: string;
  ruleDescription: string;
  createTime: string;
  enabledStatus: boolean;
}

interface ColumnsType {
  title: string | JSX.Element;
  dataIndex: string;
  key: string;
}

const useStyle = createStyles({
  "my-modal-content": {
    padding: "0 !important",
  },
  "custom-rules-table": {
    ".ant-table-pagination": {
      marginBottom: "0!important",
    },
    ".ant-pagination-total-text": {
      flex: 1,
      textAlign: "left",
    },
    ".ant-pagination-options-quick-jumper": {
      marginInlineStart: "12px",
    },
  },
  "custom-member-management-modal": {
    ".ant-modal-confirm-paragraph": {
      maxWidth: "100%",
    },
  },
});

/**
 * 数据治理---数据预览
 * @returns
 */
const DataGovernancePreview: React.FC = () => {
  const { styles } = useStyle();
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const classNames = {
    content: styles["my-modal-content"],
  };

  const [columns, setColumns] = useState<Array<ColumnsType>>([]);

  const getDataPreviewTable = async (params: {
    current: number;
    pageSize: number;
    sideId: string; // 选中侧边栏id（传进来或者路由上取）
  }): Promise<{ total: number; list: UserListItem[] }> => {
    console.log("走api", params);

    // TODO: 获取表格接口
    // const { error, data } = await SharedApi.addMember()

    return new Promise((resolve) => {
      resolve({
        total: 100 || 0,
        list:
          [
            {
              id: "1",
              ruleName: "John Brown",
              ruleDescription: "New York No. 1 Lake Park",
              createTime: "2023-07-02 10:12:30",
              enabledStatus: Math.random() > 0.5 ? true : false,
            },
            {
              id: "2",
              ruleName: "Jim Green",
              ruleDescription: "London No. 1 Lake Park",
              createTime: "2023-07-02 10:12:30",
              enabledStatus: Math.random() > 0.5 ? true : false,
            },
            {
              id: "3",
              ruleName: "Joe Black",
              ruleDescription: "Sydney No. 1 Lake Park",
              createTime: "2023-07-02 10:12:30",
              enabledStatus: Math.random() > 0.5 ? true : false,
            },
          ] || [],
      });
    });
  };

  const { data, loading, pagination } = usePagination(getDataPreviewTable, {
    defaultPageSize: 20,
    // refreshDeps: [sideId]
  });

  const paginationConfig = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共${total}条`,
    onChange: pagination.onChange,
  };

  useEffect(() => {
    const mockColumn = [
      {
        title: "规则名称",
        dataIndex: "ruleName",
        key: "ruleName",
      },
      {
        title: "规则描述",
        dataIndex: "ruleDescription",
        key: "ruleDescription",
      },
    ];

    const handleSplitClick = (item?: any) => {
      console.log("handleSplitClick", item);

      const handleFinished = (value: FieldNewType) => {
        console.log("handleFinished", value);
        destroy();
      };

      const { destroy } = modal.info({
        className: styles["custom-member-management-modal"],
        title: (
          <div className="flex justify-between border-0 border-b-[1px] border-solid border-slate-200 px-6">
            <p>拆分字段</p>
            <CloseOutlined onClick={() => destroy()} />
          </div>
        ),
        footer: null,
        width: 600,
        // 使用 shouldUpdate属性 部分更新form表单
        // content: <CustomSplitForm onClosed={() => destroy()} />,
        // 使用 hideen属性 部分显示form表单
        content: (
          <CustomSplitNewForm
            form={form}
            onClosed={() => destroy()}
            onFinished={handleFinished}
          />
        ),
        icon: <></>,
      });
    };

    const handleMergeClick = (item?: any) => {
      console.log("handleMergeClick---", item);

      const { destroy } = modal.info({
        className: styles["custom-member-management-modal"],
        title: (
          <div className="flex justify-between border-0 border-b-[1px] border-solid border-slate-200 px-6">
            <p>合并字段</p>
            <CloseOutlined onClick={() => destroy()} />
          </div>
        ),
        footer: null,
        width: 600,
        content: <CustomMergeForm onClosed={() => destroy()} />,
        icon: <></>,
      });
    };

    console.log("更新表头", mockColumn);

    const getItems = (item: any) => {
      console.log("getItems", item);
      return [
        {
          key: "1",
          label: (
            <a className="px-[30px]" onClick={() => handleSplitClick(item)}>
              拆分
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a className="px-[30px]" onClick={() => handleMergeClick(item)}>
              合并
            </a>
          ),
        },
      ];
    };

    // 这里处理表头的render，添加icon
    const newColumns = mockColumn.map((item) => {
      return {
        ...item,
        title: () => {
          return (
            <>
              <div className="flex justify-between">
                <span>{item.title}</span>
                <Dropdown
                  menu={{ theme: "light", items: getItems(item) }}
                  placement="bottom"
                >
                  <MoreOutlined className="cursor-pointer" />
                </Dropdown>
              </div>
            </>
          );
        },
      };
    });
    setColumns(newColumns);
  }, [form, modal, styles]);

  const handleClick = () => {
    console.log("质量检测");
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="mb-[16px]"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleClick}
        >
          质量检测
        </Button>
      </div>
      <div className="h-[calc(100%-48px)]">
        {/* dataSource={tableData} */}
        <Table
          className={cx({
            "table-list-full-container": true,
            [styles["custom-rules-table"]]: true,
          })}
          rowKey="id"
          loading={loading}
          dataSource={data?.list}
          columns={columns}
          pagination={paginationConfig}
        />
      </div>
      <ConfigProvider
        modal={{
          classNames,
        }}
      >
        <div>{contextHolder}</div>
      </ConfigProvider>
    </>
  );
};
export default DataGovernancePreview;
