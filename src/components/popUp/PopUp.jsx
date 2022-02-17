import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

PopUp.propTypes = {
    text: PropTypes.string,
    onYesClick: PropTypes.func,
    onNoClick: PropTypes.func,
};

PopUp.defaultProps = {
    text: '',
    onYesClick: null,
    onNoClick: null,
}

function PopUp(props) {
    const { text, onYesClick, onNoClick } = props;

    function handleYesClick() {
        if (onYesClick)
            onYesClick();
    }

    function handleNoClick() {
        if (onNoClick)
            onNoClick();
    }

    return (
        <div className='popup'>
            <div className='popup-content'>
                <div className="popup-title">
                    <h1>DETETE A USER</h1>
                </div>
                <div className="popup-description">
                    <p>{text}</p>
                </div>
                <div className="btn">
                    <button id="btn-yes" onClick={handleYesClick}>Yes</button>
                    <button id="btn-no" onClick={handleNoClick}>No</button>
                </div>
            </div>
        </div>
    );
}

export default PopUp;