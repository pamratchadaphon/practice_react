import React, { createContext } from "react";
import { Modal, Space } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ReachableContext = createContext(null);

const DeleteIncomeExpense = ({ id, detail, type }) => {
  const [modal, modalContextHolder] = Modal.useModal();

  function confirmDelete(detail, type) {
    const config = {
      title: `ยืนยันการลบ${type}`,
      content: (
        <>
          <p>{`คุณต้องการลบรายการ ${detail} ใช่หรือไม่?`}</p>
        </>
      ),
    };
    return config;
  }

  async function handleDelete(id, detail) {
    await axios.delete(`/api/incomeExpense/deleteIncomeExpense/${id}`);
    window.location.reload();
  }

  return (
    <ReachableContext.Provider value="Light">
      <Space>
        <DeleteIcon
          onClick={async () => {
            const confirmed = await modal.confirm(confirmDelete(detail, type));
            if (confirmed) {
              handleDelete(id);
            }
          }}
          className="cursor-pointer"
          color="error"
        />
      </Space>
      {modalContextHolder}
    </ReachableContext.Provider>
  );
};

export default DeleteIncomeExpense;
