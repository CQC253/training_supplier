import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';


function HomeContainer (props) {
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => state.App.sampleData)
    useEffect(() => {
        dispatch({
            type: AppAction.FETCH_SAMPLE_1,
            payload: {}
        })
    }, [])

    return (
        <div className="HomeContainer">
            
        </div>
    )
}
export default HomeContainer;