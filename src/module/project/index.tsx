import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Table,
  Layout,
  DatePicker,
  Select,
  Divider,
  Modal,
  ConfigProvider,
} from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  DatabaseOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const { Header, Content } = Layout;
import { useAntdTable, useSize, useThrottleFn } from "ahooks";
import generateProjectList from "../../mock/project";
import type { ColumnsType } from "antd/es/table";
import type { Dayjs } from "dayjs";
import { createStyles } from "antd-style";
import ProjectCreateForm, {CreateFormData} from "./components/ProjectCreateForm";
import MemberConfigForm from "./components/MemberConfigForm";

type ProjectStatus = "1" | "2" | "3";
interface Project {
  id: string;
  name: string;
  director: string;
  time: Date;
  status: ProjectStatus;
}

interface Result {
  total: number;
  list: Project[];
}

interface SearchProps {
  current: number;
  pageSize: number;
}

interface FormData {
  name?: string;
  time?: [Dayjs, Dayjs];
  status?: ProjectStatus | "";
}

const { RangePicker } = DatePicker;
const { Option } = Select;
const projectList: Project[] = generateProjectList(500);

dayjs.extend(isBetween);

const getTableData = (
  { current, pageSize }: SearchProps,
  formData: FormData,
): Promise<Result> => {
  const { name, time, status } = formData;

  const filteredList = projectList.filter((item) => {
    const { time: itemTime, status: itemStatus } = item;
    const isNamePassed = name ? item.name.includes(name) : true;
    const isTimePassed = time
      ? dayjs(itemTime).isBetween(time[0], time[1])
      : true;
    const isStatusPassed = status ? itemStatus === status : true;
    return isNamePassed && isTimePassed && isStatusPassed;
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        total: filteredList.length,
        list: filteredList.slice((current - 1) * pageSize, current * pageSize),
      });
    }, 400);
  });
};

const cardClassName = "bg-white pt-6 px-6 rounded-lg shadow";

const useStyle = createStyles(() => ({
  "my-modal-content": {
    padding: "0 !important",
  },
  'custom-member-management-modal': {
    '.ant-modal-confirm-paragraph': {
      maxWidth: '100%',
    }
  }
}));

