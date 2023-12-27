import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './PopupCreate.module.scss'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import SupplierCategoryAction from "redux/category/action"

import DropdownSelect from '../../supplierCreate/dropdown/Dropdown';
import { getLocalStorageData } from 'redux/supplier/localStorageUtils';
import { useForm, Controller } from 'react-hook-form';

import IconClose from 'shared/containers/icons/iconPopupCreate/IconClose';

export default function PopupCreate({ open, handleClose }) {
    //History
    const history = useHistory();

    //dispatch
    const dispatch = useDispatch();

    //FETCH_SEARCH_CATEGORY_START
    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
        });
    }, []);

    // get supplierCategoryList
    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);

    const [lastId, setLastId] = useState(1); // State để lưu giữ id cuối cùng

    useEffect(() => {
        const getNextId = () => {
            if (supplierCategoryList.length > 0) {
                const newLastId = supplierCategoryList[supplierCategoryList.length - 1].items.id;
                setLastId(newLastId + 1); // Cập nhật giá trị lastId
            } else {
                setLastId(1); // Nếu danh sách rỗng, thiết lập lại lastId về 1
            }
        };

        getNextId(); // Gọi hàm để lấy id khi supplierCategoryList thay đổi
    }, [supplierCategoryList]);

    //use form
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    //category division
    const optionCategoryDivision = [
        { name: 'Ngành' },
        { name: 'Nhóm' },
        { name: 'Mục' }
    ]

    //supplierCodeValue
    // const arraySupplierCode = [...new Set(getLocalStorageData('supplierList').map(item => item.items.supplierCode))];
    // console.log(arraySupplierCode);
    // const optionSupplierCode = arraySupplierCode.map(supplierCode => ({
    //     name: supplierCode
    // }));

    const optionSupplierCode = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.items.supplierCode)))
        .map(supplierCode => ({
            name: supplierCode
        }));

    //dialog
    const [openAgree, setOpenAgree] = useState(false);

    const handleOpenAgree = (errors) => {
        const length = Object.keys(errors).length;
        // console.log(length);
        if (length == 0) {
            setOpenAgree(true);
        } else {
            setOpenAgree(false);
        }
    };

    const handleCloseAgree = () => {
        setOpenAgree(false);
    };

    //onSubmit
    const [infoCreate, setInfoCreate] = useState(null)
    const onSubmit = (data) => {
        // console.log(data);
        const id = lastId
        let categorization = ''
        if (data.categoryDivision.name) {
            categorization = data.categoryDivision.name
        } else {
            categorization = data.categoryDivision.value.name
        }
        const getInfo = {
            categorization: categorization,
            note: data.note,
            items: {
                id: parseInt(id),
                supplierCode: data.supplierCode.name,
                supplierName: '',
                category: data.category,
                code: '',
                deptCode: '',
                phone: '',
                email: '',
                city: '',
                district: '',
                ward: '',
                address: '',
                status: 2,
            }
        }
        // console.log('getInfo', getInfo);
        setInfoCreate(getInfo)
    };

    //Back List supplier 
    const handlAgree = () => {
        dispatch({ type: SupplierCategoryAction.CREATE_CATEGORY_START, payload: { info: infoCreate } })
        handleCloseAgree()
        handleClose()
    };

    return (
        <div className={styles['div-popup-create']}>
            <Dialog open={open} onClose={handleClose} className={styles['div-dialog']}>
                <div className={styles['div-title']}>
                    <div className={styles['div-p-close']}>
                        <div className={styles['div-p']}>
                            <p>Tạo mới danh mục NCC</p>
                        </div>
                        <div className={styles['div-close']}>
                            <button onClick={handleClose}>
                                <IconClose />
                            </button>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent className={styles['div-dialog-content']}>
                        <div className={styles['label-select']}>
                            <div className={styles['custom-label-select']}>
                                <label>Thuộc danh mục</label>
                                <Controller
                                    control={control}
                                    rules={{ required: false }}
                                    name="categoryDivision"
                                    render={({ field }) => (
                                        <>
                                            <DropdownSelect
                                                {...field}
                                                option={optionCategoryDivision}
                                            />
                                        </>
                                    )}
                                />
                            </div>

                            <div className={styles['custom-label-select']}>
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

                        <div className={styles['custom-label-category']}>
                            <label>Tên danh mục<span className={styles['span-required']}>*</span>:</label>
                            <div>
                                <input
                                    type="text"
                                    {...register('category', { required: true })}
                                    placeholder="Nhập tên danh mục"
                                />
                                {errors.category && <span className={styles['error-message']}>Tên danh mục là bắt buộc</span>}
                            </div>
                        </div>

                        <div className={styles['custom-label-note']}>
                            <label>Ghi chú</label>
                            <input
                                type="text"
                                {...register('note')}
                                placeholder="Nhập ghi chú"
                            />
                        </div>

                    </DialogContent>
                    <DialogActions className={styles['div-dialog-action']}>
                        <button
                            className={styles['btn-close']}
                            onClick={handleClose}>
                            Đóng
                        </button>
                        <button
                            className={styles['btn-save-out']}
                            type='submit'
                            onClick={() => handleOpenAgree(errors)}
                        >
                            Lưu & Thoát
                        </button>
                        <button
                            className={styles['btn-save-continue']}
                            type='submit'
                            onClick={() => handleOpenAgree(errors)}
                        >
                            Lưu & Tiếp tục
                        </button>
                    </DialogActions>
                </form>
            </Dialog>
            <Dialog
                open={openAgree}
                onClose={handleCloseAgree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có muốn tạo NCC không"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAgree}>Hủy bỏ</Button>
                    <Button
                        onClick={handlAgree}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}