import { Box } from '@findxdn/erp-theme';
import React from 'react';
import PlaceHolder from '../place-holder/PlaceHolder';

function TableLoader (props) {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div >
            <Box className="table">
                <table className="w-100 col">
                    <thead className="bg-light">
                        <tr>
                            <th style={{ width: 150 }}>
                                <div style={{ height: 15 }}>
                                    <PlaceHolder />
                                </div>
                            </th>
                            <th>
                                <div style={{ height: 15 }}>
                                    <PlaceHolder />
                                </div>
                            </th>
                            <th style={{ width: 300 }}>
                                <div style={{ height: 15 }}>
                                    <PlaceHolder />
                                </div>
                            </th>
                            <th style={{ width: 200 }}>
                                <div style={{ height: 15 }}>
                                    <PlaceHolder />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr.map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        <div style={{ height: 15 }}>
                                            <PlaceHolder />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ height: 15 }}>
                                            <PlaceHolder />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ height: 15 }}>
                                            <PlaceHolder />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ height: 15 }}>
                                            <PlaceHolder />
                                        </div>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </Box>
        </div>
    )
}
export default TableLoader;