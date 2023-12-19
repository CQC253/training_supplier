import { Box } from '@findxdn/erp-theme'
import React from 'react'
import PlaceHolder from '../place-holder/PlaceHolder'

function UpdateSizePoupLoader() {
    return (
        <Box boxTitle=" " style={{width: '800px'}}>
            <div className="mb-4" style={{ height: 34 }}>
                <PlaceHolder />
            </div>
            <div className='d-flex mb-4' style={{columnGap: '20px'}}>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
            </div>
            <div className='d-flex mb-4' style={{columnGap: '20px'}}>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
            </div>
            <div className='d-flex mb-4' style={{columnGap: '20px'}}>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
                <div className="mb-2" style={{ height: 34, flex: '1' }}>
                    <PlaceHolder />
                </div>
            </div>
            <div className="mb-4" style={{ height: 45 }}>
                <PlaceHolder />
            </div>
        </Box>
    )
}

export default UpdateSizePoupLoader