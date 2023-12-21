import { getLocalStorageData, setLocalStorageData } from "./localStorageUtils";

const SupplierFactory = {
    fetchAndSearchData: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');
        let filteredList = supplierList;
        // console.log('payload factory', payload);

        // Lọc các phần tử trong filteredList  dựa trên giá trị tìm kiếm
        if (payload.payload) {
            // console.log('payload factory', payload.payload.statusValue);
            filteredList = supplierList.filter(item => {
                const searchFields = [
                    item.supplierCode,
                    item.supplierName,
                    item.category,
                    item.code,
                    item.deptCode,
                    item.phone,
                    item.email,
                    item.address,
                    item.status
                ];

                // Kiểm tra giá trị tìm kiếm
                const isInputValueMatch = payload.payload.inputValue ? searchFields.some(field => {
                    const regex = new RegExp(`${payload.payload.inputValue}`, 'i'); // 'i' để không phân biệt chữ hoa/chữ thường
                    return regex.test(field);
                }) : true;
                const isStatusValueMatch = payload.payload.statusValue ? item.status === payload.payload.statusValue : true;
                const isAddressValueMatch = payload.payload.addressValue ? item.address === payload.payload.addressValue : true;

                return isInputValueMatch && isStatusValueMatch && isAddressValueMatch;
            });
        }

        // Cập nhật supplierListRedux với danh sách đã lọc
        return {
            Data: filteredList
        };
    },
    deleteSupplierList: (payload) => {
        const supplierList = getLocalStorageData('supplierList');
        const updatedList = supplierList.filter((item) => item.id !== payload.payload.id);
        setLocalStorageData("supplierList", updatedList);

        return {
            Data: updatedList
        };
    },
    undoSupplierList: (payload) => {
        const supplierList = getLocalStorageData('supplierList');
        const updatedList = [...supplierList, payload.payload.deletedSupplier];
        setLocalStorageData("supplierList", updatedList);
        
        return {
            Data: updatedList
        };
    },
    createSupplierList: () => {
        const supplierList = getLocalStorageData('supplierList');

        return {
            Data: supplierList
        };
    },
    changeStatusSupplierList: (payload) => {

        const id = payload.payload.id;

        const value = payload.payload.event.value;

        const supplierList = getLocalStorageData('supplierList');
        // console.log(supplierList)
        const updateList = supplierList.map(item => {

            if (item.id == id) {
                return {
                    ...item,
                    status: value
                }
            }
            return item
        });
        setLocalStorageData("supplierList", updateList);

        return {
            Data: updateList
        };
    },
    resetSupplierList: () => {
        const supplierList = getLocalStorageData('supplierList');

        return {
            Data: supplierList
        };
    },
}

export default SupplierFactory