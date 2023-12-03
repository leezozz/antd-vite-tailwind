import { CloseOutlined } from "@ant-design/icons";
import AssociationCreateModal from "../components/AssociationCreateModal";
import { Button, Modal, Menu, ConfigProvider } from "antd";
import { createStyles } from "antd-style";
import DataSetTableContent from "../components/DataSetTableContent";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type MenuType = {
  file_id: string;
  file_name: string;
  sheet: MenuType[];
};

type StandardType = {
  key: string;
  label: string;
  children: StandardType[] | undefined;
};

const useStyle = createStyles({
  "data-set-modal-container": {
    ".ant-modal-content": {
      padding: 0,
    },
    ".ant-modal-confirm-paragraph": {
      maxWidth: "100%",
    },
  },
  "data-set-container": {
    backgroundColor: "#fff",
  },
  "data-set-box": {
    display: "flex",
    width: "100%",
    height: "calc(100vh - 97px)",
  },
  "data-table-left": {
    width: "324px",
    minWidth: "324px",
    borderRight: "1px solid #DEE2EA",
  },
  "side-navbar-menu-box": {
    ".ant-menu": {
      borderInlineEnd: "none !important",
      background: "#ffffff !important",
    },
    // 分组标题样式
    ".ant-menu-submenu-title": {
      fontWeight: 600,
    },
    ".ant-menu-vertical-right": {
      borderRight: "none",
    },
  },
  "data-table-container": {
    width: "calc(100% - 324px)",
  },
});

const DataTableSet = (props: any, ref) => {
  const { styles } = useStyle();
  const [modal, contextHolder] = Modal.useModal();
  const [defaultKey, setDefaultKey] = useState("");
  const [defaultOpenKey, setDefaultOpenKey] = useState<string[]>([]);
  const setTableRef = useRef(null);

  const valiData = () => {
    console.log("子组件的校验方法---");
  };

  useImperativeHandle(ref, () => ({
    valiData,
    form: setTableRef?.current?.formValidate,
  }));

  const menuItems = [
    {
      file_name: "菜单1",
      file_id: "1",
      sheet: [
        {
          file_name: "菜单1-1",
          file_id: "1-1",
        },
        {
          file_name:
            "菜单1-2菜单1-2菜单1-2菜单1-2菜单1-2菜单1-2菜单1-2菜单1-2菜单1-2",
          file_id: "1-2",
          sheet: [
            {
              file_name: "菜单1-2-1",
              file_id: "1-2-1",
            },
          ],
        },
        {
          file_name: "菜单1-3",
          file_id: "1-3",
        },
      ],
    },
  ];

  const convertData = (menuItems: MenuType[]): StandardType[] => {
    return menuItems.map((item: MenuType) => {
      return {
        key: item.file_id,
        label: item.file_name,
        children: item.sheet ? convertData(item.sheet) : undefined,
      };
    });
  };

  console.log("😈", convertData(menuItems));

  useEffect(() => {
    console.log("---useEffect");
    setDefaultKey("1-1");
    setDefaultOpenKey(["1"]);
  }, []);

  const handleSelect = ({ key }: { key: string }) => {
    console.log("key", key);
    setDefaultKey(key);
  };

  const handleOpenChange = (openKeys: string[]) => {
    console.log("openKeys", openKeys);
    setDefaultOpenKey(openKeys);
  };

  const showAssociateCreateModal = () => {
    const formData = {};

    const onFinished = async (value: any) => {
      console.log("value", value);
      // 刷新列表api
    };

    const { destroy } = modal.info({
      title: (
        <div className="flex justify-between border-0 border-b-[1px] border-solid border-slate-200 px-6">
          <p>关联创建</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      className: styles["data-set-modal-container"],
      footer: null,
      width: 562,
      content: (
        <AssociationCreateModal
          formData={formData}
          onFinish={onFinished}
          onClosed={() => destroy()}
        />
      ),
      icon: <></>,
    });
  };

  return (
    <>
      <div className={styles["data-set-container"]}>
        <div className={styles["data-set-box"]}>
          <div className={styles["data-table-left"]}>
            <div
              className="flex items-center justify-between px-[16px] py-[12px]"
              style={{ borderBottom: "1px solid #DEE2EA" }}
            >
              <span className="c-[#303133] font-500 text-[16px]">数据表</span>
              <Button onClick={showAssociateCreateModal}>关联创建数据表</Button>
            </div>
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    /* here is your component tokens */
                    activeBarBorderWidth: 0,
                    activeBarHeight: 0,
                    activeBarWidth: 0,
                    itemHeight: 36,
                    itemMarginInline: 16,
                    itemHoverBg: "#EFF1F4",
                  },
                },
              }}
            >
              <Menu
                className={styles["side-navbar-menu-box"]}
                selectedKeys={[defaultKey]}
                openKeys={defaultOpenKey}
                mode="inline"
                items={convertData(menuItems)}
                onSelect={handleSelect}
                onOpenChange={handleOpenChange}
              />
            </ConfigProvider>
          </div>
          <div className={styles["data-table-container"]}>
            <DataSetTableContent ref={setTableRef} />
          </div>
          {contextHolder}
        </div>
      </div>
    </>
  );
};
export default forwardRef(DataTableSet);
