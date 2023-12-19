import { getLocalStorageData, setLocalStorageData } from "./localStorageUtils";

const SupplierFactory = {
    fetchSupplierList: () => {
        const supplierList = getLocalStorageData('supplierList');

        return {
            Data: supplierList
        };
    },
    searchInputSupplierList: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');

        // Lọc các phần tử trong filteredList  dựa trên giá trị tìm kiếm
        const filteredList = supplierList.filter(item => {
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

            return isInputValueMatch;
        });

        // Cập nhật supplierListRedux với danh sách đã lọc
        // console.log('filteredList', filteredList);
        return {
            Data: filteredList
        };
    },
    searchStatusSupplierList: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');

        // Lọc các phần tử trong filteredList  dựa trên giá trị tìm kiếm
        const filteredList = supplierList.filter(item => {
            // Kiểm tra giá trị tìm kiếm
            const isStatusValueMatch = payload.payload.statusValue ? item.status === payload.payload.statusValue : true;

            return isStatusValueMatch;
        });

        // Cập nhật supplierListRedux với danh sách đã lọc
        // console.log('filteredList', filteredList);
        return {
            Data: filteredList
        };
    },
    searchAddressSupplierList: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');

        // Lọc các phần tử trong filteredList  dựa trên giá trị tìm kiếm
        const filteredList = supplierList.filter(item => {
            // Kiểm tra giá trị tìm kiếm
            const isAddressValueMatch = payload.payload.addressValue ? item.address === payload.payload.addressValue : true;

            return isAddressValueMatch;
        });

        // Cập nhật supplierListRedux với danh sách đã lọc
        // console.log('filteredList', filteredList);
        return {
            Data: filteredList
        };
    },
    updateSupplierList: (payload) => {

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