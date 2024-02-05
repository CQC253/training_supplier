import React, { useState, useEffect, useRef, createRef } from 'react'

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
import { useLocation, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import PopupCreate from './popupCreate/PopupCreate';
import PopupUpdate from './popupUpdate/PopupUpdate';
import { useTranslation } from 'react-i18next';

export default function SupplierCategory() {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const { supplierCategoryList } = useSelector((state) => state.SupplierCategoryReducer);
    const [categoryListRedux, setCategoryListRedux] = useState([])
    const [parentArray, setParentArray] = useState([])
    
    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useState({
        input: queryParams.get('input') || ''
    });
    const [inputValue, setInputValue] = useState('');

    const [openRows, setOpenRows] = useState([]);
    const [action, setAction] = useState([])
    const [actionCD, setActionCD] = useState([])
    const [parentRefs, setParentRefs] = useState([]);
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

    useEffect(() => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        });
    }, []);

    useEffect(() => {
        setCategoryListRedux(supplierCategoryList?.all)
        setParentArray(supplierCategoryList?.parent)
    }, [supplierCategoryList]);

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
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        })
    };

    useEffect(() => {
        setSearchParams({
            input: ''
        })
    }, [])

    const handleRowClick = (indexPr) => {
        const isOpen = openRows.includes(indexPr);
        if (isOpen) {
            setOpenRows(openRows.filter((row) => row !== indexPr));
        } else {
            setOpenRows([...openRows, indexPr]);
        }
    };

    useEffect(() => {
        setActionCD(Array(parentArray?.length).fill(false));
    }, [parentArray?.length]);

    const handleActionCD = (indexPr) => {
        const newActionCD = actionCD?.map((value, i) => (i === indexPr ? !value : false));
        setActionCD(newActionCD);
    };

    useEffect(() => {
        const initActions = {};
        categoryListRedux?.forEach(item => {
            initActions[item.id] = false;
        });
        setAction(initActions);
    }, [categoryListRedux]);

    const handleAction = (id) => {
        setAction(prevActions => ({
            ...prevActions,
            [id]: !prevActions[id]
        }));
    };

    useEffect(() => {
        setParentRefs((parentRefs) =>
            Array(parentArray?.length)
                .fill()
                ?.map((_, i) => parentRefs[i] || createRef()),
        );
    }, [parentArray?.length]);
    useEffect(() => {
        const handleClickOutsideParent = (event) => {
            parentRefs.forEach((ref, indexPr) => {
                if (ref.current && ref.current.contains(event.target)) {
                    return;
                } else {
                    setActionCD(prevActionCDs => prevActionCDs?.map((value, i) => (i === indexPr ? false : value)));
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutsideParent);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideParent);
        };
    }, [parentRefs]);

    useEffect(() => {
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
        const updatedList = categoryListRedux?.filter((item) => item.id !== id);
        setCategoryListRedux(updatedList)
        dispatch({ type: SupplierCategoryAction.DELETE_CATEGORY_START, payload: { id: id } })
    }

    const handleClickOpenCreate = (id) => {
        setIdParent(id)
        setOpenCreate(true);
    };
    const handleClickCloseCreate = () => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        });

        setOpenCreate(false);
    };

    const handleClickOpenUpdate = (id) => {
        setIdArrow(id)
        setOpenUpdate(true);
    };
    const handleClickCloseUpdate = () => {
        dispatch({
            type: SupplierCategoryAction.FETCH_SEARCH_CATEGORY_START,
            payload: {
                inputValue: '',
            }
        });

        setOpenUpdate(false);
    };

    useEffect(() => {
        const totalPages = Math.ceil(categoryListRedux?.length / itemsPerPage);
        setTotalPages(totalPages);

        const startIndex = 0;
        const endIndex = itemsPerPage;
        const updatedDisplayedSupplierList = categoryListRedux?.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    }, [itemsPerPage]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);

        const startIndex = selectedPage.selected * itemsPerPage;
        const endIndex = (selectedPage.selected + 1) * itemsPerPage;
        const updatedDisplayedSupplierList = categoryListRedux?.slice(startIndex, endIndex);
        setDisplayedSupplierList(updatedDisplayedSupplierList);
    };

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const calculateIndexes = () => {
        const firstIndex = currentPage * itemsPerPage + 1;
        const lastIndex = Math.min((currentPage + 1) * itemsPerPage, categoryListRedux?.length);
        setFirstItemIndex(firstIndex);
        setLastItemIndex(lastIndex);
    };
    useEffect(() => {
        calculateIndexes();
    }, [currentPage, itemsPerPage, displayedSupplierList, categoryListRedux]);

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
                <div className={styles['form-search-setting']}>
                    <div className={styles['form-search']}>
                        <div className={styles['input-search']}>
                            <div className={styles['div-icon-search']}>
                                <SupplierIcon1 />
                            </div>
                            <input
                                placeholder={t('category.formSearchSet.searchAll')}
                                className={styles['input-field']}
                                value={inputValue}
                                onChange={(e) => handleInputValueChange(e)}
                            />
                        </div>
                    </div>

                    <div className={styles['form-setting']}>
                        <button
                            className={styles['btn-re-setting']}
                            onClick={handleReset}
                        >
                            <p className={styles['p-re-setting']}>{t('category.formSearchSet.resetBtn')}</p>
                        </button>

                        <button
                            className={styles['btn-search']}
                            onClick={handleSearch}
                        >
                            <p className={styles['p-search']}>{t('category.formSearchSet.searchBtn')}</p>
                        </button>
                    </div>
                </div>

                <div className={styles['div-supplier-list']}>
                    <div className={styles['div-table']} ref={tableRef}>
                        <table className={styles['parent-table']}>
                            <thead className={styles['parent-thead']}>
                                <tr className={styles['paren-tr-title']}>
                                    <th className={styles['parent-th0']}></th>
                                    <th className={styles['parent-th1']}>{t('category.th.category')}</th>
                                    <th className={styles['parent-th2']}>{t('category.th.note')}</th>
                                    <th className={styles['parent-th3']}>{t('category.th.action')}</th>
                                </tr>
                            </thead>

                            <tbody className={styles['parent-tbody']}>
                                {parentArray?.map((parent, indexPr) => {
                                    return (
                                        <React.Fragment key={parent.id}>
                                            <tr className={`${styles['parent-tr-normal']} ${openRows.includes(indexPr) == true ? styles['actionPr-open'] : ''}`}>
                                                <td
                                                    onClick={() => handleRowClick(indexPr)}
                                                    className={styles['parent-td0']}
                                                >
                                                    {openRows.includes(indexPr) ? <IconCloseRow /> : <IconOpenRow />}
                                                </td>
                                                <td className={styles['parent-td1']}>{parent.categoryName}</td>
                                                <td className={styles['parent-td2']}>{parent.note}</td>
                                                <td className={styles['parent-td3']}>
                                                    <div
                                                        className={styles['action-button-parent']}
                                                        ref={parentRefs[indexPr]}
                                                    >
                                                        <button
                                                            className={styles['custom-action-button']}
                                                            onClick={() => handleActionCD(indexPr)}
                                                        >
                                                            <SupplierIconAction />
                                                        </button>

                                                        {actionCD[indexPr] &&
                                                            <ul
                                                                className={styles['action-list']}
                                                                ref={actionParentRef}
                                                            >
                                                                <li className={styles['action-item-create']}>
                                                                    <button
                                                                        className={styles['btn-create']}
                                                                        onClick={() => handleClickOpenCreate(parent.id)}
                                                                    >
                                                                        <IconCreate />
                                                                        {t('category.td.create')}
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                            {openRows.includes(indexPr) && (
                                                <tr className={styles['sub-tr']}>
                                                    <td>
                                                        <table className={styles['sub-table']}>
                                                            <tbody className={styles['sub-tbody']}>
                                                                {
                                                                    categoryListRedux
                                                                        ?.filter(category => category.parent_id === parent.id)
                                                                        ?.map((sub) => {
                                                                            return (
                                                                                <tr
                                                                                    className={styles['sub-tr-normal']}
                                                                                    key={sub.id}
                                                                                >
                                                                                    <td className={styles['sub-td0']}></td>
                                                                                    <td className={styles['sub-td1']}>{sub.categoryName}</td>
                                                                                    <td className={styles['sub-td2']}>{sub.note}</td>
                                                                                    <td className={styles['sub-td3']}>
                                                                                        <div
                                                                                            className={styles['action-button-sub']}
                                                                                        >
                                                                                            <button
                                                                                                className={styles['custom-action-button']}
                                                                                                onClick={() => handleAction(sub.id)}
                                                                                            >
                                                                                                <SupplierIconAction />
                                                                                            </button>

                                                                                            {action[sub.id] &&
                                                                                                <ul
                                                                                                    className={styles['action-list']}
                                                                                                    ref={actionSubRef}
                                                                                                >
                                                                                                    <li className={styles['action-item-create']}>
                                                                                                        <button
                                                                                                            className={styles['btn-create']}
                                                                                                            onClick={() => handleClickOpenCreate(parent.id)}
                                                                                                        >
                                                                                                            <IconCreate />
                                                                                                            {t('category.td.create')}
                                                                                                        </button>
                                                                                                    </li>
                                                                                                    <li className={styles['action-item']}>
                                                                                                        <button
                                                                                                            className={styles['btn-edit']}
                                                                                                            onClick={() => handleClickOpenUpdate(sub.id)}
                                                                                                        >
                                                                                                            <SupplierIconEdit />
                                                                                                            {t('category.td.update')}
                                                                                                        </button>
                                                                                                    </li>
                                                                                                    <li className={styles['action-item']}>
                                                                                                        <button
                                                                                                            className={styles['btn-delete']}
                                                                                                            onClick={() => handleDelete(sub.id)}
                                                                                                        >
                                                                                                            <SupplierIconDelete />
                                                                                                            {t('category.td.delete')}
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
                            <p>{t('category.paginate.display')}</p>
                            <select value={itemsPerPage} onChange={(event) => handleChangeItemsPerPage(event)}>
                                {selectItemsPerPage?.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles['div-from-to']}>
                            <p>
                                {t('category.paginate.showing')} {firstItemIndex} - {lastItemIndex} {t('category.paginate.outOf')} {categoryListRedux?.length}
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