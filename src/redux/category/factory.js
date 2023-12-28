import { getLocalStorageData, setLocalStorageData } from "./localStorageUtils";

const CategoryFactory = {
    fetchAndSearchCategoryData: (payload) => {
        // console.log(payload);
        const supplierList = getLocalStorageData('supplierList');

        let filteredList = supplierList;
        // console.log(filteredList);

        // Lọc các phần tử trong filteredList  dựa trên giá trị tìm kiếm
        if (payload.payload) {
            // console.log('payload factory', payload.payload.statusValue);
            filteredList = supplierList.filter(item => {
                const searchFields = [
                    item.items.supplierCode,
                    item.items.category
                ];

                // Kiểm tra giá trị tìm kiếm
                const isInputValueMatch = payload.payload.inputValue ? searchFields.some(field => {
                    const regex = new RegExp(`${payload.payload.inputValue}`, 'i'); // 'i' để không phân biệt chữ hoa/chữ thường
                    return regex.test(field);
                }) : true;

                return isInputValueMatch;
            });

            // Sắp xếp danh sách đã lọc theo thứ tự tăng dần của ID
            filteredList.sort((a, b) => a.items.id - b.items.id);
        }
        // console.log(filteredList);

        // Cập nhật supplierListRedux với danh sách đã lọc
        return {
            Data: filteredList
        };
    },
    deleteCategoryList: (payload) => {
        const categoryList = getLocalStorageData('supplierList');
        const id = parseInt(payload.payload.id)
        const updatedList = categoryList.filter((item) => item.items.id !== id);
        setLocalStorageData("supplierList", updatedList);
        return {
            Data: updatedList
        };
    },
    createCategoryList: (payload) => {
        // console.log('payload factory', payload);
        const categoryList = getLocalStorageData('supplierList');

        //Tạo categorization, note, items
        const newItem = {
            categorization: payload.payload.info.categorization,
            note: payload.payload.info.note,
            items: payload.payload.info.items
        };

        // Thêm nhà cung cấp mới vào danh sách
        categoryList.push(newItem);

        // console.log(categoryList);

        // Lưu danh sách đã cập nhật trở lại local storage
        setLocalStorageData('supplierList', categoryList);

        return {
            Data: categoryList
        };
    },
    updateCategoryList: (payload) => {
        console.log('payload factory', payload);
        const categoryList = getLocalStorageData('supplierList');

        //Tìm đến NCC dựa trên payload.payload.info.items.id và thay NCC đó thành payload.payload.info
        const updatedList = categoryList.map(item => {
            if (item.items.id === payload.payload.info.items.id) {
                return payload.payload.info;
            }
            return item;
        });
        // console.log(updatedList);

        // Lưu danh sách đã cập nhật trở lại local storage
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