import { Button, Checkbox, Popconfirm, Table, Typography, message } from "antd";
import { useEffect, useState } from "react";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllShoppingList = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/shopping-list`)
      .then((res) => res.json())
      .then((res) => setShoppingList(res?.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllShoppingList();
  }, []);

  const toggleBought = (itemId: string, isBought: boolean) => {
    const data = { bought: !isBought };
    fetch(`${import.meta.env.VITE_BASE_URL}/shopping-list/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        message.success("Item Updated");
        fetchAllShoppingList();
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteItem = (itemId: string) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/shopping-list/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        message.success("Item Deleted!");
        fetchAllShoppingList();
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Bought",
      dataIndex: "bought",
      key: "bought",
      render: (val: boolean, row: { id: string }) => (
        <Checkbox checked={val} onChange={() => toggleBought(row?.id, val)} />
      ),
    },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      render: (_: unknown, row: { id: string }) => (
        <Popconfirm
          title="Delete item"
          description="Are you sure to delete this item?"
          onConfirm={() => handleDeleteItem(row?.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Typography.Title>Shopping List</Typography.Title>
      <Table
        columns={columns}
        dataSource={shoppingList}
        bordered
        loading={loading}
      />
    </>
  );
};

export default ShoppingList;
