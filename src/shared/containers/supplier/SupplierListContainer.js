import React, { useState, useEffect, useRef } from 'react'
import Constants from 'utils/Constants'

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ReactPaginate from 'react-paginate';
import DropdownSelect from './dropdown/Dropdown';

import styles from './SupplierListContainer.module.scss'
import SupplierIcon1 from '../icons/iconsSupplierList/SupplierIcon1'
import SupplierIcon2 from '../icons/iconsSupplierList/SupplierIcon2'
import SupplierIconOperate from '../icons/iconsSupplierList/SupplierIconOperate'
import SupplierIconSetting from '../icons/iconsSupplierList/SupplierIconSetting'
import SupplierIconAction from '../icons/iconsSupplierList/SupplierIconAction'
import SupplierIconEdit from '../icons/iconsSupplierList/SupplierIconEdit'
import SupplierIconDelete from '../icons/iconsSupplierList/SupplierIconDelete'
import SupplierIconNext from '../icons/iconsSupplierList/SupplierIconNext'
import SupplierIconPrev from '../icons/iconsSupplierList/SupplierIconPrev'
import SupplierIconArrow from '../icons/iconsSupplierList/SupplierIconArrow';
import SupplierIconInfo from '../icons/iconsSupplierList/SuppliericonInfo';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useLocation, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SupplierContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation();

    const { supplierList } = useSelector((state) => state.SupplierReducer);
    const [supplierListRedux, setSupplierListRedux] = useState([])

    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useState({
        input: queryParams.get('input') || '',
        status: queryParams.get('status') || '',
        address: queryParams.get('address') || '',
    });
    const [inputValue, setInputValue] = useState('');
    const [statusValue, setStatusValue] = useState('')
    const [addressValue, setAddressValue] = useState('')

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [action, setAction] = useState([])

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const selectItemsPerPage = [5, 10, 50];
    const [firstItemIndex, setFirstItemIndex] = useState(0);
    const [lastItemIndex, setLastItemIndex] = useState(0);
    const [displayedSupplierList, setDisplayedSupplierList] = useState([]);

    const actionListRef = useRef(null);
    const tableRef = useRef(null);
    const supplierListReduxRef = useRef(supplierListRedux);
    const deleteDispatchedRef = useRef(false);

    useEffect(() => {
        if (Array.isArray(supplierList)) {
            setSupplierListRedux(supplierList)
        }
    }, [supplierList]);

    useEffect(() => {
        supplierListReduxRef.current = supplierListRedux;
    }, [supplierListRedux]);

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
        function handleActionListPosition() {
            if (action) {
                const actionListElement = actionListRef.current;
                const tableElement = tableRef.current;

                if (actionListElement && tableElement) {
                    const actionListRect = actionListElement.getBoundingClientRect();
                    const tableRect = tableElement.getBoundingClientRect();

                    if (actionListRect.bottom > tableRect.bottom) {
                        actionListElement.style.transform = `translate(${-80}%, ${-155}%)`;
                    }
                }
            }
        }

        handleActionListPosition();
    }, [action]);

    const optionStatus = Array.from(new Set(supplierListRedux.map(item => item.status)))
        .map(status => ({
            value: status,
            label: status === Constants.COMMON.STATUS.TRANSACTION.KEY ? Constants.COMMON.STATUS.TRANSACTION.VALUE : Constants.COMMON.STATUS.PAUSE.VALUE
        }));
    const optionAddress = Array.from(new Set(supplierListRedux.map((item) => {
        const fullAddress = `${item.address}, ${item.ward}, ${item.district}, ${item.province}`;
        return fullAddress;
    })))
        .map((address) => ({
            value: address,
            label: address,
        }));

    const CategoryTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#000',
            color: '#FFF',
            boxShadow: theme.shadows[1],
            fontSize: 12,
        },
    }));

    const EmailTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#000',
            color: '#FFF',
            boxShadow: theme.shadows[1],
            fontSize: 12,
        },
    }));

    const AddressTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#000',
            color: '#FFF',
            boxShadow: theme.shadows[1],
            fontSize: 12,
        },
    }));

    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleStatus = (event) => {
        deleteDispatchedRef.current = true;
        toast.dismiss();

        setStatusValue(event.label)
        const queryParams = new URLSearchParams(location.search);
        const inputValue = queryParams.get('input') || '';
        const addressValue = queryParams.get('address') || '';
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                statusValue: event.value,
                inputValue: inputValue,
                addressValue: addressValue
            }
        })
        setCurrentPage(0)
    };
    useEffect(() => {
        setSearchParams({ ...searchParams, status: statusValue })
    }, [statusValue])

    const handleAddress = (event) => {
        deleteDispatchedRef.current = true;
        toast.dismiss();

        setAddressValue(event.value)
        const queryParams = new URLSearchParams(location.search);
        const inputValue = queryParams.get('input') || '';
        const statusValue = queryParams.get('status') ? (queryParams.get('status') == Constants.COMMON.STATUS.TRANSACTION.VALUE ? Constants.COMMON.STATUS.TRANSACTION.KEY : Constants.COMMON.STATUS.PAUSE.KEY) : '' || '';
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                addressValue: event.value,
                inputValue: inputValue,
                statusValue: statusValue
            }
        })
        setCurrentPage(0)
    };
    useEffect(() => {
        setSearchParams({ ...searchParams, address: addressValue })
    }, [addressValue])

    const handleSearchHistory = () => {
        const searchParamsString = new URLSearchParams(searchParams).toString();
        history.push(`${location.pathname}?${searchParamsString}`);
    };
    useEffect(() => {
        handleSearchHistory()
    }, [searchParams]);

    const handleSearch = () => {
        deleteDispatchedRef.current = true;
        toast.dismiss();

        setSearchParams({ ...searchParams, input: inputValue })
        const queryParams = new URLSearchParams(location.search);
        const statusValue = queryParams.get('status') ? (queryParams.get('status') == Constants.COMMON.STATUS.TRANSACTION.VALUE ? Constants.COMMON.STATUS.TRANSACTION.KEY : Constants.COMMON.STATUS.PAUSE.KEY) : '' || '';
        const addressValue = queryParams.get('address') || '';
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                inputValue: inputValue,
                statusValue: statusValue,
                addressValue: addressValue,
            }
        })

        setCurrentPage(0)
    };

    const handleReset = () => {
        setInputValue('');
        setStatusValue('')
        setAddressValue('')
        setSearchParams({
            input: '',
            status: '',
            address: '',
        })
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                inputValue: '',
                statusValue: '',
                addressValue: ''
            }
        })
    };

    useEffect(() => {
        setSearchParams({
            input: '',
            status: '',
            address: '',
        })
    }, [])

    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            const allItemIds = supplierListRedux.map((item) => item.id);
            setSelectedItems(allItemIds);
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelect = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    const handleChangeStatus = (id, event) => {
        dispatch({
            type: supplierActions.CHANGE_STATUS_SUPPLIER_START,
            payload: { id: id, status: event.value }
        })
    };

    useEffect(() => {
        setAction(Array(supplierListRedux.length).fill(false));
    }, [supplierListRedux.length]);

    const handleAction = (index) => {
        const newAction = action.map((value, i) => (i === index ? !value : false));
        setAction(newAction);
    };

    useEffect(() => {
        function handleActionListPosition() {
            if (action) {
                const actionListElement = actionListRef.current;
                const tableElement = tableRef.current;

                if (actionListElement && tableElement) {
                    const actionListRect = actionListElement.getBoundingClientRect();
                    const tableRect = tableElement.getBoundingClientRect();

                    if (actionListRect.bottom > tableRect.bottom) {
                        actionListElement.style.transform = `translate(${-80}%, ${-155}%)`;
                    }
                }
            }
        }

        handleActionListPosition();
    }, [action]);

    const handleBlur = (index) => {
        setAction((prevAction) => {
            const updatedAction = [...prevAction];
            updatedAction[index] = false;

            return updatedAction;
        });
    };

    const handleDelete = (id) => {
        let timeoutId;

        const updatedList = supplierListRedux.filter((item) => item.id !== id);
        setSupplierListRedux(updatedList)

        const handleUndo = (id) => {
            const itemUndo = supplierList.find(item => item.id === id)
            if (itemUndo) {
                const undoList = [...supplierListReduxRef.current, itemUndo];
                undoList.sort((a, b) => a.id - b.id)
                setSupplierListRedux(undoList)
            }

            clearTimeout(timeoutId);

            toast.success(Constants.SUPPLIER.UNDO.VALUE, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        };

        toast.info(
            (
                <div className={styles['div-undo']}>
                    <p>{Constants.SUPPLIER.DELETING.VALUE}</p>
                    <button onClick={() => handleUndo(id)}>{Constants.SUPPLIER.UNDO.VALUE}</button>
                </div>
            ),
            {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <SupplierIconInfo />,
            },
        );

        timeoutId = setTimeout(() => {
            if (!deleteDispatchedRef.current) {
                dispatch({
                    type: supplierActions.DELETE_SUPPLIER_START,
                    payload: { id: id }
                });
            }
        }, 4000);
    };

    useEffect(() => {
        const totalPages = Math.ceil(supplierListRedux.length / itemsPerPage);
        setTotalPages(totalPages);
        const startIndex = 0;
        const endIndex = itemsPerPage;
        const updatedDisplayedSupplierList = supplierListRedux.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    }, [supplierListRedux, itemsPerPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        const startIndex = selectedPage.selected * itemsPerPage;
        const endIndex = (selectedPage.selected + 1) * itemsPerPage;
        const updatedDisplayedSupplierList = supplierListRedux.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    };

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const calculateIndexes = () => {
        if (supplierListRedux.length > 0) {
            const firstIndex = currentPage * itemsPerPage + 1;
            const lastIndex = Math.min((currentPage + 1) * itemsPerPage, supplierListRedux.length);
            setFirstItemIndex(firstIndex);
            setLastItemIndex(lastIndex);
        }
    };
    useEffect(() => {
        calculateIndexes();
    }, [currentPage, itemsPerPage, displayedSupplierList]);

    return (
        <div className={styles['div-supplier']}>
            <ToastContainer
                position="top-right"
                className={styles['custom-toast-container']}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className={styles['form-search-setting']}>
                <div className={styles['form-search']}>
                    <div className={styles['input-search']}>
                        <div className={styles['div-icon-search']}>
                            <SupplierIcon1 />
                        </div>
                        <input
                            placeholder={t('supplier.formSearchSet.searchAll')}
                            className={styles['input-field']}
                            value={inputValue}
                            onChange={handleInputValueChange}
                        />
                    </div>

                    <div className={styles['input-status']}>
                        <DropdownSelect
                            options={optionStatus}
                            onChange={handleStatus}
                            value={statusValue}
                            placeholder={t('supplier.formSearchSet.status')}
                            arrowOpen={<SupplierIcon2 />}
                            arrowClosed={<SupplierIcon2 />}

                            placeholderClassName={'dropdown-placeholder-search-address'}
                            menuClassName={'dropdown-menu-search-address'}
                        />
                    </div>

                    <div className={styles['input-address']}>
                        <DropdownSelect
                            options={optionAddress}
                            value={addressValue}
                            onChange={handleAddress}
                            placeholder={t('supplier.formSearchSet.address')}
                            arrowOpen={<SupplierIcon2 />}
                            arrowClosed={<SupplierIcon2 />}

                            placeholderClassName={'dropdown-placeholder-search-address'}
                            menuClassName={'dropdown-menu-search-address'}
                        />
                    </div>
                </div>

                <div className={styles['form-setting']}>
                    <button
                        className={styles['btn-re-setting']}
                        onClick={handleReset}
                    >
                        <p className={styles['p-re-setting']}>{t('supplier.formSearchSet.resetBtn')}</p>
                    </button>

                    <button
                        className={styles['btn-search']}
                        onClick={handleSearch}
                    >
                        <p className={styles['p-search']}>{t('supplier.formSearchSet.searchBtn')}</p>
                    </button>

                    <button className={styles['btn-setting']}>
                        <SupplierIconSetting />
                    </button>

                    <button className={styles['btn-operate']}>
                        <SupplierIconOperate />
                    </button>
                </div>
            </div>

            <div className={styles['div-supplier-list']}>
                <div className={styles['div-table']} ref={tableRef}>
                    <table>
                        <thead>
                            <tr className={styles['tr-title']}>
                                <th className={styles['th1']}>
                                    <input
                                        type="checkbox"
                                        className={styles['checkbox-th']}
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className={styles['th3']}>{t('supplier.th.supplierName')}</th>
                                <th className={styles['th4']}>{t('supplier.th.category')}</th>
                                <th className={styles['th5']}>{t('supplier.th.code')}</th>
                                <th className={styles['th6']}>{t('supplier.th.debtCode')}</th>
                                <th className={styles['th7']}>{t('supplier.th.phone')}</th>
                                <th className={styles['th8']}>{t('supplier.th.email')}</th>
                                <th className={styles['th9']}>{t('supplier.th.address')}</th>
                                <th className={styles['th10']}>{t('supplier.th.status')}</th>
                                <th className={styles['th11']}>{t('supplier.th.action')}</th>
                            </tr>
                        </thead>

                        <tbody>
                            {supplierListRedux
                                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                .map((item, index) => {
                                    const addressArr = [item.address, item.ward, item.district, item.province]

                                    const filteredOptions = optionStatus.filter((option) => {
                                        if (item.status === 1) {
                                            return option.value === 2;
                                        } else if (item.status === 2) {
                                            return option.value === 1;
                                        }
                                        return false;
                                    });

                                    return (
                                        <tr
                                            className={styles['tr-normal']}
                                            key={item.id}
                                        >
                                            <td className={styles['td1']}>
                                                <input
                                                    className={styles['checkbox-td']}
                                                    type="checkbox"
                                                    value={item.id}
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleSelect(item.id)}
                                                />
                                            </td>
                                            <td className={styles['td3']}>
                                                <Link
                                                    to={`/supplier/list/detail/${item.id}`}
                                                >
                                                    {item.supplierName}
                                                </Link>
                                            </td>
                                            <CategoryTooltip
                                                title={item.categoryName}
                                                arrow
                                                placement="top"
                                            >
                                                <td className={styles['td4']}>{item.categoryName}</td>
                                            </CategoryTooltip>
                                            <td className={styles['td5']}>{item.code}</td>
                                            <td className={styles['td6']}>{item.debtCode}</td>
                                            <td className={styles['td7']}>{item.phone}</td>
                                            <EmailTooltip
                                                title={item.email}
                                                arrow
                                                placement="top"
                                            >
                                                <td className={styles['td8']}>{item.email}</td>
                                            </EmailTooltip>

                                            <AddressTooltip
                                                title={addressArr.join(', ')}
                                                arrow
                                                placement="top"
                                            >
                                                <td className={styles['td9']}>{addressArr.join(', ')}</td>
                                            </AddressTooltip>

                                            <td className={styles['td10']}>
                                                <div className={styles['div-select']}>
                                                    <DropdownSelect
                                                        options={filteredOptions}
                                                        onChange={(event) => handleChangeStatus(item.id, event)}
                                                        placeholder={item.status == Constants.COMMON.STATUS.TRANSACTION.KEY ? 'Giao dịch' : item.status == Constants.COMMON.STATUS.PAUSE.KEY ? 'Tạm dừng' : ''}
                                                        arrowOpen={<SupplierIconArrow />}
                                                        arrowClosed={<SupplierIconArrow />}

                                                        controlClassName={item.status}
                                                    />
                                                </div>
                                            </td>
                                            <td className={styles['td11']}>
                                                <div
                                                    className={styles['action-button']}
                                                    onBlur={() => handleBlur(index)}
                                                >
                                                    <button
                                                        className={styles['custom-action-button']}
                                                        onClick={() => handleAction(index)}
                                                    >
                                                        <SupplierIconAction />
                                                    </button>


                                                    {action[index] &&
                                                        <ul
                                                            className={styles['action-list']}
                                                            ref={actionListRef}
                                                        >
                                                            <li className={styles['action-item']}>
                                                                <button className={styles['btn-edit']}>
                                                                    <SupplierIconEdit />
                                                                    {t('supplier.td.update')}
                                                                </button>
                                                            </li>
                                                            <li className={styles['action-item']}>
                                                                <button
                                                                    className={styles['btn-delete']}
                                                                    onMouseDown={(event) => {
                                                                        event.preventDefault();
                                                                        handleDelete(item.id);
                                                                    }}
                                                                >
                                                                    <SupplierIconDelete />
                                                                    {t('supplier.td.delete')}
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className={styles['div-paginate']}>
                <div className={styles['div-itemsPerPage']}>
                    <div className={styles['div-selectItem']}>
                        <p>{t('supplier.paginate.display')}</p>
                        <select value={itemsPerPage} onChange={handleChangeItemsPerPage}>
                            {selectItemsPerPage.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles['div-from-to']}>
                        <p>
                            {t('supplier.paginate.showing')} {firstItemIndex} - {lastItemIndex} {t('supplier.paginate.outOf')} {supplierListRedux.length}
                        </p>
                    </div>

                </div>

                <ReactPaginate
                    nextLabel=<SupplierIconNext />
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={3}
                    pageCount={totalPages}
                    previousLabel=<SupplierIconPrev />
                    forcePage={currentPage}

                    pageClassName={styles['page-item']}
                    pageLinkClassName={styles['page-link']}
                    previousClassName={styles['page-prev-next']}
                    previousLinkClassName={styles['link-prev-next']}
                    nextClassName={styles['page-prev-next']}
                    nextLinkClassName={styles['link-prev-next']}
                    breakLabel={styles['...']}
                    breakClassName={styles['page-item']}
                    breakLinkClassName={styles['page-link']}
                    containerClassName={styles['pagination']}
                    activeClassName={styles['active']}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}
