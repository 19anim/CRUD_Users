import React from 'react';
import PropTypes from 'prop-types';
import './style.css'

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

    const { usersList, onClickedEditButton, onClickedSaveButton, onClickedDeleteButton, paginator } = props;
    var nameToChange = '';

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

    return (
        <ul>
            {usersList.map(
                (user, index) => {
                    if (index >= ((paginator.page - 1) * paginator.limit)
                        && index < (paginator.page * paginator.limit))
                        return !user.isEditing
                            ? <>
                                <div key={user.id}>
                                    <li > {user.name} </li>
                                    <button onClick={() => {
                                        handleEditButton(user)
                                    }}>Edit</button>
                                    <button onClick={() => {
                                        handleDeleteButton(user)
                                    }}>Delete</button>
                                </div>
                            </>
                            : <>
                                <div key={user.id}>
                                    <input type="text" defaultValue={user.name} onChange={handleOnChange} />
                                    <button onClick={() => {
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