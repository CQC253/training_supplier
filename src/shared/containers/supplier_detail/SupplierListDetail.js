import React, { useState, useEffect } from 'react'
import styles from './SupplierListDetail.module.scss'
import IconStatus from '../icons/iconsSupplierListDetail/IconStatus'
import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useLocation, useParams } from 'react-router-dom';

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
    const handleStatus = () => {
        setIsDropdown(!isDropdown);
    };
    const handleBlur = () => {
        setIsDropdown(!isDropdown);
    };

    return (
        <div className={styles['div-supplier-detail']}>
            <div className={styles['div-update-status']}>
                <div className={styles['div-status']}>
                    <IconStatus
                        onClick={handleStatus}
                    // onBlur={handleBlur}
                    />
                    <p
                        onClick={handleStatus}
                    // onBlur={handleBlur}
                    >
                        Trạng thái
                    </p>
                </div>

                {isDropdown &&
                    <ul className={styles['dropdown-list']}>
                        <li className={styles['dropdown-item']}>
                            <p>Giao dịch</p>
                        </li>
                        <li className={styles['dropdown-item']}>
                            <p>Tạm dừng</p>
                        </li>
                    </ul>
                }
            </div>

            <div className={styles['div-detail']}>
                <div className={styles['div-detail-left']}>
                    <p>Tên nhà cung cấp: {supplier ? supplier.supplierName : ''}</p>
                    <p>Danh mục: {supplier ? supplier.category : ''}</p>
                    <p>Điện thoại: {supplier ? supplier.phone : ''}</p>
                    <p>Email: {supplier ? supplier.email : ''}</p>
                    <p>Công nợ: {supplier ? supplier.deptCode : ''}</p>
                    <p>Mã code: {supplier ? supplier.code : ''}</p>
                </div>

                <div className={styles['div-detail-right']}>
                    <p>Trạng thái: {supplier ? (supplier.status === 1 ? 'Giao dịch' : 'Tạm dừng') : ''}</p>
                    <p>Tỉnh/Thành phố: {supplier ? supplier.city : ''}</p>
                    <p>Quận/Huyện: {supplier ? supplier.district : ''}</p>
                    <p>Phường/Xã: {supplier ? supplier.ward : ''}</p>
                    <p>Địa chỉ cụ thể: {supplier ? supplier.address : ''}</p>
                </div>
            </div>
        </div>
    )
}