const ProjectListPage = () => {
  const [form] = Form.useForm();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const contentSize = useSize(contentRef);
  const { styles } = useStyle();
  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 20,
    form,
  });
  const scrollValue = useMemo(
    () => ({
      y: (contentSize?.height ?? 200) - 160,
      scrollToFirstRowOnChange: true,
    }),
    [contentSize?.height],
  );
  const [modal, contextHolder] = Modal.useModal();
  const classNames = {
    content: styles["my-modal-content"],
  };

  // 将国际化时间处理为标准时间  '2023-10-16'
  const getymd = (dateStr: Dayjs) => {
    // console.log('dateStr', dateStr)
    return `${dateStr.year()}-${(dateStr.month() + 1).toString().padStart(2, '0')}-${dateStr.date().toString().padStart(2, '0')}`;
  }

  const handleModalOpen = () => {
    console.log('123')
  }

  const openValue = useRef(false)
  console.log('openValue', openValue)

  // const { run: handleCreateProject } = useThrottleFn(
  //   () => {
  //     console.log('openValue.current 😈', openValue.current)
  //     if (openValue.current) return
  //     openValue.current = !openValue.current

  //     const onFinished = async (value: CreateFormData) => {
  //       console.log('新建项目', value, dayjs(value.time), getymd(value.time))
  //       // TODO: 新建项目的接口
  //       // const { error, data, msg } = await SharedApi.createProject({
  //       //   'project': 'xxx'
  //       // })
  //       // if (!error) {
  //       //   messageApi.success(`创建成功${JSON.stringify(value)}`);
  //       //   destroy();
  //       //   // TODO: 刷新表格的接口
  //       //   search.submit();
  //       // }
  //     };

  //     const { destroy } = modal.info({
  //       title: (
  //         <div className="flex justify-between border-b px-6 py-3">
  //           <p>新建项目</p>
  //           <CloseOutlined onClick={() => destroy()} />
  //         </div>
  //       ),
  //       footer: null,
  //       // afterOpenChange: handleModalOpen,
  //       width: 1000,
  //       content: (
  //         <ProjectCreateForm
  //           type='create'
  //           onFinish={onFinished}
  //           onClosed={() => destroy()}
  //         />
  //       ),
  //       icon: (
  //         <div className="flex w-20 items-center justify-center self-stretch rounded-l-lg bg-blue-500 text-white">
  //           配图
  //         </div>
  //       ),
  //     });
  //   },
  //   {
  //   wait: 1000}
  // )


  // 节流函数
  function throttle(func: () => void, wait: number) {
    let inThrottle: boolean;
    return function () {
      console.log('arguments', arguments, this)
      const args = arguments;
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, wait);
      }
    }
  }
  
  const handleCreateProject = () => {
    
    // console.log('openValue.current 😈', openValue.current)
    // if (openValue.current) return
    // openValue.current = !openValue.current
    
    const onFinished = async (value: CreateFormData) => {
      console.log('新建项目', value, dayjs(value.time), getymd(value.time))
      // TODO: 新建项目的接口
      // const { error, data, msg } = await SharedApi.createProject({
      //   'project': 'xxx'
      // })
      // if (!error) {
      //   messageApi.success(`创建成功${JSON.stringify(value)}`);
      //   destroy();
      //   // TODO: 刷新表格的接口
      //   search.submit();
      // }
    };

    const { destroy } = modal.info({
      title: (
        <div className="flex justify-between border-b px-6 py-3">
          <p>新建项目</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      // afterOpenChange: handleModalOpen,
      width: 1000,
      content: (
        <ProjectCreateForm
          type='create'
          onFinish={onFinished}
          onClosed={() => destroy()}
        />
      ),
      icon: (
        <div className="flex w-20 items-center justify-center self-stretch rounded-l-lg bg-blue-500 text-white">
          配图
        </div>
      ),
    });
  };

  const throttledShowModal = throttle(handleCreateProject, 500);

  const handleConfigMember = (id: string) => {
    const { destroy } = modal.info({
      className: styles['custom-member-management-modal'],
      title: (
        <div className="flex justify-between px-6 border-0 border-b-[1px] border-slate-200 border-solid">
          <p>成员管理</p>
          <CloseOutlined onClick={() => destroy()} />
        </div>
      ),
      footer: null,
      width: 1200,
      content: <MemberConfigForm projectId={id} onClosed={() => destroy()} />,
      icon: <></>,
    });
  };

  const { submit, reset } = search;
  const columns: ColumnsType<Project> = [
    {
      title: "项目编号",
      dataIndex: "id",
      key: "id",
      width: 250,
      render: (_, { id }) => <Button type="link">{id}</Button>,
    },
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "负责经理",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "立项时间",
      dataIndex: "time",
      key: "time",
      render: (_, { time }) => <span>{time.toLocaleDateString()}</span>,
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: 350,
      render: (_, {id}) => (
        <>
          <Button type="link" onClick={() => handleConfigMember(id)}>成员管理</Button>
          <Divider type="vertical" />
          <Button type="link">编辑</Button>
          <Divider type="vertical" />
          <Button type="link">归档</Button>
          <Divider type="vertical" />
          <Button type="link" danger>
            删除
          </Button>
        </>
      ),
    },
  ];

  const advanceSearchForm = (
    <div className={cardClassName}>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="项目名称" name="name">
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="立项时间" name="time">
              <RangePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="项目状态" name="status">
              <Select>
                <Option value="">all</Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} xl={6}>
            <Row justify="end" gutter={12} className="mb-6">
              <Col>
                <Button type="primary" onClick={submit}>
                  查询
                </Button>
              </Col>
              <Col>
                <Button onClick={reset}>重置</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <Layout className="h-full overflow-y-hidden bg-transparent">
      <Header className="mb-3 !h-fit !bg-transparent !p-0">
        {advanceSearchForm}
      </Header>
      <Content className={cardClassName + " mb-1"}>
        <div className="h-full" ref={contentRef}>
          <div className=" flex h-10 justify-between">
            <h2 className="m-0">
              <DatabaseOutlined className="mr-2" />
              项目列表
            </h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={throttledShowModal}
            >
              {/* onClick={handleCreateProject} */}
              新建项目
            </Button>
          </div>
          <Table
            columns={columns}
            rowKey="id"
            {...tableProps}
            scroll={scrollValue}
          />
        </div>
        <ConfigProvider
          modal={{
            classNames,
          }}
        >
          <div>{contextHolder}</div>
        </ConfigProvider>
      </Content>
    </Layout>
  );
};

export default ProjectListPage;
