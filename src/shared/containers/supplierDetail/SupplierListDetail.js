import React, { useState, useEffect, useRef } from 'react'
import styles from './SupplierListDetail.module.scss'
import IconStatus from '../icons/iconsSupplierListDetail/IconStatus'
import IconBack from '../icons/iconsSupplierListDetail/IconBack';
import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useLocation, useParams, Link, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierListDetail() {
    // Lấy id từ URL
    const { id } = useParams();

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
    const history = useHistory();

    const handleDelete = () => {
        dispatch({ type: supplierActions.DELETE_SUPPLIER_START, payload: { id: id } })
        history.push('/supplier/list');
    }

    return (
        <div className={styles['div-supplier-detail']}>
            <div className={styles['div-top']}>
                <div className={styles['div-update-status']} >
                    <div className={styles['div-status']} ref={dropdownRef}>
                        <IconStatus onClick={handleStatus} />
                        <p onClick={handleStatus}>
                            Trạng thái
                        </p>
                    </div>

                    {isDropdown &&
                        <ul className={styles['dropdown-list']} >
                            <li
                                className={`${styles['dropdown-item']} ${supplier ? (supplier.status === 1 ? styles['active'] : '') : ''}`}
                                onClick={() => handleChangeStatus(id, 1)}
                            >
                                <p>Giao dịch</p>
                            </li>
                            <li
                                className={`${styles['dropdown-item']} ${supplier ? (supplier.status === 2 ? styles['active'] : '') : ''}`}
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
                                    : {supplier ? supplier.supplierName : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Danh mục</p>
                                <span>
                                    : {supplier ? supplier.category : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Điện thoại</p>
                                <span>
                                    : {supplier ? supplier.phone : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Email</p>
                                <span>
                                    : {supplier ? supplier.email : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Công nợ</p>
                                <span>
                                    : {supplier ? supplier.deptCode : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Mã code</p>
                                <span>
                                    : {supplier ? supplier.code : ''}
                                </span>
                            </div>
                        </div>

                        <div className={styles['div-detail-right']}>
                            <div className={styles['custom-p-span']}>
                                <p>Trạng thái</p>
                                <span
                                    className={supplier ? (supplier.status === 1 ? styles['transaction'] : styles['pause']) : ''}
                                >
                                    : {supplier ? (supplier.status === 1 ? 'Giao dịch' : 'Tạm dừng') : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Tỉnh/Thành phố</p>
                                <span>
                                    : {supplier ? supplier.city : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Quận/Huyện</p>
                                <span>
                                    : {supplier ? supplier.district : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Phường/Xã</p>
                                <span>
                                    : {supplier ? supplier.ward : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>Địa chỉ cụ thể</p>
                                <span>
                                    : {supplier ? supplier.address : ''}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className={styles['div-bottom']}>
                <Link
                    to={'/supplier/list'}
                >
                    <div className={styles['div-bottom-left']}>
                        <IconBack />
                        <p>Quay lại</p>
                    </div>
                </Link>

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
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Bạn có muốn xóa hay không"}
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
