import { Box } from '@findxdn/erp-theme';
import React from 'react';
import ProductTableLoader from '../product-table-loader/ProductTableLoader';
import PlaceHolder from '../place-holder/PlaceHolder';

function LoaderProductDetail() {
    return (
        <>
            <Box boxTitle=" " className="mb-2">
                <div className="col mb-2" style={{ height: 34 }}>
                    <PlaceHolder />
                </div>
                <div className="col mb-2" style={{ height: 34 }}>
                    <PlaceHolder />
                </div>
                <div className="col mb-2" style={{ height: 34 }}>
                    <PlaceHolder />
                </div>
                <div className="col mb-2" style={{ height: 34 }}>
                    <PlaceHolder />
                </div>
            </Box>
            <div className="p-5 mb-2 d-flex" style={{backgroundColor: '#FFFFFF'}}>
                <div className="mb-2" style={{ height: 200, width: 200 }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2 ml-5" style={{ height: 200, width: 200 }}>
                    <PlaceHolder />
                </div>
            </div>
            <ProductTableLoader />
        </>
    );
}

export default LoaderProductDetail;
