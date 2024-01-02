import { getLocalStorageData, setLocalStorageData } from "./localStorageUtils";

const SupplierFactory = {
    fetchAndSearchData: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');
        let filteredList = supplierList;
    
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
    
        if (payload && payload.payload) {
            filteredList = filteredList.filter(item => {
                const isEmptyField = (
                    item.items.supplierName === "" ||
                    item.items.code === "" ||
                    item.items.deptCode === "" ||
                    item.items.phone === "" ||
                    item.items.email === "" ||
                    item.items.address === ""
                );
                
                if (isEmptyField) {
                    return false; 
                }
    
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
        }

        filteredList.sort((a, b) => a.items.id - b.items.id);
    
        return {
            Data: filteredList
        };
    },    
    deleteSupplierList: (payload) => {
        const supplierList = getLocalStorageData('supplierList');
        const id = parseInt(payload.payload.id)
        const updatedList = supplierList.filter((item) => item.items.id !== id);

        updatedList.sort((a, b) => a.items.id - b.items.id);
        setLocalStorageData("supplierList", updatedList);
        return {
            Data: updatedList
        };
    },
    undoSupplierList: (payload) => {
        const supplierList = getLocalStorageData('supplierList');
        const updatedList = [...supplierList];
        const deletedSupplier = payload.payload.deletedSupplier
        if (deletedSupplier) {
            updatedList.push(deletedSupplier);
        }

        updatedList.sort((a, b) => a.items.id - b.items.id);
        setLocalStorageData('supplierList', updatedList);

        return {
            Data: updatedList
        };
    },
    createSupplierList: (payload) => {
        // console.log('payload factory', payload);
        const supplierList = getLocalStorageData('supplierList');

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

        supplierList.push(newItem);

        supplierList.sort((a, b) => a.items.id - b.items.id);
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

        updateList.sort((a, b) => a.items.id - b.items.id);
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
        
        updateList.sort((a, b) => a.items.id - b.items.id);
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