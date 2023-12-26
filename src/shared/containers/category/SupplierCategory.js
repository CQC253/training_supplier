import React, { useState, useEffect, useRef } from 'react'

import ReactPaginate from 'react-paginate';

import styles from './SupplierCategory.module.scss'
import SupplierIcon1 from '../icons/iconsSupplierList/SupplierIcon1'
import SupplierIconAction from '../icons/iconsSupplierList/SupplierIconAction'
import SupplierIconEdit from '../icons/iconsSupplierList/SupplierIconEdit'
import SupplierIconDelete from '../icons/iconsSupplierList/SupplierIconDelete'
import SupplierIconNext from '../icons/iconsSupplierList/SupplierIconNext'
import SupplierIconPrev from '../icons/iconsSupplierList/SupplierIconPrev'
import SupplierIconInfo from '../icons/iconsSupplierList/SuppliericonInfo';
import IconCreate from '../icons/iconCategory/IconCreate';
import IconCloseRow from '../icons/iconCategory/IconCloseRow';
import IconOpenRow from '../icons/iconCategory/IconOpenRow';

import { useDispatch, useSelector } from 'react-redux';
import supplierActions from "redux/supplier/action"
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
    const { supplierList: supplierListRedux } = useSelector((state) => state.SupplierReducer); // get supplierList and : supplierListRedux

    useEffect(() => {
        dispatch({
            type: supplierActions.FETCH_SEARCH_SUPPLIER_LIST,
        });
    }, []);

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
            type: supplierActions.SEARCH_CATEGORY_START,
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
        dispatch({ type: supplierActions.RESET_SUPPLIER_START })
    };

    //actionCategory
    const [action, setAction] = useState([])
    const parentRef = useRef(null);

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
        setTimeout(() => {
            if (parentRef.current.contains(document.activeElement)) {
                return;
            }
            // Xử lý logic khi div cha mất focus
        }, 0);
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
        const totalPages = Math.ceil(supplierListRedux.length / itemsPerPage);
        setTotalPages(totalPages);
        setCurrentPage(0);
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

    //actionCategorization
    const [actionCD, setActionCD] = useState([])
    const parentCDRef = useRef(null);
    // let deletedSupplier = null;

    useEffect(() => {
        setActionCD(Array(rows.length).fill(false));
    }, [rows.length]);

    const handleActionCD = (indexCD) => {
        const newActionCD = actionCD.map((value, i) => (i === indexCD ? !value : false));
        setActionCD(newActionCD);
    };

    // const handleBlur = (index) => {
    //     setAction((prevAction) => {
    //         const updatedAction = [...prevAction];
    //         updatedAction[index] = false;
    //         return updatedAction;
    //     });
    //     setTimeout(() => {
    //         if (parentCDRef.current.contains(document.activeElement)) {
    //             return;
    //         }
    //         // Xử lý logic khi div cha mất focus
    //     }, 0);
    // };

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
                                                >
                                                    <button
                                                        className={styles['custom-action-button']}
                                                        onClick={() => handleActionCD(indexCD)}
                                                    // onBlur={() => handleBlur(indexCD)}
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
                                                            {supplierListRedux
                                                                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                                                .map((item, index) => {
                                                                    return (
                                                                        <tr
                                                                            className={styles['sub-tr-normal']}
                                                                            key={item.id}
                                                                        >
                                                                            <td className={styles['sub-td0']}></td>
                                                                            <td className={styles['sub-td1']}>{item.category}</td>
                                                                            <td className={styles['sub-td2']}>
                                                                                <Link
                                                                                    to={`/supplier/list/detail/${item.id}`}
                                                                                >
                                                                                    {item.supplierCode}
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
                                                                                        //onBlur={() => handleBlur(index)}

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
                                                                                                    id={item.id}
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
