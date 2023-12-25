import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './PopupCreate.module.scss'
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"

import DropdownSelect from '../../supplierCreate/dropdown/Dropdown';
import { getLocalStorageData } from 'redux/supplier/localStorageUtils';
import { useForm, Controller } from 'react-hook-form';

import IconClose from 'shared/containers/icons/iconPopupCreate/IconClose';

export default function PopupCreate({ open, handleClose }) {
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
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    //category division
    const optionCategoryDivision = [
        { name: 'Ngành' },
        { name: 'Nhóm' },
        { name: 'Mục' }
    ]

    //supplierCodeValue
    const optionSupplierCode = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.supplierCode))).map(supplierCode => ({
        name: supplierCode
    }));

    //onSubmit
    const [infoCreate, setInfoCreate] = useState(null)
    const onSubmit = (data) => {
        console.log(data);
        // const id = getNextId()

        // const getInfo = {
        //     id: parseInt(id),
        //     supplierCode: data.supplierCode.name,
        //     supplierName: data.supplierName,
        //     category: data.category.name,
        //     code: parseInt(data.code),
        //     deptCode: parseInt(data.deptCode.name),
        //     phone: data.phone,
        //     email: data.email,
        //     city: data.city.name,
        //     district: data.district.name,
        //     ward: data.ward.name,
        //     address: data.address,
        //     status: data.status.name && data.status.name == "Giao dịch" ? 1 : 2,
        // }
        // // console.log('getInfo', getInfo);
        // setInfoCreate(getInfo)
    };

    //Back List supplier 
    const handlAgree = () => {
        // console.log(infoCreate);
        dispatch({ type: supplierActions.CREATE_SUPPLIER_START, payload: { info: infoCreate } })
        history.push('/supplier/list');
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
                                {errors.address && <span className={styles['error-message']}>Tên danh mục là bắt buộc</span>}
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
                        >
                            Lưu & Thoát
                        </button>
                        <button
                            className={styles['btn-save-continue']}
                            type='submit'
                        >
                            Lưu & Tiếp tục
                        </button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}