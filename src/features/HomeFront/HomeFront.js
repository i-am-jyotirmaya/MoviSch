import React from 'react';

import './HomeFront.scss';

const HomeFront = () => {
    return (
        <React.Fragment>
            <AnimatePresence>
                {!focus && <motion.div 
                    animate={focus ? 'focus' : 'blur'} 
                    variants={logo} 
                    transition={{duration: .2, ease: 'easeOut'}} 
                    initial={logo.focus}
                    exit={{...logo.focus, height: 0}}
                    // className="mt-auto" 
                >
                    {isMobile ? <LogoMobile/> : <LogoDesktop/>}
                </motion.div>}
            </AnimatePresence>
            <Link to="/details/5">Det</Link>
            <Searchbox 
                onFocus={() => setFocus(true)} 
                onBlur={() => !searchText && setFocus(false)}
                // onInput={(ev) => dispatch(searchTextInput(ev.target.value))}
                onInput={(ev) => {
                            dispatch(clearSearchData());
                            searchDebounced(ev.target.value, dispatch);
                            if(ev.target.value) setIsSearching(true);
                            else setIsSearching(false);
                        }}
                isSearching={isSearching}
                Loader={RollLoader}
                />
            {searchResult.totalResults === 0 && error !== '' && <h2 className="search-error">{error}</h2>}
            <AnimatePresence>
            {searchResult.totalResults !== 0 && <SearchSuggestion data={searchResult} variant={isSuggestionOpen} onPageChange={onPageChange} />}
            </AnimatePresence>
            <motion.div
                className="mt-auto"
                variants={about}
                animate={focus ? 'focus' : 'blur'}
                transition={{duration: .15}}
            >
                <About/>
            </motion.div>
        </React.Fragment>
    )
}

export default HomeFront;