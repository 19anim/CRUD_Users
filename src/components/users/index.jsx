import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

Users.propTypes = {
    usersList: PropTypes.array,
    onClickedEditButton: PropTypes.func,
    onClickedSaveButton: PropTypes.func,
};

Users.defaultProps = {
    usersList: [],
    onClickedEditButton: null,
    onClickedSaveButton: null,
}

function Users(props) {

    const { usersList, onClickedEditButton, onClickedSaveButton } = props;

    function handleEditButton(user) {
        if (onClickedEditButton)
            onClickedEditButton(user);
    }

    function handleSaveButton(user, nameToChange) {
        if (onClickedSaveButton)
            onClickedSaveButton(user, nameToChange);
    }

    function handleOnChange(e) {
        nameToChange = e.target.value;
    }

    return (
        <ul>
            {usersList.map(
                (user) => {
                    return !user.isEditing
                        ? <>
                            <div key={user.id}>
                                <li > {user.name} </li>
                                <button onClick={() => {
                                    handleEditButton(user)
                                }}>Edit</button>
                            </div>
                        </>
                        : <>
                            <div key={user.id}>
                                <input type="text" placeholder="Input new user name" onChange={handleOnChange} />
                                <button onClick={() => {
                                    let nameToChange = '';
                                    handleSaveButton(user, nameToChange)
                                }}>Save</button>
                            </div>
                        </>
                }
            )}
        </ul >
    );
}

export default Users;