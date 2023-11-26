import { Button } from "antd";
import { createStyles } from "antd-style";
import DataTableSet from "./DataSetTable";
import { useRef } from "react";

interface Props {
  children?: React.ReactElement;
}

const useStyle = createStyles({
  "data-set--page-layout": {
    height: "100%",
    padding: "16px",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.08)",
    backgroundColor: "#f3f5f7",
  },
});

const DataSetTablePage: React.FC<Props> = (props) => {
  console.log("---");
  const { styles } = useStyle();
  const dataTableSetRef = useRef(null);

  const handleClick = async () => {
    console.log(
      "下一步",
      // dataTableSetRef,
      dataTableSetRef?.current?.form(),
      await dataTableSetRef?.current?.form()?.validate,
    );
  };

  return (
    <>
      <div className={styles["data-set--page-layout"]}>
        <DataTableSet ref={dataTableSetRef} />
        <div
          className="flex h-[64px] items-center justify-center bg-[#fff]"
          style={{ borderTop: "1px solid #DEE2EA" }}
        >
          <Button className="mr-[24px]">上一步</Button>
          <Button type="primary" onClick={handleClick}>
            下一步
          </Button>
        </div>
      </div>
    </>
  );
};
export default DataSetTablePage;
