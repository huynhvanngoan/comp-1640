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

                            <Input.Password placeholder="Old password" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,

                                    message: 'Enter password!',
                                },
                                { max: 100, message: 'Name maximun 100 character' },
                                { min: 5, message: 'Name minimun 5 character' },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,

                                    message: 'Re-enter password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }


                                        return Promise.reject(new Error('Password is not matching!'));
                                    },
                                }),
                            ]}
                        >

                            <Input.Password placeholder="Re-enter password" />
                        </Form.Item>

                        <Form.Item style={{ width: '100%', marginTop: 20 }}>
                            <Button className="button" type="primary" htmlType="submit"  >

                                OK
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassWord;



