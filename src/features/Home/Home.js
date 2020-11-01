import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { useDispatch, useSelector, useStore } from 'react-redux';
import * as _ from 'lodash';

import About from '../../components/About/About';
import Searchbox from '../../components/Searchbox/Searchbox';
import { ReactComponent as LogoDesktop } from "../../assets/HomePageLogoDesktop.svg";
import { ReactComponent as LogoMobile } from "../../assets/HomePageLogoMobile.svg";
import { search, searchByName, searchTextInput, selectError, selectSearchResult, selectSearchText } from "./HomeSlice";
import { ReactComponent as RollLoader } from '../../assets/rolling-loader.svg';

import './Home.scss';
import Logo from '../../components/Logo/Logo';
import SearchSuggestion from '../SearchSuggestion/SearchSuggestion';

const logo = {
    'focus': {
        translateX: window.screen.availWidth
    },
    'blur': {
        translateX: 0
    }
}

const about = {
    'focus': {
        translateY: 500
    },
    'blur': {
        translateY: 0
    }
}

const searchDebounced = _.debounce((searchText, dispatch) => {
    dispatch(dispatch => {
        dispatch(searchTextInput(searchText.trim()));
        dispatch(searchByName(searchText.trim()));
    });
}, 500, {trailing: true})

const Home = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [focus, setFocus] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText);
    const searchResult = useSelector(selectSearchResult);
    const error = useSelector(selectError);
    const [isSuggestionOpen, toggleSuggestionOpen] = useCycle('close', 'open');

    useEffect(() => {
        let mql = window.matchMedia('(max-width: 500px)');
        setIsMobile(mql.matches);
        mql.addEventListener("change", () => {
            setIsMobile(mql.matches);
            console.log(isMobile);
        });

        return () => {
            mql.removeEventListener("change");
        }
    }, [])
    console.log(searchResult);

    useEffect(() => {
        if(searchResult.totalResults !== 0) {
            toggleSuggestionOpen(1);
            setIsSearching(false);
        } else {
            toggleSuggestionOpen(0);
            setIsSearching(false);
        }
    }, [searchResult.totalResults])
    // toggleSuggestionOpen(searchResult.totalResults === 0 ? 2 : 1);
    // console.log(store.getState());
    console.log(isSuggestionOpen);

    return (
        <section className="home">
            <Logo isMobile={isMobile} style={focus ? 'focus' : 'blur'}/>
            {/* <motion.div initial={false} ></motion.div> */}
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
            <Searchbox 
                onFocus={() => setFocus(true)} 
                onBlur={() => !searchText && setFocus(false)}
                // onInput={(ev) => dispatch(searchTextInput(ev.target.value))}
                onInput={(ev) => {
                            searchDebounced(ev.target.value, dispatch);
                            if(ev.target.value) setIsSearching(true);
                            else setIsSearching(false);
                        }}
                isSearching={isSearching}
                Loader={RollLoader}
                />
            {searchResult.totalResults === 0 && error !== '' && <h2 className="search-error">{error}</h2>}
            <AnimatePresence>
            {searchResult.totalResults !== 0 && <SearchSuggestion data={searchResult} variant={isSuggestionOpen} />}
            </AnimatePresence>
            <motion.div
                className="mt-auto"
                variants={about}
                animate={focus ? 'focus' : 'blur'}
                transition={{duration: .15}}
            >
                <About/>
            </motion.div>
        </section>
    );
}

export default Home;