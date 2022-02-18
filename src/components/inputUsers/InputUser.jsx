import React from 'react';
import PropTypes from 'prop-types';

InputUser.propTypes = {
    onSubmit: PropTypes.func,
};

InputUser.defaultProps = {
    onSubmit: null,
}

function InputUser(props) {

    const { onSubmit } = props
    let userInfo = {
        first_name: '',
        last_name: '',
        email: '',
        gender: 'Male',
    }

    function handleSubmit(e) {
        let isEmptyProp = false;
        if (onSubmit) {
            let id = Math.trunc(Math.random() * 1000000);
            userInfo = {
                id,
                ...userInfo,
            }
            for (const key in userInfo) {
                if (userInfo[key] === '') {
                    isEmptyProp = true;
                    console.log(`${key}: ${userInfo[key]}`)
                }
            }
            isEmptyProp ? alert('You need to input all information') : onSubmit(userInfo);
        }
        for (const input of e.target) {
            if (input.type !== 'submit' && input.type !== 'select-one')
                input.value = ''
        }
        e.preventDefault();
    }

    function handleOnChange(e) {
        userInfo[e.target.name] = e.target.value;
    }

    function handleOnChangeSelect(e) {
        console.log(`${e.target.name}: ${e.target[e.target.value].text}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First name:</label>
                    <input type="text" name="first_name" onChange={handleOnChange} />
                </div>
                <div>
                    <label>Last name:</label>
                    <input type="text" name="last_name" onChange={handleOnChange} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={handleOnChange} />
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="gender" onChange={handleOnChangeSelect}>
                        <option value="0" selected>Male</option>
                        <option value="1">Female</option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="Add User Information" />
                </div>
            </form>
        </div>
    );
}

export default InputUser;