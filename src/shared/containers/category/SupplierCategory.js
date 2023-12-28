import React, { useState, useEffect, useRef } from 'react'

import ReactPaginate from 'react-paginate';

import styles from './SupplierCategory.module.scss'
import SupplierIcon1 from '../icons/iconsSupplierList/SupplierIcon1'
import SupplierIconAction from '../icons/iconsSupplierList/SupplierIconAction'
import SupplierIconEdit from '../icons/iconsSupplierList/SupplierIconEdit'
import SupplierIconDelete from '../icons/iconsSupplierList/SupplierIconDelete'
import SupplierIconNext from '../icons/iconsSupplierList/SupplierIconNext'
import SupplierIconPrev from '../icons/iconsSupplierList/SupplierIconPrev'
import IconCreate from '../icons/iconCategory/IconCreate';
import IconCloseRow from '../icons/iconCategory/IconCloseRow';
import IconOpenRow from '../icons/iconCategory/IconOpenRow';

import { useDispatch, useSelector } from 'react-redux';
import SupplierCategoryAction from "redux/category/action"
import { getLocalStorageData, setLocalStorageData } from 'redux/supplier/localStorageUtils';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupCreate from './popupCreate/PopupCreate';
import PopupUpdate from './popupUpdate/PopupUpdate';

// import { fetchSupplierList as List } from 'redux/supplier/fetchSupplierList'

