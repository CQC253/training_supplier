import React, { useState, useEffect, useRef } from 'react'
import styles from './SupplierListDetail.module.scss'
import IconStatus from '../icons/iconsSupplierListDetail/IconStatus'
import IconBack from '../icons/iconsSupplierListDetail/IconBack';
import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useParams, Link, useHistory } from 'react-router-dom';
import Constants from 'utils/Constants';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierListDetail() {
    const { t } = useTranslation();
    const { id } = useParams();

    const { supplierListById } = useSelector((state) => state.SupplierReducer);
    const dispatch = useDispatch();

    const [isDropdown, setIsDropdown] = useState(false)
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        dispatch({
            type: supplierActions.GET_SUPPLIER_BY_ID_START,
            payload: { id: id }
        });
    }, []);

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


    const isDeleted = (rs) => {
        history.goBack();
    }

    const handleDelete = () => {
        dispatch({
            type: supplierActions.DELETE_SUPPLIER_START,
            payload: { id: id },
            callBack: isDeleted,
        })
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
                            {t('supplierDetail.status')}
                        </p>
                    </div>

                    {isDropdown &&
                        <ul className={styles['dropdown-list']} >
                            <li
                                className={`${styles['dropdown-item']} ${supplierListById ? (supplierListById?.status === Constants.COMMON.STATUS.TRANSACTION.KEY ? styles['active'] : '') : ''}`}
                                onClick={() => handleChangeStatus(id, Constants.COMMON.STATUS.TRANSACTION.KEY)}
                            >
                                <p>Giao dịch</p>
                            </li>
                            <li
                                className={`${styles['dropdown-item']} ${supplierListById ? (supplierListById?.status === Constants.COMMON.STATUS.PAUSE.KEY ? styles['active'] : '') : ''}`}
                                onClick={() => handleChangeStatus(id, Constants.COMMON.STATUS.PAUSE.KEY)}
                            >
                                <p>Tạm dừng</p>
                            </li>
                        </ul>
                    }
                </div>

                <div className={styles['div-detail']}>
                    <p className={styles['p-info']}>
                        {t('supplierDetail.info')}
                    </p>

                    <div className={styles['div-info-supp']}>
                        <div className={styles['div-detail-left']}>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.supplierName')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.supplierName : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.category')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.category?.categoryName : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.phone')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.phone : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.email')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.email : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.debtCode')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.debtCode : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.code')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.code : ''}
                                </span>
                            </div>
                        </div>

                        <div className={styles['div-detail-right']}>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.status')}</p>
                                <span
                                    className={supplierListById ? (supplierListById.status === Constants.COMMON.STATUS.TRANSACTION.KEY ? styles['transaction'] : styles['pause']) : ''}
                                >
                                    : {supplierListById ? (supplierListById.status === Constants.COMMON.STATUS.TRANSACTION.KEY ? Constants.COMMON.STATUS.TRANSACTION.VALUE : Constants.COMMON.STATUS.PAUSE.VALUE) : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.province')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.province : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.district')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.district : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.ward')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.ward : ''}
                                </span>
                            </div>
                            <div className={styles['custom-p-span']}>
                                <p>{t('supplierDetail.infoSupplier.address')}</p>
                                <span>
                                    : {supplierListById ? supplierListById?.address : ''}
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
                    <p onClick={handleClickBack}>{t('supplierDetail.action.back')}</p>
                </div>

                <div className={styles['div-bottom-right']}>
                    <Link
                        to={'/supplier/list'}
                    >
                        <button
                            className={styles['btn-update']}
                        >
                            {t('supplierDetail.action.update')}
                        </button>
                    </Link>
                    <button
                        className={styles['button-delete']}
                        onClick={handleClickOpen}
                    >
                        {t('supplierDetail.action.delete')}
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClickClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {t('supplierDetail.action.confirm')}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClickClose}>
                                {t('supplierDetail.action.cancel')}
                            </Button>
                            <Button onClick={handleDelete} autoFocus>
                                {t('supplierDetail.action.agree')}
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
