import { Fragment, useState, useEffect, useCallback } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Space,
  Pagination,
  Table,
} from "antd";

import { useAuth } from "../../states/auth";
import { request } from "../../server/request";
import { PAGELIMIT } from "../../constants";
import { longDate } from "../../utils/dateConvert";

const EducationPage = () => {
  const { userId } = useAuth();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [educations, setEducations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getEducations = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `education?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setEducations(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getEducations();
  }, [getEducations]);

  const columns = [
    {
      title: "Education",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => (
        <p
          style={{
            marginBottom: "0px",
          }}
        >
          {data.slice(0, 40)}
        </p>
      ),
    },
    {
      title: "Started",
      dataIndex: "startDate",
      key: "startDate",
      render: (data: string) => <p>{longDate(data.split("T")[0])}</p>,
    },
    {
      title: "Finished",
      dataIndex: "endDate",
      key: "endDate",
      render: (data: string) => <p>{longDate(data.split("T")[0])}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: () => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        className="skills-table"
        bordered={true}
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Fragment>
            <Flex align="center" justify="space-between" gap={36}>
              <h1 className="skills-title">Education ({total})</h1>
              <Input
                className="search-input"
                // value={search}
                // onChange={handleSearch}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={showModal} type="primary">
                Add education
              </Button>
            </Flex>
          </Fragment>
        )}
        pagination={false}
        loading={loading}
        dataSource={educations}
        columns={columns}
      />
      {total > PAGELIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={PAGELIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="Education data"
        maskClosable={false}
        confirmLoading={loading}
        okText={"Save education"}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please include educational institution name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "Please include your study level!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  "Please include a brief description of your education!",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Flex align="center" justify="space-between">
            <Form.Item
              label="Started"
              name="startDate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input className="date-picker" type="date" />
            </Form.Item>
            <Form.Item
              label="Finished"
              name="endDate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input className="date-picker" type="date" />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EducationPage;
