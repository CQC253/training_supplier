import React, { useState, useEffect } from 'react'

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ReactPaginate from 'react-paginate';
import DropdownSelect from './dropdown/Dropdown';

import styles from './SupplierListContainer.module.scss'
import SupplierIcon1 from '../icons/SupplierIcon1'
import SupplierIcon2 from '../icons/SupplierIcon2'
import SupplierIconOperate from '../icons/SupplierIconOperate'
import SupplierIconSetting from '../icons/SupplierIconSetting'
import SupplierIconAction from '../icons/SupplierIconAction'
import SupplierIconEdit from '../icons/SupplierIconEdit'
import SupplierIconDelete from '../icons/SupplierIconDelete'
import SupplierIconNext from '../icons/SupplierIconNext'
import SupplierIconPrev from '../icons/SupplierIconPrev'
import SupplierIconArrow from '../icons/SupplierIconArrow';
import SupplierIconInfo from '../icons/SuppliericonInfo';

import { useDispatch, useSelector } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { getLocalStorageData } from 'redux/supplier/localStorageUtils';
import { useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SupplierContainer() {
    // supplierListRedux
    const dispatch = useDispatch();
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);

    //Search button
    const location = useLocation();
    const history = useHistory();
    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useState({
        input: queryParams.get('input') || '',
        status: queryParams.get('status') || '',
        address: queryParams.get('address') || '',
    });

    //inputValue
    const [inputValue, setInputValue] = useState('');

    //statusValue
    const [statusValue, setStatusValue] = useState('')
    const optionSearchStatus = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.status))).map(status => ({
        value: status,
        label: status == 1 ? 'Giao dịch' : 'Tạm dừng'
    }));

    //addressValue
    const [addressValue, setAddressValue] = useState('')
    const optionAddress = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.address))).map(address => ({
        value: address,
        label: address
    }));

    //Reset button 

    //selectAll
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    //changeStatus
    const optionStatus = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.status))).map(status => ({
        value: status,
        label: status == 1 ? 'Giao dịch' : 'Tạm dừng'
    }));

    //action
    const [action, setAction] = useState([])
    const [isDeleting, setIsDeleting] = useState(true);

    //Paginate
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const selectItemsPerPage = [5, 10, 50];
    const [firstItemIndex, setFirstItemIndex] = useState(0);
    const [lastItemIndex, setLastItemIndex] = useState(0);
    const [displayedSupplierList, setDisplayedSupplierList] = useState([]);

    //Tooltip
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

    //---------------------------------------------------

    // get data from LocalStorage
    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

    //search inputValue
    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    //search statusValue
    const handleSearchStatus = (event) => {
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
    };

    useEffect(() => {
        setSearchParams({ ...searchParams, status: statusValue })
    }, [statusValue])

    //search addressValue
    const handleAddress = (event) => {
        setAddressValue(event.value)
        const queryParams = new URLSearchParams(location.search);
        const inputValue = queryParams.get('input') || '';
        const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
        console.log();
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                addressValue: event.value,
                inputValue: inputValue,
                statusValue: statusValue
            }
        })
    };

    useEffect(() => {
        setSearchParams({ ...searchParams, address: addressValue })
    }, [addressValue])

    //Search all (button)
    useEffect(() => {
        handleSearchHistory()
    }, [searchParams]);

    const handleSearchHistory = () => {
        // Cập nhật URL mà không làm tải lại trang
        const searchParamsString = new URLSearchParams(searchParams).toString();
        history.push(`${location.pathname}?${searchParamsString}`);
    };

    const handleSearch = () => {
        setSearchParams({ ...searchParams, input: inputValue })
        const queryParams = new URLSearchParams(location.search);
        const statusValue = queryParams.get('status') ? (queryParams.get('status') == 'Giao dịch' ? 1 : 2) : '' || '';
        console.log(statusValue);
        const addressValue = queryParams.get('address') || '';
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
            payload: {
                inputValue: inputValue,
                statusValue: statusValue,
                addressValue: addressValue,
                test: 1
            }
        })
    };

    //Reset button
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

    //selectAll
    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            // Nếu selectAll đang là false, chọn tất cả các selectedItems
            const allItemIds = supplierListRedux.map((item) => item.id);
            setSelectedItems(allItemIds);
        } else {
            // Nếu selectAll đang là true, bỏ chọn tất cả các selectedItems
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

    //changeStatus 
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

    //action
    useEffect(() => {
        setAction(Array(supplierListRedux.length).fill(false));
    }, [supplierListRedux.length]);

    const handleAction = (index) => {
        const newAction = action.map((value, i) => (i === index ? !value : false));
        setAction(newAction);
    };

    const handleBlur = (index) => {
        setAction((prevAction) => {
            const updatedAction = [...prevAction];
            updatedAction[index] = false;
            return updatedAction;
        });
    };

    const handleDelete = (id) => {
        console.log(id);
        const queryParams = new URLSearchParams(location.search);
        const inputValue = queryParams.get('input') || '';
        const statusValue = queryParams.get('status') || '';
        const addressValue = queryParams.get('address') || '';
        if (inputValue || statusValue || addressValue) {
            dispatch({ type: supplierActions.DELETE_SUPPLIER_START, payload: { id: id, shouldSearch: true } })
        } else {
            dispatch({ type: supplierActions.DELETE_SUPPLIER_START, payload: { id: id, shouldSearch: false } })
        }

        setIsDeleting(true);
        toast.info(
            isDeleting && (
                <div className={styles['div-undo']}>
                    <p>Đang xóa nhà cung cấp</p>
                    <button onClick={() => handleUndo()}>Hoàn tác</button>
                </div>
            ),
            {
                position: "top-right",
                autoClose: 100000,
                hideProgressBar: false,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                icon: <SupplierIconInfo />,
            },
        );
    }

    const handleUndo = () => {
        setIsDeleting(false);
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

    //Paginate
    useEffect(() => {
        const totalPages = Math.ceil(supplierListRedux.length / itemsPerPage);
        setTotalPages(totalPages);
        setCurrentPage(0);
        const startIndex = 0;
        const endIndex = itemsPerPage;
        const updatedDisplayedSupplierList = supplierListRedux.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    }, [supplierListRedux, itemsPerPage]);

    const handlePageChange = (selectedPage) => {
        // console.log(selectedPage);
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
        const lastIndex = Math.min((currentPage + 1) * itemsPerPage, displayedSupplierList.length);
        setFirstItemIndex(firstIndex);
        setLastItemIndex(lastIndex);
    };
    useEffect(() => {
        calculateIndexes();
    }, [currentPage, itemsPerPage, displayedSupplierList]);

    //---------------------------------------------------

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
                            options={optionSearchStatus}
                            onChange={handleSearchStatus}
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
                <div className={styles['div-table']}>
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

                                    const filteredOptions = optionStatus.filter((option) => {
                                        if (item.status === 1) {
                                            // Chỉ lấy tùy chọn "Tạm dừng"
                                            return option.value === 2;
                                        } else if (item.status === 2) {
                                            // Chỉ lấy tùy chọn "Giao dịch"
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
                                            <td className={styles['td2']}>{item.supplierCode}</td>
                                            <td className={styles['td3']}>{item.supplierName}</td>
                                            <td className={styles['td4']}>{item.category}</td>
                                            <td className={styles['td5']}>{item.code}</td>
                                            <td className={styles['td6']}>{item.deptCode}</td>
                                            <td className={styles['td7']}>{item.phone}</td>
                                            <EmailTooltip
                                                title={item.email}
                                                arrow
                                                placement="top"
                                            >
                                                <td className={styles['td8']}>{item.email}</td>
                                            </EmailTooltip>

                                            <td className={styles['td9']}>{item.address}</td>
                                            <td className={styles['td10']}>
                                                <div className={styles['div-select']}>
                                                    <DropdownSelect
                                                        options={filteredOptions}
                                                        onChange={(event) => handleChangeStatus(item.id, event)}
                                                        placeholder={item.status == 1 ? 'Giao dịch' : item.status == 2 ? 'Tạm dừng' : ''}
                                                        arrowOpen={<SupplierIconArrow />}
                                                        arrowClosed={<SupplierIconArrow />}

                                                        controlClassName={item.status}
                                                    />
                                                </div>
                                            </td>
                                            <td className={styles['td11']}>
                                                <div className={styles['action-button']}>
                                                    <SupplierIconAction
                                                        onClick={() => handleAction(index)}
                                                    />

                                                    {action[index] &&
                                                        <ul
                                                            className={styles['action-list']}
                                                            onBlur={() => handleBlur(index)}
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
                                                                    onClick={() => {
                                                                        handleDelete(item.id)
                                                                        console.log(123)
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
