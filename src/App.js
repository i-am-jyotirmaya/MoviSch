import React, { useEffect, useRef, useState } from 'react';

import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import {setScreenSize} from './AppSlice';
import Home from './features/Home/Home';
import './App.scss';
import SearchSuggestion from './features/SearchSuggestion/SearchSuggestion';
import PageIndex from './components/PageIndex/PageIndex';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Switch, useLocation } from 'react-router-dom';
import Details from './features/Details/Details';

const App = () => {
  const location = useLocation();
  const onNetworkStatusChange = () => {
    setIsNetworkNotificationVisible(true);
    setTimeout(() => setIsNetworkNotificationVisible(false), 1500);
  }
  useEffect(() => {
    console.log('Network Status',navigator.onLine);
    window.addEventListener('offline', () => {
      onNetworkStatusChange();
    });
    window.addEventListener('online', () => {
      onNetworkStatusChange();
    });
  }, []);
  const [isNetworkNotificationVisible, setIsNetworkNotificationVisible] = useState(false);
  // useEffect(() => {
  //   let mql = window.matchMedia('(max-width: 500px)');
  //   setScreenSize(mql.matches);
  //   console.log("isMobile");
  //   mql.addEventListener("change", () => {
  //       // setIsMobile(mql.matches);
  //       setScreenSize(mql.matches);
  //   });
  
  //   return () => {
  //       mql.removeEventListener("change");
  //   }
  // }, [])
  const dispatch = useDispatch();
  let mql = window.matchMedia('(max-width: 500px)');
  // console.log(mql.matches)
  dispatch(setScreenSize(mql.matches));

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/details/:id" component={Details}/>
          <Route path="/" component={Home}/>
        </Switch>
      </AnimatePresence>
      {/* <Details data={{
        Title: "God of War",
        Year: "2018",
        Rated: "M",
        Released: "20 Apr 2018",
        Runtime: "N/A",
        Genre: "Action, Adventure, Drama, Fantasy, Mystery, Sci-Fi",
        Director: "Cory Barlog",
        Writer: "Matthew Sophos, Richard Zangrande Gaubert, Cory Barlog",
        Actors: "Christopher Judge, Sunny Suljic, Jeremy Davies, Danielle Bisutti",
        Plot: "After wiping out the gods of Mount Olympus, Kratos moves on to the frigid lands of Scandinavia, where he and his son must embark on an odyssey across a dangerous world of gods and monsters.",
        Language: "English, Portuguese",
        Country: "USA",
        Awards: "N/A",
        Poster: "https://m.media-amazon.com/images/M/MV5BMmVjMzkyYWMtNDNhNi00ZWI3LTgxNGUtODRkMWYxNjZmNDI5XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SX300.jpg",
        Ratings: [
            {
                "Source": "Internet Movie Database",
                "Value": "9.6/10"
            }
        ],
        Metascore: "N/A",
        imdbRating: "9.6",
        imdbVotes: "11,430",
        imdbID: "tt5838588",
        Type: "game",
        DVD: "N/A",
        BoxOffice: "N/A",
        Production: "N/A",
        Website: "N/A",
        Response: "True"
      }}/> */}
      <AnimatePresence>
        {isNetworkNotificationVisible && <motion.div initial={{translateY: 50}} exit={{translateY: 50}} animate={{translateY: 0, backgroundColor: navigator.onLine ? '#2a812a' : '#c4351c'}} className="network-notification">
          {navigator.onLine ? 'Connected Successfully' : 'No Internet Connection'}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default App;
