import { Box } from '@findxdn/erp-theme';
import React from 'react';
import PlaceHolder from '../place-holder/PlaceHolder';
import ProductTableLoader from '../product-table-loader/ProductTableLoader';

function LoaderUpdateProduct() {
    return (
        <>
            <div className='mb-2'>
                <div
                    className="p-3 d-flex"
                    style={{ backgroundColor: '#FFFFFF', columnGap: '10px' }}
                >
                    <div style={{ flex: '1' }}>
                        <div
                            className="mb-2"
                            style={{ height: 24, width: 150 }}
                        >
                            <PlaceHolder />
                        </div>
                        <div className="" style={{ height: 30 }}>
                            <PlaceHolder />
                        </div>
                    </div>
                    <div className="" style={{ flex: '1' }}>
                        <div
                            className="mb-2"
                            style={{ height: 24, width: 150 }}
                        >
                            <PlaceHolder />
                        </div>
                        <div className="" style={{ height: 30 }}>
                            <PlaceHolder />
                        </div>
                    </div>
                    <div className="" style={{ flex: '1' }}>
                        <div
                            className="mb-2"
                            style={{ height: 24, width: 150 }}
                        >
                            <PlaceHolder />
                        </div>
                        <div className="" style={{ height: 30 }}>
                            <PlaceHolder />
                        </div>
                    </div>
                </div>
                <div
                    className="p-3 d-flex"
                    style={{ backgroundColor: '#FFFFFF', columnGap: '10px' }}
                >
                    <div style={{ flex: '1' }}>
                        <div
                            className="mb-2"
                            style={{ height: 24, width: 150 }}
                        >
                            <PlaceHolder />
                        </div>
                        <div className="" style={{ height: 30 }}>
                            <PlaceHolder />
                        </div>
                    </div>
                    <div className="" style={{ flex: '1' }}>
                        <div
                            className="mb-2"
                            style={{ height: 24, width: 150 }}
                        >
                            <PlaceHolder />
                        </div>
                        <div className="" style={{ height: 30 }}>
                            <PlaceHolder />
                        </div>
                    </div>
                    <div className="" style={{ flex: '1' }}>
                        <div
                            className="mb-2"
                            style={{ height: 24, width: 150 }}
                        >
                            <PlaceHolder />
                        </div>
                        <div className="" style={{ height: 30 }}>
                            <PlaceHolder />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 mb-2" style={{backgroundColor: '#FFFFFF'}}>
                <div className="mb-3" style={{ height: 150}}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 150}}>
                    <PlaceHolder />
                </div>
            </div>
            <ProductTableLoader />
        </>
    );
}

export default LoaderUpdateProduct;
