import React from 'react';
import PropTypes from 'prop-types';
import './style.css'
import PopUp from '../popUp/PopUp';
import { useState, useRef } from 'react';

Users.propTypes = {
    usersList: PropTypes.array,
    onClickedEditButton: PropTypes.func,
    onClickedSaveButton: PropTypes.func,
    onClickedDeleteButton: PropTypes.func,
};

Users.defaultProps = {
    usersList: [],
    onClickedEditButton: null,
    onClickedSaveButton: null,
    onClickedDeleteButton: null,
}

function Users(props) {
    const [popupText, setPopupText] = useState(`Do you want to delete this user?`);
    const [popupToggle, setPopupToggle] = useState(false);
    const { usersList, onClickedEditButton, onClickedSaveButton, onClickedDeleteButton, paginator } = props;
    var nameToChange = '';
    var userToDelete = useRef({});

    function handleEditButton(user) {
        if (onClickedEditButton)
            onClickedEditButton(user);
    }

    function handleDeleteButton(user) {
        if (onClickedDeleteButton)
            onClickedDeleteButton(user);
    }

    function handleSaveButton(user, nameToChange) {
        if (onClickedSaveButton)
            onClickedSaveButton(user, nameToChange);
    }

    function handleOnChange(e) {
        nameToChange = e.target.value;
    }

    function handlePopupToggle() {
        setPopupToggle(!popupToggle);
    }

    function handleYesClick() {
        console.log(userToDelete.current)
        handleDeleteButton(userToDelete.current)
        handlePopupToggle()
    }

    function handleNoClick() {
        handlePopupToggle()
    }

    return (
        <><h1>User List</h1>
            <ul>
                {usersList.map(
                    (user, index) => {
                        if (index >= ((paginator.page - 1) * paginator.limit)
                            && index < (paginator.page * paginator.limit))
                            return !user.isEditing
                                ? <>
                                    <div key={user.id}>
                                        <li> {user.name} </li>
                                        <button onClick={() => {
                                            handleEditButton(user);
                                        }}>Edit</button>
                                        <button onClick={() => {
                                            userToDelete.current = user;
                                            handlePopupToggle();
                                        }}>Delete</button>
                                    </div>
                                </>
                                : <>
                                    <div key={user.id}>
                                        <input type="text" defaultValue={user.name} onChange={handleOnChange} />
                                        <button onClick={() => {
                                            handleSaveButton(user, nameToChange);
                                        }}>Save</button>
                                    </div>
                                </>;
                    }
                )}
            </ul>
            {popupToggle
                ? <PopUp text={popupText} onYesClick={handleYesClick} onNoClick={handleNoClick} />
                : null
            }
        </>
    );
}

export default Users;