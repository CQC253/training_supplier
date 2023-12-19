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
import { useDispatch, useSelector } from 'react-redux';
import supplierActions from "redux/supplier/action"
import { getLocalStorageData } from 'redux/supplier/localStorageUtils';
import { useLocation, useHistory } from 'react-router-dom';

export default function SupplierContainer() {
    // supplierListRedux
    const dispatch = useDispatch();
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer);

    //Search button
    const location = useLocation();
    const history = useHistory();
    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useState({
        keyword: queryParams.get('keyword') || '',
        name: queryParams.get('name') || '',
    });

    //inputValue
    const [inputValue, setInputValue] = useState('');

    //statusValue
    const optionSearchStatus = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.status))).map(status => ({
        value: status,
        label: status == 1 ? 'Giao dịch' : 'Tạm dừng'
    }));
    const [statusValue, setStatusValue] = useState('')

    //addressValue
    const optionAddress = Array.from(new Set(getLocalStorageData('supplierList').map(item => item.address))).map(address => ({
        value: address,
        label: address
    }));
    const [addressValue, setAddressValue] = useState('')

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
        // const storedData = getLocalStorageData('supplierList');
        dispatch({ type: supplierActions.FETCH_SUPPLIER_LIST })
    }, []);

    //inputValue
    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    //statusValue
    const handleSearchStatus = (event) => {
        setStatusValue(event.value == 1 ? "Giao dịch" : "Tạm dừng")
        dispatch({
            type: supplierActions.SEARCH_SUPPLIER_STATUS_START,
            payload: {
                statusValue: event.value,
            }
        })
    };

    //addressValue
    const handleAddress = (event) => {
        setAddressValue(event.value)
        dispatch({
            type: supplierActions.SEARCH_SUPPLIER_ADDRESS_START,
            payload: {
                addressValue: event.value,
            }
        })
    };

    //Search button
    useEffect(() => {
        // Gọi hàm thực hiện tìm kiếm hoặc xử lý dữ liệu ở đây dựa trên searchParams
        performSearch();
        // setSearchParams({ ...searchParams, keyword: 'ads'})
        handleSearchHistory()
    }, [searchParams]);

    const performSearch = () => {
        // Thực hiện tìm kiếm hoặc xử lý dữ liệu ở đây dựa trên searchParams
        console.log('Performing search with parameters:', searchParams);
    };

    const handleSearchHistory = () => {
        // Cập nhật URL mà không làm tải lại trang
        const searchParamsString = new URLSearchParams(searchParams).toString();
        history.push(`${location.pathname}?${searchParamsString}`);
    };

    const handleSearch = () => {
        setSearchParams({ ...searchParams, keyword: inputValue })
        dispatch({
            type: supplierActions.SEARCH_SUPPLIER_INPUT_START,
            payload: {
                inputValue: inputValue,
            }
        })
    };

    //Reset button
    const handleReset = () => {
        // window.location.reload()
        setInputValue('');
        setStatusValue('')
        setAddressValue('')
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
    const handleOptionChange = (id, event) => {
        dispatch({ type: supplierActions.UPDATE_SUPPLIER_START, payload: { id, event } })

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
                                                        onChange={(event) => handleOptionChange(item.id, event)}
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
                                                    // onBlur={() => handleBlur(index)}
                                                    />

                                                    {action[index] &&
                                                        <ul className={styles['action-list']}>
                                                            <li className={styles['action-item']}>
                                                                <SupplierIconEdit />
                                                                <button className={styles['btn-edit']}>
                                                                    Sửa
                                                                </button>
                                                            </li>
                                                            <li className={styles['action-item']}>
                                                                <SupplierIconDelete />
                                                                <button className={styles['btn-delete']}>
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
