import React, { useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Button, Form, Input,message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVariety = () => {
    const navigate = useNavigate()
  const [value, setValue] = useState({
    name: "",
    feature: "",
    sensitivity: "",
    age: "",
    softness: "",
    product: "",
    stability: "",
    img:"https://images.unsplash.com/photo-1522770179533-24471fcdba45"
  });
  const onFinish = async () => {
    try {
        await axios.post("api/variety/addVariety", value);
        message.success("Submit success!");
        navigate('/manageVariety')
      } catch (error) {
        message.error("Submit failed!");
      }
  };
  return (
    <div className="flex bg-gray-100">
      <div className="basis-[16%]">
        <SidebarAdmin />
      </div>
      <div className="basis-[84%] border">
        <div className="px-4 py-2 pt-16 mt-3">
          <div>เพิ่มพันธุ์ข้าว</div>
          <div className="bg-white pt-4 pb-4">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="ชื่อพันธุ์"
                name="name"
                onChange={(e) => setValue({ ...value, name: e.target.value })}
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนชื่อพันธุ์ข้าว",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="คุณสมบัติ"
                name="feature"
                onChange={(e) =>
                  setValue({ ...value, feature: e.target.value })
                }
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนคุณสมบัติ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ความไวแสง"
                name="sensitivitys"
                onChange={(e) =>
                  setValue({ ...value, sensitivity: e.target.value })
                }
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนความไวแสง",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="อายุ"
                name="age"
                onChange={(e) => setValue({ ...value, age: e.target.value })}
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนอายุ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ความนุ่มนวล"
                name="softness"
                onChange={(e) =>
                  setValue({ ...value, softness: e.target.value })
                }
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนความนุ่มนวล",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ผลผลิต"
                name="product"
                onChange={(e) =>
                  setValue({ ...value, product: e.target.value })
                }
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนผลผลิต",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="ความมั่นคง"
                name="stability"
                onChange={(e) =>
                  setValue({ ...value, stability: e.target.value })
                }
                rules={[
                  {
                    required: true,
                    message: "กรุณาป้อนความมั่นคง",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item
                label="รูปภาพ"
                name="img"
                rules={[
                  {
                    required: true,
                    message: "กรุณาอัพโหลดรูปภาพ",
                  },
                ]}
              > */}
              {/* รูปภาพ
                <input
                  type="file"
                  onChange={(e) =>
                    setValue({ ...value, img: e.target.files[0]})
                  }
                /> */}
              {/* </Form.Item> */}

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVariety;
