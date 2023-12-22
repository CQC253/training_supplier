import React, { useState, useEffect, useRef } from 'react'
import styles from './SupplierCreate.module.scss'
import IconBack from '../icons/iconsSupplierCreate/IconBack';
import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useParams, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierListDetail() {
    // Lấy id từ URL
    const { id } = useParams();

    //History
    const history = useHistory();

    //get supplierList
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);

    //dispatch
    const dispatch = useDispatch();

    //FETCH_SEARCH_SUPPLIER_LIST
    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

    // Tìm NCC dựa trên id
    const supplier = supplierListRedux.find((item) => item.id == id);

    //isDropdown
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null);
    const handleStatus = () => {
        setIsDropdown(!isDropdown);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); //Xử lí blur

    //handleChangeStatus
    const handleChangeStatus = (id, status) => {
        dispatch({
            type: supplierActions.UPDATE_STATUS_SUPP_DETAIL_START,
            payload: { id: id, status: status },
        });
    }

    //dialog component
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //handleDelete
    const handleDelete = () => {
        dispatch({ type: supplierActions.DELETE_SUPPLIER_START, payload: { id: id } })
        history.push('/supplier/list');
    }

    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <div className={styles['div-supplier-create']}>
            <div className={styles['div-top']}>
                <div className={styles['div-create']}>
                    <p className={styles['p-info']}>
                        Thông tin nhà cung cấp
                    </p>

                    <div className={styles['div-info-supp']}>
                        <div className={styles['div-create-left']}>
                            <div className={styles['custom-p-input']}>
                                <p>Tên nhà cung cấp</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Mã code</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Tỉnh/Thành phố</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Địa chỉ cụ thể</p>
                                <input />
                            </div>
                        </div>

                        <div className={styles['div-create-middle']}>
                            <div className={styles['custom-p-input']}>
                                <p>Danh mục</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Công nợ</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Quận/Huyện</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Trạng thái</p>
                                <input />
                            </div>
                        </div>

                        <div className={styles['div-create-right']}>
                            <div className={styles['custom-p-input']}>
                                <p>Phường/Xã</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Số Điện thoại</p>
                                <input />
                            </div>
                            <div className={styles['custom-p-input']}>
                                <p>Email</p>
                                <input />
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
                            <Button onClick={handleDelete} autoFocus>
                                Đồng ý
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
