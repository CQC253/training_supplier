import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeContainer from 'shared/containers/home/HomeContainer';
import actionSample from "redux/app/action"
import { useSelector } from 'react-redux';

function HomePage(props) {
    return (
        <div className="HomePage">
            <HomeContainer />
        </div>
    )
}
export default HomePage;