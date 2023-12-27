import { getLocalStorageData, setLocalStorageData } from "./localStorageUtils";

const SupplierFactory = {
    fetchAndSearchData: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');
        let filteredList = supplierList;
    
        // Kiểm tra payload và loại bỏ các mục có giá trị rỗng cho các trường quan trọng ngay cả khi không có payload
        if (!payload || !payload.payload) {
            filteredList = filteredList.filter(item => (
                item.items.supplierName !== "" &&
                item.items.code !== "" &&
                item.items.deptCode !== "" &&
                item.items.phone !== "" &&
                item.items.email !== "" &&
                item.items.address !== "" 
            ));
        }
    
        // Lọc các phần tử trong filteredList dựa trên giá trị tìm kiếm và các điều kiện bổ sung từ payload
        if (payload && payload.payload) {
            filteredList = filteredList.filter(item => {
                // Kiểm tra giá trị rỗng cho các trường quan trọng
                const isEmptyField = (
                    item.items.supplierName === "" ||
                    item.items.code === "" ||
                    item.items.deptCode === "" ||
                    item.items.phone === "" ||
                    item.items.email === "" ||
                    item.items.address === ""
                );
                
                if (isEmptyField) {
                    return false; // Loại bỏ các mục có giá trị rỗng cho các trường quan trọng
                }
    
                // Tiếp tục lọc dựa trên giá trị tìm kiếm từ payload
                const searchFields = [
                    item.items.supplierCode,
                    item.items.supplierName,
                    item.items.category,
                    item.items.code,
                    item.items.deptCode,
                    item.items.phone,
                    item.items.email,
                    item.items.address,
                    item.items.status
                ];
    
                const isInputValueMatch = payload.payload.inputValue ? searchFields.some(field => {
                    const regex = new RegExp(`${payload.payload.inputValue}`, 'i');
                    return regex.test(field);
                }) : true;
                const isStatusValueMatch = payload.payload.statusValue ? item.items.status === payload.payload.statusValue : true;
                const isAddressValueMatch = payload.payload.addressValue ? item.items.address === payload.payload.addressValue : true;
    
                return isInputValueMatch && isStatusValueMatch && isAddressValueMatch;
            });
    
            // Sắp xếp danh sách đã lọc theo thứ tự tăng dần của ID
            filteredList.sort((a, b) => a.items.id - b.items.id);
        }
    
        // Cập nhật supplierListRedux với danh sách đã lọc
        return {
            Data: filteredList
        };
    },    
    deleteSupplierList: (payload) => {
        const supplierList = getLocalStorageData('supplierList');
        const id = parseInt(payload.payload.id)
        const updatedList = supplierList.filter((item) => item.items.id !== id);
        setLocalStorageData("supplierList", updatedList);
        return {
            Data: updatedList
        };
    },
    undoSupplierList: (payload) => {
        const supplierList = getLocalStorageData('supplierList');
        const updatedList = [...supplierList];
        const deletedSupplier = payload.payload.deletedSupplier
        // Thêm lại mục đã xóa vào danh sách
        if (deletedSupplier) {
            updatedList.push(deletedSupplier);
        }

        // Cập nhật danh sách nhà cung cấp với mục đã được hoàn tác
        setLocalStorageData('supplierList', updatedList);

        return {
            Data: updatedList
        };
    },
    createSupplierList: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');

        //Tạo categorization, note, items
        const newItem = {
            categorization: "",
            note: "Ghi chú",
            items: payload.payload.info
        };

        const existingItem = supplierList.find(
            item => item.items.category === payload.payload.info.category
        );

        if (existingItem) {
            newItem.categorization = existingItem.categorization;
        }

        // Thêm nhà cung cấp mới vào danh sách
        supplierList.push(newItem);

        // Lưu danh sách đã cập nhật trở lại local storage
        setLocalStorageData('supplierList', supplierList);

        return {
            Data: supplierList
        };
    },
    changeStatusSupplierList: (payload) => {
        const id = payload.payload.id;

        const newStatus = payload.payload.event.value;

        const supplierList = getLocalStorageData('supplierList');
        const updateList = supplierList.map(item => {

            if (item.items.id == id) {
                item.items.status = newStatus
            }
            return item
        });
        setLocalStorageData("supplierList", updateList);

        return {
            Data: updateList
        };
    },
    updateStatusSuppDetail: (payload) => {
        const id = payload.payload.id;

        const status = payload.payload.status;

        const supplierList = getLocalStorageData('supplierList');

        const updateList = supplierList.map(item => {

            if (item.items.id == id) {
                item.items.status = status
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