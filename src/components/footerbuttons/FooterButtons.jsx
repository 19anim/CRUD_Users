import React from 'react';
import PropTypes from 'prop-types';

FooterButtons.propTypes = {
    paginator: PropTypes.object,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
};

FooterButtons.defaultProps = {
    paginator: {},
    onPrevClick: null,
    onNextClick: null,
}

function FooterButtons(props) {


    const { paginator, onPaginatorClick, onResetClick, onSortClick } = props
    const { page, limit, totalItems } = paginator
    const lastPage = Math.ceil(totalItems / limit);

    function handlePrevButton(page) {
        if (onPaginatorClick)
            onPaginatorClick(page)
    }

    function handleNextButton(page) {
        if (onPaginatorClick)
            onPaginatorClick(page)
    }

    function handleResetButton() {
        if (onResetClick)
            onResetClick();
    }

    function handleSortButton() {
        if (onSortClick)
            onSortClick();
    }

    return (
        <div>
            <button
                disabled={page <= 1}
                onClick={() => {
                    handlePrevButton(page - 1);
                }}
            >
                Prev
            </button>
            <button
                disabled={page >= lastPage}
                onClick={() => {
                    handleNextButton(page + 1);
                }}
            >
                Next
            </button>
            <button
                onClick={() => {
                    handleSortButton();
                }}
            >
                Sort
            </button>
            <button
                onClick={() => {
                    handleResetButton();
                }}
            >
                Reset Data
            </button>
        </div>
    );
}

export default FooterButtons;