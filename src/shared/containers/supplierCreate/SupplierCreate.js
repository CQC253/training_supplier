import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import styles from './SupplierCreate.module.scss'
import { useForm, Controller } from 'react-hook-form';
import Constants from 'utils/Constants';

import { useSelector, useDispatch } from 'react-redux';
import supplierActions from "redux/supplier/action"
import ProvincesActions from "redux/provinces/action";
import SupplierCategoryAction from 'redux/category/action';

import DropdownSelect from './dropdown/Dropdown';
import DropdownGroup from './dropdown/DropdownGroup';
import IconBack from '../icons/iconsSupplierCreate/IconBack';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function SupplierCreate() {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const { supplierList } = useSelector((state) => state.SupplierReducer);
    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);
    const {
        provinces,
        districts,
        wards,
    } = useSelector((state) => state.ProvincesReducer);

    const { register, handleSubmit, control, clearErrors, formState: { errors }, setValue } = useForm();

    const [supplierListRedux, setSupplierListRedux] = useState([])
    const [categoryListRedux, setCategoryListRedux] = useState([])
    const [selectedDebtCode, setSelectedDebtCode] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [groupCategory, setGroupCategory] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({
        name: Constants.COMMON.STATUS.TRANSACTION.VALUE,
        code: Constants.COMMON.STATUS.TRANSACTION.KEY
    });
    const [open, setOpen] = useState(false);
    const [infoCreate, setInfoCreate] = useState(null)

    useEffect(() => {
        if (Array.isArray(supplierList)) {
            setSupplierListRedux(supplierList)
        }
    }, [supplierList]);

    useEffect(() => {
        setCategoryListRedux(supplierCategoryList?.all)
    }, [supplierCategoryList]);

    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                statusValue: '',
                inputValue: '',
                addressValue: ''
            }
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: ProvincesActions.FETCH_PROVINCES_START,
        });
    }, [dispatch]);

    useEffect(() => {
        setSelectedDistrict(null);
        setSelectedWard(null);
    }, [selectedProvince]);

    useEffect(() => {
        const createGroupedCategory = () => {
            const groupedCategories = categoryListRedux?.filter(item => !item.parent_id);

            const groupCategoryData = groupedCategories?.map(category => {
                const items = categoryListRedux?.filter(item => item.parent_id === category.id)?.map(child => ({
                    label: child.categoryName,
                    value: child.id
                }));

                return {
                    label: category.categoryName,
                    code: category.id,
                    items: items
                };
            });

            setGroupCategory(groupCategoryData);
        };

        createGroupedCategory();
    }, [categoryListRedux]);

    const optionDebtCode = Array.from(new Set(supplierListRedux?.map(item => item.debtCode)))?.map(debtCode => ({
        name: debtCode,
        code: debtCode
    }));

    const optionProvince = provinces?.map(province => ({
        name: province.name,
        code: province.code
    }));

    const optionDistrict = districts?.map(district => ({
        name: district.name,
        code: district.code
    }));

    const optionWard = wards?.map(ward => ({
        name: ward.name,
        code: ward.name
    }));

    const optionStatus = Array.from(new Set(supplierListRedux?.map(item => item.status)))?.map(status => ({
        name: status && status == Constants.COMMON.STATUS.TRANSACTION.KEY ? Constants.COMMON.STATUS.TRANSACTION.VALUE : Constants.COMMON.STATUS.PAUSE.VALUE,
        code: status
    }));

    const handleDebtCodeChange = (event) => {
        if (event) {
            clearErrors('debtCode')
            setValue("debtCode", event.name)
        }
        setSelectedDebtCode(event);
    };

    const handleCategoryChange = (event) => {
        if (event) {
            clearErrors('category')
            setValue("category", event)
        }
        setSelectedCategory(event);
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event);

        if (event) {
            clearErrors('province')
            setValue("province", event.name)
        }

        dispatch({
            type: ProvincesActions.FETCH_DISTRICTS_START,
            payload: event.code
        });
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event)
        if (event) {
            clearErrors('district')
            setValue("district", event.name)
        }

        dispatch({
            type: ProvincesActions.FETCH_WARDS_START,
            payload: event.code
        });
    };

    const handleWardChange = (event) => {
        setSelectedWard(event);
        if (event) {
            clearErrors('ward')
            setValue("ward", event.name)
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event)

        if (event) {
            setValue("status", event.name)
        }
    }

    const onSubmit = (data) => {
        handleClickOpen()

        const getInfo = {
            category_id: data.category,
            supplierName: data.supplierName,
            code: parseInt(data.code),
            debtCode: parseInt(data.debtCode),
            phone: data.phone,
            email: data.email,
            province: data.province,
            district: data.district,
            ward: data.ward,
            address: data.address,
            status: data.status ? (data.status == Constants.COMMON.STATUS.TRANSACTION.VALUE ? Constants.COMMON.STATUS.TRANSACTION.KEY : Constants.COMMON.STATUS.PAUSE.KEY) : Constants.COMMON.STATUS.TRANSACTION.KEY,
        }

        setInfoCreate(getInfo)
    };

    const handleClickOpen = () => {
        const length = Object.keys(errors).length;
        if (length == 0) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const isCreate = (rs) => {
        history.push('/supplier/list');
    }

    const handlAgree = () => {
        dispatch({
            type: supplierActions.CREATE_SUPPLIER_START,
            payload: { info: infoCreate },
            callBack: isCreate,
        })
    };

    return (
        <div className={styles['div-supplier-create']}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles['div-top']}>
                    <div className={styles['div-create']}>
                        <p className={styles['p-info']}>
                            {t('createSupplier.info')}
                        </p>

                        <div className={styles['div-info-supp']}>
                            <div className={styles['div-create-left']}>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.supplierName')}<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="text"
                                        {...register('supplierName', { required: true })}
                                        placeholder={t('createSupplier.placeholder.supplierName')}
                                    />
                                    {errors.supplierName && <span className={styles['error-message']}>{t('createSupplier.error.supplierName')}</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.code')}<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="number"
                                        {...register('code', {
                                            required: `${t('createSupplier.error.code.required')}`,
                                            min: { value: 251, message: `${t('createSupplier.error.code.min')}` },
                                            max: { value: 253, message: `${t('createSupplier.error.code.max')}` }
                                        })}
                                        placeholder={t('createSupplier.placeholder.code')}
                                    />
                                    {errors.code && <span className={styles['error-message']}>{errors.code.message}</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.province')}<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="province"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionProvince}
                                                    selectedOption={selectedProvince}
                                                    onChange={handleProvinceChange}
                                                    placeholder={t('createSupplier.placeholder.province')}
                                                />
                                                {errors.province && <span className={styles['error-message']}>{t('createSupplier.error.province')}</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.address')}</label>
                                    <input
                                        type="text"
                                        {...register('address')}
                                        placeholder={t('createSupplier.placeholder.address')}
                                    />
                                </div>
                            </div>

                            <div className={styles['div-create-middle']}>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.category')}<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="category"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownGroup
                                                    {...field}
                                                    option={groupCategory}
                                                    selectedOption={selectedCategory}
                                                    onChange={handleCategoryChange}
                                                    placeholder={t('createSupplier.placeholder.category')}
                                                />
                                                {errors.category && <span className={styles['error-message']}>{t('createSupplier.error.category')}</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.debtCode')}<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="debtCode"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionDebtCode}
                                                    selectedOption={selectedDebtCode}
                                                    onChange={handleDebtCodeChange}
                                                    placeholder={t('createSupplier.placeholder.debtCode')}
                                                />
                                                {errors.debtCode && <span className={styles['error-message']}>{t('createSupplier.error.debtCode')}</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.district')}<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="district"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionDistrict}
                                                    selectedOption={selectedDistrict}
                                                    onChange={handleDistrictChange}
                                                    placeholder={t('createSupplier.placeholder.district')}
                                                    emptyMessage={t('createSupplier.error.emptyMessage.district')}
                                                />
                                                {errors.district && <span className={styles['error-message']}>{t('createSupplier.error.district')}</span>}
                                            </>
                                        )}
                                    />
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.status')}</label>
                                    <Controller
                                        control={control}
                                        name="status"
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={optionStatus}
                                                    selectedOption={selectedStatus}
                                                    onChange={handleStatusChange}
                                                    placeholder={t('createSupplier.placeholder.status')}
                                                />
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className={styles['div-create-right']}>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.phone')}<span className={styles['span-required']}>*</span></label>
                                    <input
                                        type="tel"
                                        {...register('phone', { required: true })}
                                        placeholder={t('createSupplier.placeholder.phone')}
                                    />
                                    {errors.phone && <span className={styles['error-message']}>{t('createSupplier.error.phone')}</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.email')}</label>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: `${t('createSupplier.error.email')}`,
                                            },
                                        })}
                                        placeholder={t('createSupplier.placeholder.email')}
                                    />
                                    {errors.email && <span className={styles['error-message']}>{errors.email.message}</span>}
                                </div>
                                <div className={styles['custom-label-input']}>
                                    <label>{t('createSupplier.infoSupplier.ward')}<span className={styles['span-required']}>*</span></label>
                                    <Controller
                                        control={control}
                                        name="ward"
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <>
                                                <DropdownSelect
                                                    {...field}
                                                    option={selectedDistrict ? optionWard : []}
                                                    selectedOption={selectedWard}
                                                    onChange={handleWardChange}
                                                    placeholder={t('createSupplier.placeholder.ward')}
                                                    emptyMessage={t('createSupplier.error.emptyMessage.ward')}
                                                />
                                                {errors.ward && <span className={styles['error-message']}>{t('createSupplier.error.ward')}</span>}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['div-bottom']}>
                    <div className={styles['div-bottom-left']} onClick={handleGoBack}>
                        <IconBack />
                        <p>{t('createSupplier.action.back')}</p>
                    </div>

                    <div className={styles['div-bottom-right']}>
                        <button
                            className={styles['btn-update']}
                            type='submit'
                        >
                            {t('createSupplier.action.save')}
                        </button>
                        <button
                            className={styles['button-delete']}
                            onClick={handleGoBack}
                        >
                            {t('createSupplier.action.delete')}
                        </button>
                        <Dialog
                            open={open}
                            onClose={handleClickClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {t('createSupplier.action.confirm')}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClickClose}>{t('createSupplier.action.cancel')}</Button>
                                <Button
                                    onClick={handlAgree}
                                >
                                    {t('createSupplier.action.agree')}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </form>
        </div>
    )
}
