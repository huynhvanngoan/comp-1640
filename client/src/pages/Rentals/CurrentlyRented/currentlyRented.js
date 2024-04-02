import {
    HomeOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import {
    BackTop, Breadcrumb,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Spin,
    Table,
    notification
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import assetCategoryApi from '../../../apis/assetCategoryApi';
import assetManagementApi from "../../../apis/assetManagementApi";
import uploadFileApi from '../../../apis/uploadFileApi';
import userApi from '../../../apis/userApi';
import "./currentlyRented.css";

const { Option } = Select;

const CurrentlyRented = () => {

    const [category, setCategory] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [id, setId] = useState();
    const [file, setUploadFile] = useState();

    const showModal = () => {
        setOpenModalCreate(true);
    };

    const handleOkUser = async (values) => {
        setLoading(true);
        try {
            const rentalDetails = {
                title: values.title,
                name: values.name,
                seats: values.seats,
                year: values.year,
                brand: values.brand,
                fuel_type: values.fuel_type,
                address: values.address,
                commune: values.commune,
                district: values.district,
                description: values.description,
                image: file,
                rental_price: values.rental_price || 0,
                category_id: values.categoryId,
                user_id: userData.id,
            };
            return assetManagementApi.createAssetManagement(rentalDetails).then(response => {
                if (response.message === "Asset with the same name already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tên xe không được trùng',
                    });
                    setLoading(false);
                    return;
                }
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tạo xe thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Tạo xe thành công',
                    });
                    setOpenModalCreate(false);
                    handleCategoryList();
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleUpdateCategory = async (values) => {
        setLoading(true);
        try {
            const rentalDetails = {
                title: values.title,
                name: values.name,
                seats: values.seats,
                year: values.year,
                brand: values.brand,
                fuel_type: values.fuel_type,
                address: values.address,
                commune: values.commune,
                district: values.district,
                description: values.description,
                image: file,
                rental_price: values.rental_price || 0,
                category_id: values.categoryId,
                user_id: userData.id,
            };
            return assetManagementApi.updateAssetManagement(rentalDetails, id).then(response => {
                if (response.message === "Asset with the same name already exists") {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Tên xe không được trùng',
                    });
                    setLoading(false);
                    return;
                }

                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa xe thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Chỉnh sửa xe thành công',
                    });
                    handleCategoryList();
                    setOpenModalUpdate(false);
                }
            })

        } catch (error) {
            throw error;
        }
    }

    const handleCancel = (type) => {
        if (type === "create") {
            setOpenModalCreate(false);
        } else {
            setOpenModalUpdate(false)
        }
        console.log('Clicked cancel button');
    };

    const handleCategoryList = async () => {
        try {
            await assetManagementApi.listAssetManagement().then((res) => {
                setCategory(res);
                setLoading(false);
            });
            ;
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        };
    }

    const handleFilter = async (name) => {
        try {
            const res = await assetManagementApi.searchAssetManagement(name);
            setCategory(res);
        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    const columns = [
        {
            title: 'ID',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} style={{ height: 80 }} />,
            width: '10%'
        },
        {
            title: 'Tên xe',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá cho thuê',
            dataIndex: 'rental_price',
            key: 'rental_price',
            render: (text, record) => {
                const formattedCost = Number(record.rental_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                return formattedCost;
            },
        },
        {
            title: 'Năm sản xuất xe',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_rented',
            key: 'is_rented',
            render: (isRented) => (
                <span>
                    {isRented === 3 ? 'Đã cho thuê' : 'Chưa cho thuê'}
                </span>
            ),
        }
    ];


    const handleChangeImage = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setUploadFile(response);
        }
        setLoading(false);
    }

    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleFilter2 = async (category_name) => {
        try {
            console.log(category_name);

            if (category_name) {
                await assetManagementApi.listAssetManagement().then((res) => {
                    // Tiến hành lọc theo category_name
                    const filteredByCategoryName = res.data.filter(item => item.category_name
                        .toLowerCase() === category_name.toLowerCase());

                    // Cập nhật danh sách Xe
                    setCategory(filteredByCategoryName);
                });
            } else {
                await assetManagementApi.listAssetManagement().then((res) => {
                    console.log(res);
                    setCategory(res.data);
                    setLoading(false);
                });
            }


        } catch (error) {
            console.log('search to fetch category list:' + error);
        }
    }

    const [userData, setUserData] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                console.log(response);
                setUserData(response.user);



                const createdById = response.user.id;

                if (response.user.role == "isAdmin") {
                    await assetManagementApi.listAssetManagement().then((res) => {
                        console.log(res);
                        setCategory(res);
                        setLoading(false);
                    });
                } else {
                    await assetManagementApi.listAssetManagement().then((res) => {
                        console.log(res);

                        // Filter complaints based on the created_by field
                        const filteredComplaints = res.filter(item => item.user_id === createdById);

                        setCategory(filteredComplaints);
                        setLoading(false);
                    });
                }


                await assetCategoryApi.listAssetCategories().then((res) => {
                    console.log(res);
                    setCategoryList(res.data);
                    setLoading(false);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch category list:' + error);
            }
        })();
    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div className='container'>
                    <div style={{ marginTop: 20 }}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <ShoppingOutlined />
                                <span>Danh sách xe đang cho thuê</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div style={{ marginTop: 20 }}>
                        <div id="my__event_container__list">
                            <PageHeader
                                subTitle=""
                                style={{ fontSize: 14 }}
                            >
                                <Row>
                                    <Col span="18">
                                        <Input
                                            placeholder="Tìm kiếm"
                                            allowClear
                                            onChange={handleFilter}
                                            style={{ width: 300 }}
                                        />
                                    </Col>
                                    <Col span="6">
                                       
                                    </Col>
                                </Row>

                            </PageHeader>
                        </div>
                    </div>

                    <div style={{ marginTop: 30 }}>
                        <Table columns={columns} pagination={{ position: ['bottomCenter'] }} dataSource={category} />
                    </div>
                </div>

                <Modal
                    title="Tạo Xe mới"
                    visible={openModalCreate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form
                            .validateFields()
                            .then((values) => {
                                form.resetFields();
                                handleOkUser(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={() => handleCancel("create")}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Form
                        form={form}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tiêu đề!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tiêu đề" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>

                            <Form.Item
                                name="seats"
                                label="Số ghế"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số ghế!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Số ghế"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="year"
                                label="Năm sản xuất"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập năm sản xuất!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Năm sản xuất"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="brand"
                                label="Hãng xe"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập hãng xe!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Hãng xe" />
                            </Form.Item>

                            <Form.Item
                                name="fuel_type"
                                label="Loại nhiên liệu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập loại nhiên liệu!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Loại nhiên liệu" />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Địa chỉ" />
                            </Form.Item>

                            <Form.Item
                                name="commune"
                                label="Xã"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập xã!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Xã" />
                            </Form.Item>

                            <Form.Item
                                name="district"
                                label="Quận"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập quận!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Quận" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input.TextArea placeholder="Mô tả" />
                            </Form.Item>

                            <Form.Item
                                name="categoryId"
                                label="Danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn danh mục!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn danh mục">
                                    {categoryList.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Chọn ảnh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ảnh!',
                                    },
                                ]}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>

                            <Form.Item
                                name="rental_price"
                                label="Giá cho thuê"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá cho thuê!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Giá cho thuê"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                        </Spin>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa Xe"
                    visible={openModalUpdate}
                    style={{ top: 100 }}
                    onOk={() => {
                        form2
                            .validateFields()
                            .then((values) => {
                                form2.resetFields();
                                handleUpdateCategory(values);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                    onCancel={handleCancel}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={600}
                >
                    <Form
                        form={form2}
                        name="eventCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                name="title"
                                label="Tiêu đề"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tiêu đề!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tiêu đề" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                label="Tên"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>

                            <Form.Item
                                name="seats"
                                label="Số ghế"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số ghế!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Số ghế"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="year"
                                label="Năm sản xuất"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập năm sản xuất!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Năm sản xuất"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="brand"
                                label="Hãng xe"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập hãng xe!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Hãng xe" />
                            </Form.Item>

                            <Form.Item
                                name="fuel_type"
                                label="Loại nhiên liệu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập loại nhiên liệu!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Loại nhiên liệu" />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Địa chỉ" />
                            </Form.Item>

                            <Form.Item
                                name="commune"
                                label="Xã"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập xã!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Xã" />
                            </Form.Item>

                            <Form.Item
                                name="district"
                                label="Quận"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập quận!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input placeholder="Quận" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input.TextArea placeholder="Mô tả" />
                            </Form.Item>

                            <Form.Item
                                name="categoryId"
                                label="Danh mục"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn danh mục!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select placeholder="Chọn danh mục">
                                    {categoryList.map(category => (
                                        <Option key={category.id} value={category.id}>
                                            {category.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Chọn ảnh"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                />
                            </Form.Item>

                            <Form.Item
                                name="rental_price"
                                label="Giá cho thuê"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá cho thuê!',
                                    },
                                ]}
                                style={{ marginBottom: 10 }}
                            >
                                <InputNumber
                                    placeholder="Giá cho thuê"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                        </Spin>
                    </Form>
                </Modal>

                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div >
    )
}

export default CurrentlyRented;