import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './SupplierCreate.module.scss'
import { useForm, Controller } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import ProvincesActions from "redux/provinces/action";
import SupplierCategoryAction from 'redux/category/action';

import DropdownSelect from './dropdown/Dropdown';
import DropdownGroup from './dropdown/DropdownGroup';
import IconBack from '../icons/iconsSupplierCreate/IconBack';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierCreate() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { supplierList } = useSelector((state) => state.SupplierReducer);
    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);
    const {
        provinces,
        districts,
        wards,
    } = useSelector((state) => state.ProvincesReducer);

    const { register, handleSubmit, control, clearErrors, formState: { errors }, setValue } = useForm();

    const [supplierListRedux, setSupplierListRedux] = useState([])
    const [categoryListRedux, setCategoryListRedux] = useState([])
    const [selectedDeptCode, setSelectedDeptCode] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [groupCategory, setGroupCategory] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({
        name: 'Giao dịch',
        code: 1
    });
    const [open, setOpen] = useState(false);
    const [infoCreate, setInfoCreate] = useState(null)

    useEffect(() => {
        if (Array.isArray(supplierList)) {
            setSupplierListRedux(supplierList)
        }
    }, [supplierList]);

    useEffect(() => {
        setCategoryListRedux(supplierCategoryList?.all)
    }, [supplierCategoryList]);

    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                statusValue: '',
                inputValue: '',
                addressValue: ''
            }
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: ProvincesActions.FETCH_PROVINCES_START,
        });
    }, [dispatch]);

    useEffect(() => {
        setSelectedDistrict(null);
        setSelectedWard(null);
    }, [selectedProvince]);

    useEffect(() => {
        const createGroupedCategory = () => {
            const groupedCategories = categoryListRedux?.filter(item => !item.parent_id);

            const groupCategoryData = groupedCategories.map(category => {
                const items = categoryListRedux?.filter(item => item.parent_id === category.id).map(child => ({
                    label: child.categoryName,
                    value: child.id
                }));

                return {
                    label: category.categoryName,
                    code: category.id,
                    items: items
                };
            });

            setGroupCategory(groupCategoryData);
        };

        createGroupedCategory();
    }, [categoryListRedux]);

    const optionDeptCode = Array.from(new Set(supplierListRedux.map(item => item.deptCode))).map(deptCode => ({
        name: deptCode,
        code: deptCode
    }));

    const optionProvince = provinces.map(province => ({
        name: province.name,
        code: province.code
    }));

    const optionDistrict = districts.map(district => ({
        name: district.name,
        code: district.code
    }));

    const optionWard = wards.map(ward => ({
        name: ward.name,
        code: ward.name
    }));

    const optionStatus = Array.from(new Set(supplierListRedux.map(item => item.status))).map(status => ({
        name: status && status == 1 ? 'Giao dịch' : 'Tạm dừng',
        code: status
    }));

    const handleDeptCodeChange = (event) => {
        if (event) {
            clearErrors('deptCode')
            setValue("deptCode", event.name)
        }
        setSelectedDeptCode(event);
    };

    const handleCategoryChange = (event) => {
        if (event) {
            clearErrors('category')
            setValue("category", event)
        }
        setSelectedCategory(event);
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event);

        if (event) {
            clearErrors('province')
            setValue("province", event.name)
        }

        dispatch({
            type: ProvincesActions.FETCH_DISTRICTS_START,
            payload: event.code
        });
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event)
        if (event) {
            clearErrors('district')
            setValue("district", event.name)
        }

        dispatch({
            type: ProvincesActions.FETCH_WARDS_START,
            payload: event.code
        });
    };

    const handleWardChange = (event) => {
        setSelectedWard(event);
        if (event) {
            clearErrors('ward')
            setValue("ward", event.name)
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event)

        if (event) {
            setValue("status", event.name)
        }
    }

    const onSubmit = (data) => {
        handleClickOpen()

        const getInfo = {
            category_id: data.category,
            supplierName: data.supplierName,
            code: parseInt(data.code),
            deptCode: parseInt(data.deptCode),
            phone: data.phone,
            email: data.email,
            province: data.province,
            district: data.district,
            ward: data.ward,
            address: data.address,
            status: data.status ? (data.status == "Giao dịch" ? 1 : 2) : 1,
        }

        setInfoCreate(getInfo)
    };

    const handleClickOpen = () => {
        const length = Object.keys(errors).length;
        if (length == 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleGoBack = () => {
        history.goBack();
    };
    
    const isCreate = (rs) => {
        history.push('/supplier/list');
    }

    const handlAgree = () => {
        dispatch({
            type: supplierActions.CREATE_SUPPLIER_START,
            payload: { info: infoCreate },
            callBack: isCreate,
        })
    };

    return (
        <div className={styles['div-supplier-create']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['div-top']}>
                    <div className={styles['div-create']}>
                        <p className={styles['p-info']}>
                            Thông tin nhà cung cấp
                        </p>

                        <div className={styles['div-info-supp']}>
                            <div className={styles['div-create-left']}>
                                <div className={styles['custom-label-input']}>
                                    <label>Tên nhà cung cấp<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="text"
                                        {...register('supplierName', { required: true })}
                                        placeholder="Nhập tên nhà cung cấp"
                                    />
                                    {errors.supplierName && <span className={styles['error-message']}>Tên nhà cung cấp là bắt buộc</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Mã code<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="number"
                                        {...register('code', {
                                            required: 'Mã code là bắt buộc',
                                            min: { value: 251, message: 'Mã code phải từ 251 đến 253' },
                                            max: { value: 253, message: 'Mã code phải từ 251 đến 253' }
                                        })}
                                        placeholder="Nhập mã code"
                                    />
                                    {errors.code && <span className={styles['error-message']}>{errors.code.message}</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Tỉnh/Thành phố<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="province"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionProvince}
                                                    selectedOption={selectedProvince}
                                                    onChange={handleProvinceChange}
                                                    placeholder={'Tỉnh/Thành phố'}
                                                />
                                                {errors.province && <span className={styles['error-message']}>Vui lòng chọn Tỉnh/Thành phố</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Địa chỉ cụ thể</label>
                                    <input
                                        type="text"
                                        {...register('address')}
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                </div>
                            </div>

                            <div className={styles['div-create-middle']}>
                                <div className={styles['custom-label-input']}>
                                    <label>Danh mục<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="category"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownGroup
                                                    {...field}
                                                    option={groupCategory}
                                                    selectedOption={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    placeholder={'Danh mục'}
                                                />
                                                {errors.category && <span className={styles['error-message']}>Vui lòng chọn danh mục</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Công nợ<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="deptCode"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionDeptCode}
                                                    selectedOption={selectedDeptCode}
                                                    onChange={handleDeptCodeChange}
                                                    placeholder={'Nhập mã công nợ'}
                                                />
                                                {errors.deptCode && <span className={styles['error-message']}>Vui lòng chọn mã công nợ</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Quận/Huyện<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="district"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionDistrict}
                                                    selectedOption={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    placeholder={'Quận/Huyện'}
                                                    emptyMessage='Hãy chọn Tỉnh/Thành phố'
                                                />
                                                {errors.district && <span className={styles['error-message']}>Vui lòng chọn Quận/Huyện</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Trạng thái</label>
                                    <Controller
                                        control={control}
                                        name="status"
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionStatus}
                                                    selectedOption={selectedStatus}
                                                    onChange={handleStatusChange}
                                                    placeholder={'Giao dịch'}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={styles['div-create-right']}>
                                <div className={styles['custom-label-input']}>
                                    <label>Số Điện thoại<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="tel"
                                        {...register('phone', { required: true })}
                                        placeholder="Nhập số điện thoại"
                                    />
                                    {errors.phone && <span className={styles['error-message']}>Vui lòng nhập số điện thoại</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Nhập đúng định dạng email',
                                            },
                                        })}
                                        placeholder="abc@gmail.com"
                                    />
                                    {errors.email && <span className={styles['error-message']}>{errors.email.message}</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Phường/Xã<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="ward"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={selectedDistrict ? optionWard : []}
                                                    selectedOption={selectedWard}
                                                    onChange={handleWardChange}
                                                    placeholder={'Phường/Xã'}
                                                    emptyMessage='Hãy chọn Quận/Huyện'
                                                />
                                                {errors.ward && <span className={styles['error-message']}>Vui lòng chọn Phường/Xã</span>}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['div-bottom']}>
                    <div className={styles['div-bottom-left']} onClick={handleGoBack}>
                        <IconBack />
                        <p>Quay lại</p>
                    </div>

                    <div className={styles['div-bottom-right']}>
                        <button
                            className={styles['btn-update']}
                            type='submit'
                        >
                            Lưu
                        </button>
                        <button
                            className={styles['button-delete']}
                            onClick={handleGoBack}
                        >
                            Hủy bỏ
                        </button>
                        <Dialog
                            open={open}
                            onClose={handleClickClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Bạn có muốn tạo NCC không"}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClickClose}>Hủy bỏ</Button>
                                <Button
                                    onClick={handlAgree}
                                >
                                    Đồng ý
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </form>
        </div>
    )
}
