import React, { useState, useEffect, useRef, createRef } from 'react'
import useOnClickOutside from 'hooks/use-onclick-outside'

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
import SupplierIconInfo from '../icons/iconsSupplierList/SuppliericonInfo';

import { useDispatch, useSelector } from 'react-redux';
import SupplierCategoryAction from "redux/category/action"
import { useLocation, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopupCreate from './popupCreate/PopupCreate';
import PopupUpdate from './popupUpdate/PopupUpdate';

import { getLocalStorageData, setLocalStorageData } from 'redux/supplier/localStorageUtils';
import { fetchSupplierList } from 'redux/supplier/fetchSupplierList'

export default function SupplierCategory() {
    const rows = [
        { id: 1, categorization: 'Ngành', supplierCode: '--', note: 'Ghi chú' },
        { id: 2, categorization: 'Nhóm', supplierCode: '--', note: 'Ghi chú' },
        { id: 3, categorization: 'Mục', supplierCode: '--', note: 'Ghi chú' },
    ]
    let deletedCategory = null;

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);

    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useState({
        input: queryParams.get('input') || ''
    });
    const [inputValue, setInputValue] = useState('');

    const [openRows, setOpenRows] = useState([]);
    const [action, setAction] = useState([])
    const [actionCD, setActionCD] = useState([])
    const [parentRefs, setParentRefs] = useState([]);
    const [subRefs, setSubRefs] = useState([]);
    const actionParentRef = useRef(null);
    const actionSubRef = useRef(null);
    const tableRef = useRef(null);

    const [openCreate, setOpenCreate] = useState(false);
    const [idParent, setIdParent] = useState(null)
    const [openUpdate, setOpenUpdate] = useState(false);
    const [idArrow, setIdArrow] = useState(null)

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const selectItemsPerPage = [5, 10, 50];
    const [firstItemIndex, setFirstItemIndex] = useState(0);
    const [lastItemIndex, setLastItemIndex] = useState(0);
    const [displayedSupplierList, setDisplayedSupplierList] = useState([]);

    const existingSupplierList = getLocalStorageData('supplierList');
    if (!existingSupplierList) {
        setLocalStorageData('supplierList', fetchSupplierList);
    }

    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
        });
    }, []);

    const handleInputValueChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        setSearchParams({ ...searchParams, input: inputValue })
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: inputValue,
            }
        })
    };


    const handleSearchHistory = () => {
        const searchParamsString = new URLSearchParams(searchParams).toString();
        history.push(`${location.pathname}?${searchParamsString}`);
    };

    useEffect(() => {
        handleSearchHistory()
    }, [searchParams]);

    const handleReset = () => {
        setInputValue('');
        setSearchParams({
            input: ''
        })
        dispatch({ type: SupplierCategoryAction.RESET_CATEGORY_START })
    };

    useEffect(() => {
        setSearchParams({
            input: ''
        })
    }, [])

    const handleRowClick = (indexCD) => {
        const isOpen = openRows.includes(indexCD);
        if (isOpen) {
            setOpenRows(openRows.filter((row) => row !== indexCD));
        } else {
            setOpenRows([...openRows, indexCD]);
        }
    };

    useEffect(() => {
        setActionCD(Array(rows.length).fill(false));
    }, [rows.length]);

    const handleActionCD = (indexCD) => {
        const newActionCD = actionCD.map((value, i) => (i === indexCD ? !value : false));
        setActionCD(newActionCD);
    };

    useEffect(() => {
        const initActions = {};
        supplierCategoryList.forEach(item => {
            initActions[item.items.id] = false;
        });
        setAction(initActions);
    }, [supplierCategoryList]);

    const handleAction = (id) => {
        setAction(prevActions => ({
            ...prevActions,
            [id]: !prevActions[id]
        }));
    };

    useEffect(() => {
        setParentRefs((parentRefs) =>
            Array(rows.length)
                .fill()
                .map((_, i) => parentRefs[i] || createRef()),
        );
    }, [rows.length]);
    const handleClickOutsideParent = (event) => {
        parentRefs.forEach((ref, indexCD) => {
            if (ref.current && ref.current.contains(event.target)) {
                return;
            } else {
                setActionCD(prevActionCDs => prevActionCDs.map((value, i) => (i === indexCD ? false : value)));
            }
        });
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideParent);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideParent);
        };
    }, [parentRefs]);



    useEffect(() => {
        setSubRefs((subRefs) =>
            Array(supplierCategoryList.length)
                .fill()
                .map((_, i) => subRefs[i] || createRef()),
        );
    }, [supplierCategoryList.length]);
    const handleClickOutsideSub = (event) => {
        let isClickedOnActionButton = false;
        subRefs.forEach((ref, index) => {
            if (ref.current && ref.current.contains(event.target)) {
                isClickedOnActionButton = true;
            }
        });

        if (!isClickedOnActionButton) {
            setAction(prevActions => {
                const updatedActions = { ...prevActions };
                Object.keys(updatedActions).forEach(key => {
                    updatedActions[key] = false;
                });
                return updatedActions;
            });
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideSub);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideSub);
        };
    }, [subRefs]);

    useEffect(() => {
        console.log();
        function handleActionListPosition() {
            if (action) {
                const actionParentElement = actionParentRef.current;
                const tableElement = tableRef.current;

                if (actionParentElement && tableElement) {
                    const actionParentRect = actionParentElement.getBoundingClientRect();
                    const tableRect = tableElement.getBoundingClientRect();

                    if (actionParentRect.bottom > tableRect.bottom) {
                        actionParentElement.style.transform = `translate(${-80}%, ${-140}%)`;
                    }
                }
            }

            if (actionCD) {
                const actionSubElement = actionSubRef.current;
                const tableElement = tableRef.current;

                if (actionSubElement && tableElement) {
                    const actionSubRect = actionSubElement.getBoundingClientRect();
                    const tableRect = tableElement.getBoundingClientRect();

                    if (actionSubRect.bottom > tableRect.bottom) {
                        actionSubElement.style.transform = `translate(${-80}%, ${-115}%)`;
                    }
                }
            }
        }

        handleActionListPosition();
    }, [action, actionCD]);

    const handleDelete = (id) => {
        const supplierList = getLocalStorageData('supplierList');
        deletedCategory = supplierList.find(item => item.items.id === id);

        dispatch({ type: SupplierCategoryAction.DELETE_CATEGORY_START, payload: { id: id } })

        toast.info(
            (
                <div className={styles['div-undo']}>
                    <p>Đang xóa danh mục</p>
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
            type: SupplierCategoryAction.UNDO_CATEGORY_START,
            payload: {
                deletedCategory: deletedCategory,
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

    const handleClickOpenCreate = (id) => {
        setIdParent(id)
        setOpenCreate(true);
    };
    const handleClickCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleClickOpenUpdate = (id) => {
        setIdArrow(id)
        setOpenUpdate(true);
    };
    const handleClickCloseUpdate = () => {
        setOpenUpdate(false);
    };

    useEffect(() => {
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        setTotalPages(totalPages);

        const startIndex = 0;
        const endIndex = itemsPerPage;
        const updatedDisplayedSupplierList = rows.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    }, [itemsPerPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);

        const startIndex = selectedPage.selected * itemsPerPage;
        const endIndex = (selectedPage.selected + 1) * itemsPerPage;
        const updatedDisplayedSupplierList = rows.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    };

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const calculateIndexes = () => {
        const firstIndex = currentPage * itemsPerPage + 1;
        const lastIndex = Math.min((currentPage + 1) * itemsPerPage, rows.length);
        setFirstItemIndex(firstIndex);
        setLastItemIndex(lastIndex);
    };
    useEffect(() => {
        calculateIndexes();
    }, [currentPage, itemsPerPage, displayedSupplierList]);

    return (
        <>
            {openCreate &&
                <PopupCreate
                    open={openCreate}
                    handleClose={handleClickCloseCreate}
                    id={idParent}
                />
            }

            {openUpdate &&
                <PopupUpdate
                    open={openUpdate}
                    handleClose={handleClickCloseUpdate}
                    id={idArrow}
                />
            }

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
                    <div className={styles['div-table']} ref={tableRef}>
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
                                            <tr className={`${styles['parent-tr-normal']} ${openRows.includes(indexCD) == true ? styles['actionCD-open'] : ''}`}>
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
                                                        className={styles['action-button-parent']}
                                                        ref={parentRefs[indexCD]}
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
                                                                ref={actionParentRef}
                                                            >
                                                                <li className={styles['action-item-create']}>
                                                                    <button
                                                                        className={styles['btn-create']}
                                                                        onClick={() => handleClickOpenCreate(row.id)}
                                                                    >
                                                                        <IconCreate />
                                                                        Thêm mới danh mục
                                                                    </button>
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
                                                                                        className={styles['action-button-sub']}
                                                                                        ref={subRefs[item.items.id]}
                                                                                    >
                                                                                        <button
                                                                                            className={styles['custom-action-button']}
                                                                                            onClick={() => handleAction(item.items.id)}
                                                                                        >
                                                                                            <SupplierIconAction />
                                                                                        </button>

                                                                                        {action[item.items.id] &&
                                                                                            <ul
                                                                                                className={styles['action-list']}
                                                                                                ref={actionSubRef}
                                                                                            >
                                                                                                <li className={styles['action-item-create']}>
                                                                                                    <button
                                                                                                        className={styles['btn-create']}
                                                                                                        onClick={() => handleClickOpenCreate(row.id)}
                                                                                                    >
                                                                                                        <IconCreate />
                                                                                                        Thêm mới danh mục
                                                                                                    </button>
                                                                                                </li>
                                                                                                <li className={styles['action-item']}>
                                                                                                    <button
                                                                                                        className={styles['btn-edit']}
                                                                                                        onClick={() => handleClickOpenUpdate(item.items.id)}
                                                                                                    >
                                                                                                        <SupplierIconEdit />
                                                                                                        Sửa
                                                                                                    </button>
                                                                                                </li>
                                                                                                <li className={styles['action-item']}>
                                                                                                    <button
                                                                                                        className={styles['btn-delete']}
                                                                                                        onClick={() => handleDelete(item.items.id)}
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
                            <select value={itemsPerPage} onChange={() => handleChangeItemsPerPage()}>
                                {selectItemsPerPage.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles['div-from-to']}>
                            <p>
                                Hiển thị từ {firstItemIndex} - {lastItemIndex} trên tổng {rows.length}
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
        </>
    );
}
