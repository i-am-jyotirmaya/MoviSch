import "./Home.scss";

import { AnimatePresence, motion, useCycle } from "framer-motion";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as LogoDesktop } from "../../assets/HomePageLogoDesktop.svg";
import { ReactComponent as LogoMobile } from "../../assets/HomePageLogoMobile.svg";
import { ReactComponent as RollLoader } from "../../assets/rolling-loader.svg";
import About from "../../components/About/About";
import Logo from "../../components/Logo/Logo";
import Searchbox from "../../components/Searchbox/Searchbox";
import SearchSuggestion from "../SearchSuggestion/SearchSuggestion";
import {
  clearSearchData,
  clearSearchDataList,
  search,
  searchByName,
  searchTextInput,
  selectError,
  selectSearchResult,
  selectSearchText,
} from "./HomeSlice";

const logo = {
  focus: {
    translateX: window.screen.availWidth,
  },
  blur: {
    translateX: 0,
  },
};

const about = {
  focus: {
    translateY: 500,
  },
  blur: {
    translateY: 0,
  },
};

const searchDebounced = _.debounce(
  (searchText, dispatch) => {
    dispatch((dispatch) => {
      dispatch(searchTextInput(searchText.trim()));
      dispatch(searchByName(searchText.trim()));
    });
  },
  500,
  { trailing: true }
);

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [focus, setFocus] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchText);
  const searchResult = useSelector(selectSearchResult);
  const error = useSelector(selectError);
  const [isSuggestionOpen, toggleSuggestionOpen] = useCycle("close", "open");
  const store = useStore();

  const transition = {
    type: "spring",
    stiffness: 150,
    damping: 17,
    duration: 0.5,
    // ease: [0.43, 0.13, 0.23, 0.96]
  };
  const variants = {
    exit: {
      x: "-100vw",
      opacity: 0,
      transition,
    },
    in: {
      x: 0,
      opacity: 1,
      transition,
    },
  };

  useEffect(() => {
    console.log(store.getState());
    setIsMobile(store.getState().app.isMobile);
  }, []);
  console.log(searchResult);

  useEffect(() => {
    if (searchResult.totalResults !== 0) {
      toggleSuggestionOpen(1);
      setIsSearching(false);
    } else {
      toggleSuggestionOpen(0);
      setIsSearching(false);
    }
  }, [searchResult.totalResults, searchResult.results.length]);
  // toggleSuggestionOpen(searchResult.totalResults === 0 ? 2 : 1);
  // console.log(store.getState());
  console.log(isSuggestionOpen);

  useEffect(() => {
    setIsSearching(false);
  }, [searchResult.page]);

  const onPageChange = (selectedItem) => {
    dispatch(clearSearchDataList());
    console.log(selectedItem);
    setIsSearching(true);
    dispatch(searchByName(searchText, selectedItem.selected + 1));
  };

  return (
    <motion.section initial="exit" animate="in" exit="exit" variants={variants} className="home">
      <Logo isMobile={isMobile} style={focus ? "focus" : "blur"} />
      {/* <motion.div initial={false} ></motion.div> */}
      <AnimatePresence>
        {!focus && (
          <motion.div
            animate={focus ? "focus" : "blur"}
            variants={logo}
            transition={{ duration: 0.2, ease: "easeOut" }}
            initial={logo.focus}
            exit={{ ...logo.focus, height: 0 }}
            // className="mt-auto"
          >
            {isMobile ? <LogoMobile /> : <LogoDesktop />}
          </motion.div>
        )}
      </AnimatePresence>
      {/* <Link to="/details/5">Det</Link> */}
      <Searchbox
        onFocus={() => setFocus(true)}
        onBlur={() => !searchText && setFocus(false)}
        // onInput={(ev) => dispatch(searchTextInput(ev.target.value))}
        onInput={(ev) => {
          dispatch(clearSearchData());
          searchDebounced(ev.target.value, dispatch);
          if (ev.target.value) setIsSearching(true);
          else setIsSearching(false);
        }}
        isSearching={isSearching}
        Loader={RollLoader}
      />
      {searchResult.totalResults === 0 && error !== "" && <h2 className="search-error">{error}</h2>}
      <AnimatePresence>
        {searchResult.totalResults !== 0 && (
          <SearchSuggestion data={searchResult} variant={isSuggestionOpen} onPageChange={onPageChange} />
        )}
      </AnimatePresence>
      <motion.div
        className="mt-auto"
        variants={about}
        animate={focus ? "focus" : "blur"}
        transition={{ duration: 0.15 }}
      >
        <About />
      </motion.div>
    </motion.section>
  );
};

export default Home;