export default function SupplierCategory() {
    //Set data lên local nếu chưa có
    // useEffect(() => {
    //     const existingSupplierList = getLocalStorageData('supplierList');
    //     if (!existingSupplierList) {
    //         setLocalStorageData('supplierList', List);
    //     }
    // }, []);

    // get data from LocalStorage
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
        });
    }, []);

    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);
    // console.log(supplierCategoryList);

    //Search button
    const location = useLocation();
    const history = useHistory();
    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useState({
        input: queryParams.get('input') || ''
    });

    const [inputValue, setInputValue] = useState('');

    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        handleSearchHistory()
    }, [searchParams]);

    const handleSearchHistory = () => {
        // Cập nhật URL mà không làm tải lại trang
        const searchParamsString = new URLSearchParams(searchParams).toString();
        history.push(`${location.pathname}?${searchParamsString}`);
    };

    useEffect(() => {
        setSearchParams({
            input: ''
        })
    }, [])
    const handleSearch = () => {
        setSearchParams({ ...searchParams, input: inputValue })

        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: inputValue,
            }
        })
    };

    //Reset button 
    const handleReset = () => {
        setInputValue('');
        setSearchParams({
            input: ''
        })
        dispatch({ type: SupplierCategoryAction.RESET_CATEGORY_START })
    };

    //Paginate
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const selectItemsPerPage = [5, 10, 50];
    const [firstItemIndex, setFirstItemIndex] = useState(0);
    const [lastItemIndex, setLastItemIndex] = useState(0);
    const [displayedSupplierList, setDisplayedSupplierList] = useState([]);

    useEffect(() => {
        const totalPages = Math.ceil(supplierCategoryList.length / itemsPerPage);
        setTotalPages(totalPages);
        // setCurrentPage(0);
        const startIndex = 0;
        const endIndex = itemsPerPage;
        const updatedDisplayedSupplierList = supplierCategoryList.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    }, [supplierCategoryList, itemsPerPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
        const startIndex = selectedPage.selected * itemsPerPage;
        const endIndex = (selectedPage.selected + 1) * itemsPerPage;
        const updatedDisplayedSupplierList = supplierCategoryList.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    };

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const calculateIndexes = () => {
        const firstIndex = currentPage * itemsPerPage + 1;
        const lastIndex = Math.min((currentPage + 1) * itemsPerPage, supplierCategoryList.length);
        setFirstItemIndex(firstIndex);
        setLastItemIndex(lastIndex);
    };
    useEffect(() => {
        calculateIndexes();
    }, [currentPage, itemsPerPage, displayedSupplierList]);

    //Table
    const rows = [
        { id: 1, categorization: 'Ngành', supplierCode: '--', note: 'Ghi chú' },
        { id: 2, categorization: 'Nhóm', supplierCode: '--', note: 'Ghi chú' },
        { id: 3, categorization: 'Mục', supplierCode: '--', note: 'Ghi chú' },
    ]

    const [openRows, setOpenRows] = useState([]);

    const handleRowClick = (indexCD) => {
        const isOpen = openRows.includes(indexCD);
        if (isOpen) {
            setOpenRows(openRows.filter((row) => row !== indexCD));
        } else {
            setOpenRows([...openRows, indexCD]);
        }
    };

    //actionCategory
    const [action, setAction] = useState([])

    useEffect(() => {
        setAction(Array(supplierCategoryList.length).fill(false));
    }, [supplierCategoryList.length]);

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

    //actionCategorization
    const [actionCD, setActionCD] = useState([])
    // let deletedSupplier = null;

    useEffect(() => {
        setActionCD(Array(rows.length).fill(false));
    }, [rows.length]);

    const handleActionCD = (indexCD) => {
        const newActionCD = actionCD.map((value, i) => (i === indexCD ? !value : false));
        setActionCD(newActionCD);
    };

    const handleBlurCD = (indexCD) => {
        setAction((prevAction) => {
            const updatedAction = [...prevAction];
            updatedAction[indexCD] = false;

            return updatedAction;
        });
    };

    //dialog popup
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleClickCloseCreate = () => {
        setOpenCreate(false);
    };


    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleClickCloseUpdate = () => {
        setOpenUpdate(false);
    };

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
                            placeholder='Tìm kiếm danh mục nhà cung cấp, tên nhà cung cấp'
                            className={styles['input-field']}
                            value={inputValue}
                            onChange={handleInputValueChange}
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
                </div>
            </div>

            <div className={styles['div-supplier-list']}>
                <div className={styles['div-table']}>
                    <table className={styles['parent-table']}>
                        <thead className={styles['parent-thead']}>
                            <tr className={styles['paren-tr-title']}>
                                <th className={styles['parent-th0']}></th>
                                <th className={styles['parent-th1']}>Danh mục</th>
                                <th className={styles['parent-th2']}>Mã NCC</th>
                                <th className={styles['parent-th3']}>Ghi chú</th>
                                <th className={styles['parent-th4']}>Tác vụ</th>
                            </tr>
                        </thead>

                        <tbody className={styles['parent-tbody']}>
                            {rows.map((row, indexCD) => {
                                const filteredSubRows = supplierCategoryList.filter(item => item.categorization === row.categorization);

                                return (
                                    <React.Fragment key={row.id}>
                                        <tr className={styles['parent-tr-normal']}>
                                            <td
                                                onClick={() => handleRowClick(indexCD)}
                                                className={styles['parent-td0']}
                                            >
                                                {openRows.includes(indexCD) ? <IconCloseRow /> : <IconOpenRow />}
                                            </td>
                                            <td className={styles['parent-td1']}>{row.categorization}</td>
                                            <td className={styles['parent-td2']}>{row.supplierCode}</td>
                                            <td className={styles['parent-td3']}>{row.note}</td>
                                            <td className={styles['parent-td4']}>
                                                <div
                                                    className={styles['action-button']}
                                                    // onBlur={() => handleBlurCD(indexCD)}
                                                >
                                                    <button
                                                        className={styles['custom-action-button']}
                                                        onClick={() => handleActionCD(indexCD)}
                                                    >
                                                        <SupplierIconAction />
                                                    </button>

                                                    {actionCD[indexCD] &&
                                                        <ul
                                                            className={styles['action-list']}
                                                        >
                                                            <li className={styles['action-item-create']}>
                                                                <button
                                                                    className={styles['btn-create']}
                                                                    onClick={handleClickOpenCreate}
                                                                >
                                                                    <IconCreate />
                                                                    Thêm mới danh mục
                                                                </button>
                                                                {openCreate && <PopupCreate
                                                                    open={openCreate}
                                                                    handleClose={handleClickCloseCreate}
                                                                />}
                                                            </li>
                                                        </ul>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                        {openRows.includes(indexCD) && (
                                            <tr className={styles['sub-tr']}>
                                                <td>
                                                    <table className={styles['sub-table']}>
                                                        <tbody className={styles['sub-tbody']}>
                                                            {
                                                                filteredSubRows.map((item, index) => {
                                                                    return (
                                                                        <tr
                                                                            className={styles['sub-tr-normal']}
                                                                            key={item.items.id}
                                                                        >
                                                                            <td className={styles['sub-td0']}></td>
                                                                            <td className={styles['sub-td1']}>{item.items.category}</td>
                                                                            <td className={styles['sub-td2']}>
                                                                                <Link
                                                                                    to={`/supplier/list/detail/${item.items.id}`}
                                                                                >
                                                                                    {item.items.supplierCode}
                                                                                </Link>
                                                                            </td>
                                                                            <td className={styles['sub-td3']}>Ghi chú</td>
                                                                            <td className={styles['sub-td4']}>
                                                                                <div
                                                                                    className={styles['action-button']}
                                                                                >
                                                                                    <button
                                                                                        className={styles['custom-action-button']}
                                                                                        onClick={() => handleAction(index)}
                                                                                        onBlur={() => handleBlur(index)}

                                                                                    >
                                                                                        <SupplierIconAction />
                                                                                    </button>

                                                                                    {action[index] &&
                                                                                        <ul
                                                                                            className={styles['action-list']}
                                                                                        >
                                                                                            <li className={styles['action-item-create']}>
                                                                                                <button
                                                                                                    className={styles['btn-create']}
                                                                                                    onClick={handleClickOpenCreate}
                                                                                                >
                                                                                                    <IconCreate />
                                                                                                    Thêm mới danh mục
                                                                                                </button>
                                                                                                {openCreate && <PopupCreate
                                                                                                    open={openCreate}
                                                                                                    handleClose={handleClickCloseCreate}
                                                                                                />}
                                                                                            </li>
                                                                                            <li className={styles['action-item']}>
                                                                                                <button
                                                                                                    className={styles['btn-edit']}
                                                                                                    onClick={handleClickOpenUpdate}
                                                                                                >
                                                                                                    <SupplierIconEdit />
                                                                                                    Sửa
                                                                                                </button>
                                                                                                {<PopupUpdate
                                                                                                    open={openUpdate}
                                                                                                    handleClose={handleClickCloseUpdate}
                                                                                                    id={item.items.id}
                                                                                                />}
                                                                                            </li>
                                                                                            <li className={styles['action-item']}>
                                                                                                <button
                                                                                                    className={styles['btn-delete']}
                                                                                                    onMouseDown={(event) => {
                                                                                                        event.preventDefault();
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
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
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
                            Hiển thị từ {firstItemIndex} - {lastItemIndex} trên tổng {supplierCategoryList.length}
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
