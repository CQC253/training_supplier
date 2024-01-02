import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './PopupUpdate.module.scss'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import SupplierCategoryAction from "redux/category/action"

import DropdownSelect from '../dropdown/Dropdown';
import { getLocalStorageData } from 'redux/supplier/localStorageUtils';
import { useForm, Controller } from 'react-hook-form';

import IconClose from 'shared/containers/icons/iconPopupCreate/IconClose';

export default function PopupUpdate({ open, handleClose, id }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);
    const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm();

    const [openAgree, setOpenAgree] = useState(false);
    const [infoCreate, setInfoCreate] = useState(null)

    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
        });
    }, []);

    useEffect(() => {
        const supplierToUpdate = supplierCategoryList.find(supplier => supplier.items.id === id);

        if (supplierToUpdate) {
            setValue('categorization', supplierToUpdate.categorization);
            setValue('supplierCode', supplierToUpdate.items.supplierCode);
            setValue('category', supplierToUpdate.items.category);
            setValue('note', supplierToUpdate.note);
        }
    }, []); 
    const categorizationValue = watch('categorization');
    const supplierCodeValue = watch('supplierCode');

    const optionCategorization = [
        { name: 'Ngành' },
        { name: 'Nhóm' },
        { name: 'Mục' }
    ]
    const optionSupplierCode = Array.from(new Set(getLocalStorageData('supplierList')
        .map(item => item.items.supplierCode)))
        .map(supplierCode => ({
            name: supplierCode
        }));

    const handleOpenAgree = (errors) => {
        const length = Object.keys(errors).length;
        if (length == 0) {
            setOpenAgree(true);
        } else {
            setOpenAgree(false);
        }
    };

    const handleCloseAgree = () => {
        setOpenAgree(false);
    };

    const onSubmit = (data) => {
        let categorization = ''
        if (data.categorization.name) {
            categorization = data.categorization.name
        } else {
            categorization = data.categorization
        }

        let supplierCode = ''
        if (data.supplierCode.name) {
            supplierCode = data.supplierCode.name
        } else {
            supplierCode = data.supplierCode
        }

        const supplierToUpdate = supplierCategoryList.find(supplier => supplier.items.id === id);
        const updateItems = supplierToUpdate.items

        const getInfo = {
            categorization: categorization,
            note: data.note,
            items: {
                id: parseInt(id),
                supplierCode: supplierCode,
                supplierName: updateItems.supplierName || '',
                category: data.category,
                code: updateItems.code || '',
                deptCode: updateItems.deptCode || '',
                phone: updateItems.phone || '',
                email: updateItems.email || '',
                city: updateItems.city || '',
                district: updateItems.district || '',
                ward: updateItems.ward || '',
                address: updateItems.address || '',
                status: updateItems.status || 2,
            }
        }

        setInfoCreate(getInfo)
    };

    const handlAgree = () => {
        dispatch({ type: SupplierCategoryAction.UPDATE_CATEGORY_START, payload: { info: infoCreate } })
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
                                    name="categorization"
                                    render={({ field }) => (
                                        <>
                                            <DropdownSelect
                                                {...field}
                                                option={optionCategorization}
                                                value={categorizationValue}
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
                                                value={supplierCodeValue}
                                            />
                                            {errors.supplierCode && <span className={styles['error-message']}>Vui lòng chọn mã nhà cung cấp</span>}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className={styles['custom-label-category']}>
                            <label>Tên danh mục<span className={styles['span-required']}>*</span>:</label>
                            <div className={styles['div-input']}>
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
                    {"Bạn có muốn cập nhật NCC không"}
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