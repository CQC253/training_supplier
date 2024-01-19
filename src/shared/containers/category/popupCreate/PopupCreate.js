import React, { useState, useEffect } from 'react'
import styles from './PopupCreate.module.scss'
import { Dialog, DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import SupplierCategoryAction from "redux/category/action"

import DropdownSelect from '../dropdown/Dropdown';
import { useForm, Controller } from 'react-hook-form';

import IconClose from 'shared/containers/icons/iconPopupCreate/IconClose';

export default function PopupCreate({ open, handleClose, id }) {
    const dispatch = useDispatch();
    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);
    const { register, handleSubmit, control, formState: { errors }, setValue, clearErrors } = useForm();

    const [parentArray, setParentArray] = useState([])
    const [selectedParentName, setSelectedParentName] = useState(null);

    const [openAgree, setOpenAgree] = useState(false);
    const [infoCreate, setInfoCreate] = useState(null)


    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        });
    }, []);
    useEffect(() => {
        setParentArray(supplierCategoryList?.parent)
    }, [supplierCategoryList]);

    const optionParentName = parentArray.map(item => ({
        name: item.categoryName,
        code: item.id
    }))

    const handleParentNameChange = (event) => {
        if (event) {
            clearErrors('parentName')
            setValue("parentName", event.code)
        }
        setSelectedParentName(event);
    }

    const handleOpenAgree = () => {
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
        handleOpenAgree()

        const getInfo = {
            parent_id: data.parentName ? data.parentName : null,
            categoryName: data.category,
            note: data.note,
        }
        setInfoCreate(getInfo)
    };

    const isAgree = (rs) => {
        handleCloseAgree()
        handleClose()
    }

    const handlAgree = () => {
        dispatch({ 
            type: SupplierCategoryAction.CREATE_CATEGORY_START,
            payload: { info: infoCreate },
            callBack: isAgree,
        })
    };

    return (
        <div className={styles['div-popup-create']}>
            <Dialog
                open={open}
                onClose={handleClose}
                className={styles['div-dialog']}
                maxWidth='md'
                fullWidth
                PaperProps={{ style: { width: '800px' } }}
            >
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
                                    name="parentName"
                                    render={({ field }) => (
                                        <>
                                            <DropdownSelect
                                                {...field}
                                                option={optionParentName}
                                                selectedOption={selectedParentName}
                                                onChange={handleParentNameChange}
                                                placeholder={optionParentName[0]?.name}
                                            />
                                        </>
                                    )}
                                />
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