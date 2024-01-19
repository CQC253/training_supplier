import { getLocalStorageData, setLocalStorageData } from "./localStorageUtils";

const CategoryFactory = {
    fetchAndSearchCategoryData: (payload) => {
        const supplierList = getLocalStorageData('supplierList');

        let filteredList = supplierList;

        if (payload.payload) {
            filteredList = supplierList.filter(item => {
                const searchFields = [
                    item.items.supplierCode,
                    item.items.category,
                    item.note
                ];

                const isInputValueMatch = payload.payload.inputValue ? searchFields.some(field => {
                    const regex = new RegExp(`${payload.payload.inputValue}`, 'i'); 
                    return regex.test(field);
                }) : true;

                return isInputValueMatch;
            });
        }

        filteredList.sort((a, b) => a.items.id - b.items.id);

        return {
            Data: filteredList
        };
    },
    deleteCategoryList: (payload) => {
        const categoryList = getLocalStorageData('supplierList');
        const id = parseInt(payload.payload.id)
        const updatedList = categoryList.filter((item) => item.items.id !== id);

        updatedList.sort((a, b) => a.items.id - b.items.id);
        setLocalStorageData("supplierList", updatedList);
        return {
            Data: updatedList
        };
    },
    undoCategoryList: (payload) => {
        const categoryList = getLocalStorageData('supplierList');
        const updatedList = [...categoryList];
        const deletedCategory = payload.payload.deletedCategory
        if (deletedCategory) {
            updatedList.push(deletedCategory);
        }

        updatedList.sort((a, b) => a.items.id - b.items.id);
        setLocalStorageData('supplierList', updatedList);

        return {
            Data: updatedList
        };
    },
    createCategoryList: (payload) => {
        const categoryList = getLocalStorageData('supplierList');

        const newItem = {
            categorization: payload.payload.info.categorization,
            note: payload.payload.info.note,
            items: payload.payload.info.items
        };

        categoryList.push(newItem);

        categoryList.sort((a, b) => a.items.id - b.items.id);
        setLocalStorageData('supplierList', categoryList);

        return {
            Data: categoryList
        };
    },
    updateCategoryList: (payload) => {
        const categoryList = getLocalStorageData('supplierList');

        const updatedList = categoryList.map(item => {
            if (item.items.id === payload.payload.info.items.id) {
                return payload.payload.info;
            }
            return item;
        });

        updatedList.sort((a, b) => a.items.id - b.items.id);
        setLocalStorageData('supplierList', updatedList);

        return {
            Data: updatedList
        };
    },
    resetCategoryList: () => {
        const categoryList = getLocalStorageData('supplierList');

        return {
            Data: categoryList
        };
    },
}

export default CategoryFactory