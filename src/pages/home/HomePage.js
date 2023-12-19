import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeContainer from 'shared/containers/home/HomeContainer';
import actionSample from "redux/app/action"
import { useSelector } from 'react-redux';

function HomePage(props) {
    const dispatch = useDispatch();
    const {
        loadingApp,
        loadingAppPopup,
        sampleData: {
            loading,
            data }
    } = useSelector((state) => state.App)
    // useEffect(() => {
    //     dispatch({type: actionSample.FETCH_SAMPLE_2})
    // }, [])

    return (
        <div className="HomePage">
            <HomeContainer />
            <button onClick={() => dispatch({ type: actionSample.FETCH_SAMPLE_2 })}>Click</button>
        </div>
    )
}
export default HomePage;