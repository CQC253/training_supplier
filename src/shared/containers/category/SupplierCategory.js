import React, { useState, useEffect } from 'react'

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

    //inputValue
    const [inputValue, setInputValue] = useState('');

    //Reset button 

    //action
    const [action, setAction] = useState([])
    const [isMouseDown, setIsMouseDown] = useState(false);
    let deletedSupplier = null;

    useEffect(() => {
        setAction(Array(supplierListRedux.length).fill(false));
    }, [supplierListRedux.length]);

    const handleAction = (index) => {
        const newAction = action.map((value, i) => (i === index ? !value : false));
        setAction(newAction);
    };

    const handleBlur = (index) => {
        if (!isMouseDown) {
            setAction((prevAction) => {
                const updatedAction = [...prevAction];
                updatedAction[index] = false;
                return updatedAction;
            });
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    //Paginate
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const selectItemsPerPage = [5, 10, 50];
    const [firstItemIndex, setFirstItemIndex] = useState(0);
    const [lastItemIndex, setLastItemIndex] = useState(0);
    const [displayedSupplierList, setDisplayedSupplierList] = useState([]);

    //---------------------------------------------------

    //search inputValue
    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    //Search all (button)
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


    //dialog popup
    const [openCreate, setOpenCreate] = useState(false);

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleClickCloseCreate = () => {
        setOpenCreate(false);
    };

    const [openUpdate, setOpenUpdate] = useState(false);

    const handleClickOpenUpdate = () => {
        setOpenUpdate(true);
    };

    const handleClickCloseUpdate = () => {
        setOpenUpdate(false);
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
                    <table>
                        <thead>
                            <tr className={styles['tr-title']}>
                                <th className={styles['th1']}>Danh mục</th>
                                <th className={styles['th2']}>Mã NCC</th>
                                <th className={styles['th3']}>Ghi chú</th>
                                <th className={styles['th4']}>Tác vụ</th>
                            </tr>
                        </thead>

                        <tbody>
                            {supplierListRedux
                                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                                .map((item, index) => {

                                    return (
                                        <tr
                                            className={styles['tr-normal']}
                                            key={item.id}
                                        >
                                            <td className={styles['td1']}>{item.category}</td>
                                            <td className={styles['td2']}>
                                                <Link
                                                    to={`/supplier/list/detail/${item.id}`}
                                                >
                                                    {item.supplierCode}
                                                </Link>
                                            </td>
                                            <td className={styles['td3']}>Ghi chú</td>
                                            <td className={styles['td4']}>
                                                <div
                                                    className={styles['action-button']}
                                                    onBlur={() => handleBlur(index)}
                                                >
                                                    <button
                                                        className={styles['custom-action-button']}
                                                        onClick={() => handleAction(index)}
                                                        onMouseDown={handleMouseDown}
                                                        onMouseUp={handleMouseUp}
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
                                                                    // onMouseDown={(event) => {
                                                                    //     event.preventDefault();

                                                                    // }}
                                                                    onClick={handleClickOpenCreate}
                                                                >
                                                                    <IconCreate />
                                                                    Thêm mới danh mục
                                                                </button>
                                                                {<PopupCreate
                                                                    open={openCreate}
                                                                    handleClose={handleClickCloseCreate}
                                                                />}
                                                            </li>
                                                            <li className={styles['action-item']}>
                                                                <button
                                                                    className={styles['btn-edit']}
                                                                    // onMouseDown={(event) => {
                                                                    //     event.preventDefault();
                                                                    // }}
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
