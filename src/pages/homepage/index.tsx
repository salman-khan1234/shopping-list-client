import { Button, Modal, Form, Input, Switch, message } from "antd";
import styles from "./homepage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Item {
  name: string;
  quantity: string;
  bought: boolean;
}

const Homepage = () => {
  const nav = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateItem = (value: Item) => {
    const data = {
      name: value?.name,
      quantity: value?.quantity,
      bought: value?.bought,
    };
    fetch(`${import.meta.env.VITE_BASE_URL}/shopping-list`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => message.success("Item created successfully!"))
      .catch((err) => message.error(err))
      .finally(() => setIsCreateModalOpen(false));
  };

  return (
    <div className={styles["homepage-container"]}>
      <div className={styles["action-btn-container"]}>
        <Button
          type="primary"
          size="large"
          block
          className={styles["action-btn"]}
          onClick={() => nav("/shopping-list")}
        >
          Open Existing List
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New List
        </Button>
      </div>
      <Modal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        footer={null}
        bodyStyle={{ padding: "12px" }}
        destroyOnClose
      >
        <Form
          name="create-shopping-list"
          labelCol={{ span: 8 }}
          layout="vertical"
          initialValues={{ bought: false }}
          onFinish={handleCreateItem}
          autoComplete="off"
          preserve={false}
        >
          <Form.Item
            label="Item Name"
            name="name"
            rules={[{ required: true, message: "Please input item name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input item quantity!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Bought" name="bought" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Homepage;
