import React from 'react';
import './Searchbox.scss';

const Searchbox = ({onFocus, onBlur, onInput, Loader, isSearching, ...props}) => (
    <div className="searchbox-container">
        <input type="text" className="searchbox" placeholder="Search Movies, Series, Games, etc." onBlur={onBlur} onFocus={onFocus} onInput={onInput} {...props} />
        {isSearching && <span className="search-loader">
            <Loader/>
        </span>}
    </div>
)

export default Searchbox;