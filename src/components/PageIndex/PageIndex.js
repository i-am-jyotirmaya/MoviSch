import React from 'react';

import './PageIndex.scss';

const PageIndex = ({totalPages, activePage}) => {
    return (
        <div className="index-container">
            <div className="index-container__index">1</div>
            <div className="index-container__index active">2</div>
            <div className="index-container__index">3</div>
            <div className="index-container__index">4</div>
        </div>
    );
}

export default PageIndex;