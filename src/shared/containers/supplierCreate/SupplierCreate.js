import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './SupplierCreate.module.scss'
import { useForm } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"

import DropdownSelect from './dropdown/Dropdown';
import { getLocalStorageData } from 'redux/supplier/localStorageUtils';
import IconBack from '../icons/iconsSupplierCreate/IconBack';
import IconDropdown from '../icons/iconsSupplierCreate/IconDropdown'


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierListDetail() {
    //History
    const history = useHistory();

    //dispatch
    const dispatch = useDispatch();

    //FETCH_SEARCH_SUPPLIER_LIST
    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

    // get supplierList and : supplierListRedux
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);

    const getNextId = () => {
        if (supplierListRedux.length > 0) {
            const lastId = supplierListRedux[supplierListRedux.length - 1].id;
            return lastId + 1;
        } else {
            return 1;
        }
    };

    //use form
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //cityValue
    const [cityValue, setCityValue] = useState('')
    const optionCity = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.city))).map(city => ({
        value: city,
        label: city
    }));

    const handleCityValue = (event) => {
        // console.log(event.value);
        setCityValue(event.value)
    };

    //categoryValue
    const [categoryValue, setCategoryValue] = useState('')
    const optionCategory = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.category))).map(category => ({
        value: category,
        label: category
    }));

    const handleCategoryValue = (event) => {
        // console.log(event.value);
        setCategoryValue(event.value)
    };

    //deptCodeValue
    const [deptCodeValue, setDeptCodeValue] = useState('')
    const optionDeptCode = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.deptCode))).map(deptCode => ({
        value: String(deptCode),
        label: deptCode
    }));

    const handleDeptCodeValue = (event) => {
        // console.log(event.value, typeof(event.value));
        setDeptCodeValue(event.value)
    };

    //districtValue
    const [districtValue, setDistrictValue] = useState('')
    const optionDistrictValue = Array.from(
        new Set(getLocalStorageData('supplierList').map(item => item.district))
    ).map(district => ({
        value: district,
        label: district
    }));

    const handleDistrictValue = (event) => {
        // console.log(event.value);
        setDistrictValue(event.value)
    };

    //statusValue
    const [statusValue, setStatusValue] = useState('')
    const optionStatus = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.status))).map(status => ({
        value: String(status),
        label: status == 1 ? 'Giao dịch' : 'Tạm dừng'
    }));

    const handleStatusValue = (event) => {
        // console.log(event.value, typeof(event.value));
        setStatusValue(event.value)
    };

    //wardValue
    const [wardValue, setWardValue] = useState('')
    const optionWard = Array.from(
        new Set(getLocalStorageData('supplierList').map(item => item.ward))
    ).map(ward => ({
        value: ward,
        label: ward
    }));

    const handleWardValue = (event) => {
        // console.log(event.value);
        setWardValue(event.value)
    };

    //supplierCodeValue
    const [supplierCodeValue, setSupplierCodeValue] = useState('')
    const optionSupplierCode = Array.from(
        new Set(getLocalStorageData('supplierList').map(item => item.supplierCode))
    ).map(supplierCode => ({
        value: supplierCode,
        label: supplierCode
    }));

    const handleSupplierCodeValue = (event) => {
        // console.log(event.value);
        setSupplierCodeValue(event.value)
    };

    //onSubmit
    const [infoCreate, setInfoCreate] = useState(null)
    const onSubmit = (data) => {
        const id = getNextId()

        const getInfo = {
            id: parseInt(id),
            supplierCode: supplierCodeValue,
            supplierName: data.supplierName,
            category: categoryValue,
            code: parseInt(data.code),
            deptCode: parseInt(deptCodeValue),
            phone: data.phone,
            email: data.email,
            city: cityValue,
            district: districtValue,
            ward: wardValue,
            address: data.address,
            status: parseInt(statusValue),
        }
        // console.log('getInfo', getInfo);
        setInfoCreate(getInfo)
    };

    //dialog component
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Back
    const handleGoBack = () => {
        history.goBack();
    };
    //Back List supplier 
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
                                    <DropdownSelect
                                        options={optionCity}
                                        onChange={handleCityValue}
                                        value={cityValue}
                                        placeholder={'Tỉnh/Thành phố'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
                                    />
                                    {errors.city && <span className={styles['error-message']}>{errors.city.message}</span>}
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
                                    <DropdownSelect
                                        options={optionCategory}
                                        onChange={handleCategoryValue}
                                        value={categoryValue}
                                        placeholder={'Danh mục'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Công nợ<span className={styles['span-required']}>*</span></label>
                                    <DropdownSelect
                                        options={optionDeptCode}
                                        onChange={handleDeptCodeValue}
                                        value={deptCodeValue}
                                        placeholder={'Nhập mã công nợ'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Quận/Huyện<span className={styles['span-required']}>*</span></label>
                                    <DropdownSelect
                                        options={optionDistrictValue}
                                        onChange={handleDistrictValue}
                                        value={districtValue}
                                        placeholder={'Quận/Huyện'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Trạng thái<span className={styles['span-required']}>*</span></label>
                                    <DropdownSelect
                                        options={optionStatus}
                                        onChange={handleStatusValue}
                                        value={statusValue}
                                        placeholder={statusValue == '1' ? 'Giao dịch' : statusValue == '2' ? 'Tạm dừng' : 'Trạng thái'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
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
                                    <DropdownSelect
                                        options={optionWard}
                                        onChange={handleWardValue}
                                        value={wardValue}
                                        placeholder={'Phường/Xã'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>Mã nhà cung cấp<span className={styles['span-required']}>*</span></label>
                                    <DropdownSelect
                                        options={optionSupplierCode}
                                        onChange={handleSupplierCodeValue}
                                        value={supplierCodeValue}
                                        placeholder={'Nhập mã nhà cung cấp'}
                                        arrowOpen={<IconDropdown />}
                                        arrowClosed={<IconDropdown />}
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
                            onClick={handleClickOpen}
                        >
                            Lưu
                        </button>
                        <button
                            className={styles['button-delete']}
                            onClick={handleGoBack}
                        >
                            Hủy bỏ
                        </button>
                        {
                            !errors &&
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Bạn có muốn tạo NCC không"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Hủy bỏ</Button>
                                    <Button
                                        onClick={handlAgree}
                                    >
                                        Đồng ý
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        }

                    </div>
                </div>
            </form>
        </div>
    )
}
