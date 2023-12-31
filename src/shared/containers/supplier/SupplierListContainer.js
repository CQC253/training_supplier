import React, { useState, useEffect, useRef } from 'react'

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

import { useDispatch, useSelector } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { useLocation, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLocalStorageData, setLocalStorageData } from 'redux/supplier/localStorageUtils';
import { fetchSupplierList } from 'redux/supplier/fetchSupplierList'

export default function SupplierContainer() {
    let deletedSupplier = null;

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);

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

    const existingSupplierList = getLocalStorageData('supplierList');
    if (!existingSupplierList) {
        setLocalStorageData('supplierList', fetchSupplierList);
    }
    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

    const arrayStatus = [...new Set(getLocalStorageData('supplierList').map(item => item.items.status))];
    const optionStatus = arrayStatus.map(status => ({
        value: status,
        label: status === 1 ? 'Giao dịch' : 'Tạm dừng'
    }));
    const optionAddress = Array.from(getLocalStorageData('supplierList')
        .map(item => item.items.address))
        .filter(address => address !== '')
        .map(address => ({
            value: address,
            label: address
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

    const changeStatus = arrayStatus.map(status => ({
        value: status,
        label: status === 1 ? 'Giao dịch' : 'Tạm dừng'
    }));

    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleStatus = (event) => {
        setStatusValue(event.value == 1 ? "Giao dịch" : "Tạm dừng")
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
        setAddressValue(event.value)
        const queryParams = new URLSearchParams(location.search);
        const inputValue = queryParams.get('input') || '';
        const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
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
        setSearchParams({ ...searchParams, input: inputValue })
        const queryParams = new URLSearchParams(location.search);
        const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
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
        dispatch({ type: supplierActions.RESET_SUPPLIER_START })
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
            const allItemIds = supplierListRedux.map((item) => item.items.items.id);
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
        const queryParams = new URLSearchParams(location.search);
        const inputValue = queryParams.get('input') || '';
        const statusValue = queryParams.get('status') || '';
        const addressValue = queryParams.get('address') || '';
        if (inputValue || statusValue || addressValue) {
            dispatch({ type: supplierActions.CHANGE_STATUS_SUPPLIER_START, payload: { id, event, shouldSearch: true } });
        } else {
            dispatch({ type: supplierActions.CHANGE_STATUS_SUPPLIER_START, payload: { id, event, shouldSearch: false } });
        }
    };

    useEffect(() => {
        setAction(Array(supplierListRedux.length).fill(false));
    }, [supplierListRedux.length]);

    const handleAction = (index) => {
        const newAction = action.map((value, i) => (i === index ? !value : false));
        setAction(newAction);
    };

    useEffect(() => {
        console.log();
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
        const supplierList = getLocalStorageData('supplierList');
        deletedSupplier = supplierList.find(item => item.items.id === id);

        dispatch({ type: supplierActions.DELETE_SUPPLIER_START, payload: { id: id } })

        toast.info(
            (
                <div className={styles['div-undo']}>
                    <p>Đang xóa nhà cung cấp</p>
                    <button onClick={() => handleUndo()}>Hoàn tác</button>
                </div>
            ),
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeButton: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <SupplierIconInfo />,
            },
        );
    }

    const handleUndo = () => {
        dispatch({
            type: supplierActions.UNDO_SUPPLIER_START,
            payload: {
                deletedSupplier: deletedSupplier,
            }
        })

        toast.success("Hoàn tác", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
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
        const firstIndex = currentPage * itemsPerPage + 1;
        const lastIndex = Math.min((currentPage + 1) * itemsPerPage, supplierListRedux.length);
        setFirstItemIndex(firstIndex);
        setLastItemIndex(lastIndex);
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
                            placeholder='Tìm kiếm mã NCC, tên NCC, email'
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
                            placeholder={'Trạng thái'}
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
                            placeholder={'Địa chỉ'}
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
                        <p className={styles['p-re-setting']}>Thiết lập lại</p>
                    </button>

                    <button
                        className={styles['btn-search']}
                        onClick={handleSearch}
                    >
                        <p className={styles['p-search']}>Tìm kiếm</p>
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
                                <th className={styles['th2']}>Mã NCC</th>
                                <th className={styles['th3']}>Tên nhà cung cấp</th>
                                <th className={styles['th4']}>Danh mục</th>
                                <th className={styles['th5']}>Mã code</th>
                                <th className={styles['th6']}>Mã công nợ</th>
                                <th className={styles['th7']}>Điện thoại</th>
                                <th className={styles['th8']}>Email</th>
                                <th className={styles['th9']}>Địa chỉ</th>
                                <th className={styles['th10']}>Trạng thái</th>
                                <th className={styles['th11']}>Tác vụ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {supplierListRedux
                                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                .map((item, index) => {
                                    const addressArr = [item.items.address, item.items.ward, item.items.district, item.items.city]

                                    const filteredOptions = changeStatus.filter((option) => {
                                        if (item.items.status === 1) {
                                            return option.value === 2;
                                        } else if (item.items.status === 2) {
                                            return option.value === 1;
                                        }
                                        return false;
                                    });

                                    return (
                                        <tr
                                            className={styles['tr-normal']}
                                            key={item.items.id}
                                        >
                                            <td className={styles['td1']}>
                                                <input
                                                    className={styles['checkbox-td']}
                                                    type="checkbox"
                                                    value={item.items.id}
                                                    checked={selectedItems.includes(item.items.id)}
                                                    onChange={() => handleSelect(item.items.id)}
                                                />
                                            </td>
                                            <td className={styles['td2']}>
                                                <Link
                                                    to={`/supplier/list/detail/${item.items.id}`}
                                                >
                                                    {item.items.supplierCode}
                                                </Link>
                                            </td>
                                            <td className={styles['td3']}>{item.items.supplierName}</td>
                                            <CategoryTooltip
                                                title={item.items.category}
                                                arrow
                                                placement="top"
                                            >
                                                <td className={styles['td4']}>{item.items.category}</td>
                                            </CategoryTooltip>
                                            <td className={styles['td5']}>{item.items.code}</td>
                                            <td className={styles['td6']}>{item.items.deptCode}</td>
                                            <td className={styles['td7']}>{item.items.phone}</td>
                                            <EmailTooltip
                                                title={item.items.email}
                                                arrow
                                                placement="top"
                                            >
                                                <td className={styles['td8']}>{item.items.email}</td>
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
                                                        onChange={(event) => handleChangeStatus(item.items.id, event)}
                                                        placeholder={item.items.status == 1 ? 'Giao dịch' : item.items.status == 2 ? 'Tạm dừng' : ''}
                                                        arrowOpen={<SupplierIconArrow />}
                                                        arrowClosed={<SupplierIconArrow />}

                                                        controlClassName={item.items.status}
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
                                                                    Sửa
                                                                </button>
                                                            </li>
                                                            <li className={styles['action-item']}>
                                                                <button
                                                                    className={styles['btn-delete']}
                                                                    onMouseDown={(event) => {
                                                                        event.preventDefault();
                                                                        handleDelete(item.items.id);
                                                                    }}
                                                                >
                                                                    <SupplierIconDelete />
                                                                    Xóa
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
                        <p>Hiển thị</p>
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
                            Hiển thị từ {firstItemIndex} - {lastItemIndex} trên tổng {supplierListRedux.length}
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
