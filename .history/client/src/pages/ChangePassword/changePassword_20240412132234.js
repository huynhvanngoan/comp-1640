import React, { useState, useEffect } from 'react';
import "./changePassword.css";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Divider, Alert, notification } from 'antd';
import backgroundLogin from "../../assets/image/background-login.png";

// import { useParams } from "react-router-dom";
import axiosClient from '../../apis/axiosClient';

const ChangePassWord = () => {

    const [isLogin, setLogin] = useState(false);

    let history = useHistory();


    const onFinish = async (values) => {
        const resetPassWord = {
            currentPassword: values.currentPassword,
            newPassword: values.password
        }
        const currentUser = JSON.parse(localStorage.getItem("user"));
        axiosClient.put("/user/changePassword/" + currentUser.id, resetPassWord)
            .then(function (response) {
                console.log(response);

                if (response.message === "Current password is incorrect") {
                    return notification["error"]({
                        message: `Notification`,
                        description:
                            'Current password incorrect!',

                    });
                }
                if (response === undefined) {
                    setLogin(true);
                }
                else {
                    notification["success"]({

                        message: `Notification`,
                        description:
                            'Change password successfully',

                    });
                    history.push("/login");
                }
            })
            .catch(error => {
                console.log("password error" + error)
            });
    }
    useEffect(() => {

    }, [])

    return (
        <div className="imageBackground">
            <div id="formContainer" >
                <div id="form-Login">
                    <div className="formContentLeft"
                    >
                        <img className="formImg" src={backgroundLogin} alt='spaceship' />
                    </div>
                    <Form
                        style={{ width: 340, marginBottom: 8 }}
                        name="normal_login"
                        className="loginform"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item style={{ marginBottom: 3, marginTop: 65 }}>

                            <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">COMP1640</Divider>
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 16, textAlign: "center" }}>
                            <p className="text">Change passsword</p>
                        </Form.Item>
                        <>
                            {isLogin === true ?
                                <Form.Item style={{ marginBottom: 16 }}>
                                    <Alert
                                        message="Error changing password"
                                        type="error"
                                        showIcon
                                    />

                                </Form.Item>
                                : ""}
                        </>
                        <Form.Item
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,

                                    message: 'Enter old password!',
                                },
                            ]}
                            hasFeedback
                        >
<<<<<<< HEAD
                            <Input.Password placeholder="Mật khẩu cũ" />
=======
                            <Input.Password placeholder="Old password" />
>>>>>>> 5bc92b02cd422ac0a00abceaae82206f5b3b7b07
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
<<<<<<< HEAD
                                    message: 'Nhập mật khẩu!',
                                },
                                { max: 100, message: 'Tên tối đa 100 ký tự' },
                                { min: 5, message: 'Tên ít nhất 5 ký tự' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Mật khẩu" />
=======
                                    message: 'Enter password!',
                                },
                                { max: 100, message: 'Name maximun 100 character' },
                                { min: 5, message: 'Name minimun 5 character' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Password" />
>>>>>>> 5bc92b02cd422ac0a00abceaae82206f5b3b7b07
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
<<<<<<< HEAD
                                    message: 'Vui lòng nhập lại mật khẩu!',
=======
                                    message: 'Re-enter password!',
>>>>>>> 5bc92b02cd422ac0a00abceaae82206f5b3b7b07
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

<<<<<<< HEAD
                                        return Promise.reject(new Error('Hai mật khẩu bạn nhập không khớp!'));
=======
                                        return Promise.reject(new Error('Password is not matching!'));
>>>>>>> 5bc92b02cd422ac0a00abceaae82206f5b3b7b07
                                    },
                                }),
                            ]}
                        >
<<<<<<< HEAD
                            <Input.Password placeholder="Nhập lại mật khẩu" />
=======
                            <Input.Password placeholder="Re-enter password" />
>>>>>>> 5bc92b02cd422ac0a00abceaae82206f5b3b7b07
                        </Form.Item>

                        <Form.Item style={{ width: '100%', marginTop: 20 }}>
                            <Button className="button" type="primary" htmlType="submit"  >
<<<<<<< HEAD
                                Hoàn thành
=======
                                OK
>>>>>>> 5bc92b02cd422ac0a00abceaae82206f5b3b7b07
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassWord;



