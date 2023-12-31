import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './SupplierCreate.module.scss'
import { useForm, Controller } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import ProvincesActions from "redux/provinces/action";

import DropdownSelect from './dropdown/Dropdown';
import IconBack from '../icons/iconsSupplierCreate/IconBack';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import { getLocalStorageData, setLocalStorageData } from 'redux/supplier/localStorageUtils';
import { fetchSupplierList } from 'redux/supplier/fetchSupplierList'

export default function SupplierCreate() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);
    const {
        provinces,
        districts,
        wards,
    } = useSelector((state) => state.ProvincesReducer);

    const { register, handleSubmit, control, clearErrors, formState: { errors }, setValue } = useForm();

    const [open, setOpen] = useState(false);

    const existingSupplierList = getLocalStorageData('supplierList');
    if (!existingSupplierList) {
        setLocalStorageData('supplierList', fetchSupplierList);
    }


    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: ProvincesActions.FETCH_PROVINCES_START,
        });
    }, [dispatch]);

    const getNextId = () => {
        if (supplierListRedux.length > 0) {
            const lastId = supplierListRedux[supplierListRedux.length - 1].items.id;
            return lastId + 1;
        } else {
            return 1;
        }
    };

    const optionCity = provinces.map(province => ({
        name: province.name,
        code: province.code
    }));

    const optionCategory = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.items.category))).map(category => ({
        name: category
    }));

    const optionDeptCode = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.items.deptCode))).map(deptCode => ({
        name: deptCode,
    }));

    const optionDistrict = districts.map(district => ({
        name: district.name,
        code: district.code
    }));

    const optionStatus = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.items.status))).map(status => ({
        name: status && status == 1 ? 'Giao dịch' : 'Tạm dừng'
    }));

    const optionWard = wards.map(ward => ({ name: ward.name }));

    const optionSupplierCode = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.items.supplierCode))).map(supplierCode => ({
        name: supplierCode
    }));

    const handleProvinceChange = (event) => {
        if (event) {
            clearErrors('city')
            setValue("city", event.value.name)
            setValue("district", [])
            setValue("ward", [])
        }

        dispatch({
            type: ProvincesActions.FETCH_DISTRICTS_START,
            payload: event.value.code
        });
    };

    const handleDistrictChange = (event) => {
        if (event) {
            clearErrors('district')
            setValue("district", event.value.name)
            setValue("ward", [])
        }

        dispatch({
            type: ProvincesActions.FETCH_WARDS_START,
            payload: event.value.code
        });
    };

    const [infoCreate, setInfoCreate] = useState(null)
    const onSubmit = (data) => {
        handleClickOpen()
        const id = getNextId()
        const getInfo = {
            id: parseInt(id),
            supplierCode: data.supplierCode.name,
            supplierName: data.supplierName,
            category: data.category.name,
            code: parseInt(data.code),
            deptCode: parseInt(data.deptCode.name),
            phone: data.phone,
            email: data.email,
            city: data.city,
            district: data.district,
            ward: data.ward.name,
            address: data.address,
            status: data.status.name && data.status.name == "Giao dịch" ? 1 : 2,
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

    const handlAgree = () => {
        dispatch({ type: supplierActions.CREATE_SUPPLIER_START, payload: { info: infoCreate } })
        history.push('/supplier/list');
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
                                        name="city"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionCity}
                                                    placeholder={'Tỉnh/Thành phố'}
                                                    onChange={(event) => handleProvinceChange(event)}
                                                />
                                                {errors.city && <span className={styles['error-message']}>Vui lòng chọn Tỉnh/Thành phố</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Địa chỉ cụ thể<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="text"
                                        {...register('address', { required: true })}
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                    {errors.address && <span className={styles['error-message']}>Địa chỉ là bắt buộc</span>}
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
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionCategory}
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
                                                    placeholder={'Quận/Huyện'}
                                                    onChange={(event) => handleDistrictChange(event)}
                                                    emptyMessage='Hãy chọn Tỉnh/Thành phố'
                                                />
                                                {errors.district && <span className={styles['error-message']}>Vui lòng chọn Quận/Huyện</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Trạng thái<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="status"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionStatus}
                                                    placeholder={'Trạng thái'}
                                                />
                                                {errors.status && <span className={styles['error-message']}>Vui lòng chọn Trạng thái</span>}
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
                                    {errors.phone && <span className={styles['error-message']}>Số Điện thoại là bắt buộc</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Email<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="email"
                                        {...register('email', { required: true })}
                                        placeholder="abc@gmail.com"
                                    />
                                    {errors.email && <span className={styles['error-message']}>Email là bắt buộc</span>}
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
                                                    option={optionWard}
                                                    placeholder={'Phường/Xã'}
                                                    emptyMessage='Hãy chọn Quận/Huyện'
                                                />
                                                {errors.ward && <span className={styles['error-message']}>Vui lòng chọn Phường/Xã</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Mã nhà cung cấp<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="supplierCode"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionSupplierCode}
                                                    placeholder={'Nhập mã nhà cung cấp'}
                                                />
                                                {errors.supplierCode && <span className={styles['error-message']}>Vui lòng chọn mã nhà cung cấp</span>}
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
                        // onClick={handleClickOpen}
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
