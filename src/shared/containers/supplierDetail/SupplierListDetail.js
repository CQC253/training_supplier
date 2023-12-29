import React, { useState, useEffect, useRef } from 'react'
import styles from './SupplierListDetail.module.scss'
import IconStatus from '../icons/iconsSupplierListDetail/IconStatus'
import IconBack from '../icons/iconsSupplierListDetail/IconBack';
import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useParams, Link, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierListDetail() {
    const { id } = useParams();

    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);
    const dispatch = useDispatch();

    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

    const supplier = supplierListRedux.find((item) => item.items.id == id);

    const handleStatus = () => {
        setIsDropdown(!isDropdown);
    };
    const handleChangeStatus = (id, status) => {
        dispatch({
            type: supplierActions.UPDATE_STATUS_SUPP_DETAIL_START,
            payload: { id: id, status: status },
        });
    }
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
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch({ type: supplierActions.DELETE_SUPPLIER_START, payload: { id: id } })
        history.goBack();
    }

    const handleClickBack = () => {
        history.goBack();
    }

    return (
        <div className={styles['div-supplier-detail']}>
            <div className={styles['div-top']}>
                <div className={styles['div-update-status']} >
                    <div className={styles['div-status']} ref={dropdownRef}>
                        <button onClick={handleStatus}>
                            <IconStatus />
                        </button>
                        <p onClick={handleStatus}>
                            Trạng thái
                        </p>
                    </div>

                    {isDropdown &&
                        <ul className={styles['dropdown-list']} >
                            <li
                                className={`${styles['dropdown-item']} ${supplier ? (supplier.items.status === 1 ? styles['active'] : '') : ''}`}
                                onClick={() => handleChangeStatus(id, 1)}
                            >
                                <p>Giao dịch</p>
                            </li>
                            <li
                                className={`${styles['dropdown-item']} ${supplier ? (supplier.items.status === 2 ? styles['active'] : '') : ''}`}
                                onClick={() => handleChangeStatus(id, 2)}
                            >
                                <p>Tạm dừng</p>
                            </li>
                        </ul>
                    }
                </div>

                <div className={styles['div-detail']}>
                    <p className={styles['p-info']}>
                        Thông tin nhà cung cấp
                    </p>

                    <div className={styles['div-info-supp']}>
                        <div className={styles['div-detail-left']}>
                            <div className={styles['custom-p-span']}>
                                <p>Tên nhà cung cấp</p>
                                <span>
                                    : {supplier ? supplier.items.supplierName : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Danh mục</p>
                                <span>
                                    : {supplier ? supplier.items.category : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Điện thoại</p>
                                <span>
                                    : {supplier ? supplier.items.phone : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Email</p>
                                <span>
                                    : {supplier ? supplier.items.email : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Công nợ</p>
                                <span>
                                    : {supplier ? supplier.items.deptCode : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Mã code</p>
                                <span>
                                    : {supplier ? supplier.items.code : ''}
                                </span>
                            </div>
                        </div>

                        <div className={styles['div-detail-right']}>
                            <div className={styles['custom-p-span']}>
                                <p>Trạng thái</p>
                                <span
                                    className={supplier ? (supplier.items.status === 1 ? styles['transaction'] : styles['pause']) : ''}
                                >
                                    : {supplier ? (supplier.items.status === 1 ? 'Giao dịch' : 'Tạm dừng') : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Tỉnh/Thành phố</p>
                                <span>
                                    : {supplier ? supplier.items.city : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Quận/Huyện</p>
                                <span>
                                    : {supplier ? supplier.items.district : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Phường/Xã</p>
                                <span>
                                    : {supplier ? supplier.items.ward : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Địa chỉ cụ thể</p>
                                <span>
                                    : {supplier ? supplier.items.address : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles['div-bottom']}>
                <div className={styles['div-bottom-left']}>
                    <button
                        onClick={handleClickBack}
                    >
                        <IconBack />
                    </button>
                    <p  onClick={handleClickBack}>Quay lại</p>
                </div>

                <div className={styles['div-bottom-right']}>
                    <Link
                        to={'/supplier/list'}
                    >
                        <button
                            className={styles['btn-update']}
                        >
                            Sửa
                        </button>
                    </Link>
                    <button
                        className={styles['button-delete']}
                        onClick={handleClickOpen}
                    >
                        Xóa
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Bạn có muốn xóa hay không"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClickClose}>Hủy bỏ</Button>
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
