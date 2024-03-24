import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Higher-order function that wraps a Component with base props.
 *
 * @param {Function} Component - The component to be wrapped.
 * @returns {Function} The wrapped component with base props.
 */
const withBase = (Component) => (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <div>
            <Component {...props} navigate={navigate} dispatch={dispatch} location={location}/>
        </div>
    );
};

export default withBase;