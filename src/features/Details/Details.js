import "./Details.scss";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector, useStore } from "react-redux";

import { ReactComponent as ImdbLogo } from "../../assets/IMDB_Logo_2016.svg";
import { ReactComponent as MetaCriticLogo } from "../../assets/Metacritic_logo.svg";
import NoPoster from "../../assets/no-poster.png";
import { ReactComponent as RottenTomatoesLogo } from "../../assets/Rotten_Tomatoes_logo.svg";
import Chip from "../../components/Chip/Chip";
import Logo from "../../components/Logo/Logo";
import { fetchDetailsAsync, selectDetails } from "./DetailsSlice";

const Details = ({ match }) => {
  // console.log(match.params.id)
  const transition = {
    type: "spring",
    stiffness: 150,
    damping: 17,
    duration: 0.5,
    // ease: [0.43, 0.13, 0.23, 0.96]
  };
  const variants = {
    exit: {
      x: "-100vh",
      transition,
    },
    in: {
      x: 0,
      transition,
    },
  };
  const store = useStore();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [posterUrl, setPosterUrl] = useState("");
  const data = useSelector(selectDetails);
  useEffect(() => {
    console.log(store.getState());
    setIsMobile(store.getState().app.isMobile);
  }, []);
  useEffect(() => {
    const imdbId = match.params.id;
    if (imdbId) {
      dispatch(fetchDetailsAsync(imdbId));
    }
  });

  useEffect(() => {
    if (data.Poster === "N/A") setPosterUrl(NoPoster);
    else {
      fetch(data.Poster)
        .then((res) => res.blob())
        .then((img) => {
          setPosterUrl(URL.createObjectURL(img));
        })
        .catch((err) => console.log(err));
    }
  }, [data.Poster]);

  return (
    <motion.section className="details" initial="exit" animate="in" exit="exit" variants={variants}>
      <div style={{ display: "flex" }}>
        <Logo isMobile={isMobile} style="focus" />
      </div>
      <SkeletonTheme color="rgba(0,0,0,.33)" highlightColor="rgba(0,0,0,.33)">
        <div className="details__main">
          <div className="details__main__poster">
            {posterUrl ? <img src={posterUrl} alt="" /> : <Skeleton height="100%" />}
          </div>
          <div className="details__main__info">
            <h1>{data.Title || <Skeleton />}</h1>
            <h2>{data.Type ? `${data.Type} (${data.Year})` : <Skeleton />}</h2>
            <div className="details__main__info__sub1">
              <span className="rated">{data.Rated || <Skeleton />}</span>
              <span className="duration">{data.Runtime ? `Duration: ${data.Runtime}` : <Skeleton />}</span>
            </div>
            <div className="details__main__info__sub2">
              {data.Released ? `Released : ${data.Released}` : <Skeleton />}
              <div className="language">{data.Language || <Skeleton />}</div>
              <div className="genre">
                {data.Genre &&
                  data.Genre.split(",")
                    // .slice(0,5)
                    .map((item, index) => <Chip key={index} text={item.trim()} />)}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="details__ratings">
          <Imdb text={data.Ratings[0].Value} />
          <div className="details__ratings__division"></div>
          <RottenTomatoes text="80%" />
          <div className="details__ratings__division"></div>
          <MetaCritic text="78" />
        </div>
        <hr />
        <div className="details__crew">
          <article>
            <span>Director:</span>
            <span>{data.Director || <Skeleton />}</span>
          </article>
          <article>
            <span>Writer:</span>
            <div>{data.Writer || <Skeleton />}</div>
          </article>
          <article>
            <span>Actors:</span>
            <div>{data.Actors || <Skeleton />}</div>
          </article>
          <article>
            <span>Country:</span>
            <div>{data.Country || <Skeleton />}</div>
          </article>
        </div>
        <hr />
        <div className="details__crew">
          <article>
            <span>Plot:</span>
            <div>{data.Plot || <Skeleton />}</div>
          </article>
        </div>
      </SkeletonTheme>
    </motion.section>
  );
};

export default Details;

const Ratings = ({ Icon, text, style }) => {
  return (
    <div className="details__ratings__rating">
      <Icon style={{ ...style }} />
      {text || <Skeleton />}
    </div>
  );
};

const Imdb = ({ text }) => {
  return <Ratings Icon={ImdbLogo} text={text} style={{ width: "40%" }} />;
};
const RottenTomatoes = ({ text }) => {
  return <Ratings Icon={RottenTomatoesLogo} text={text} style={{ transform: "scale(2.5)" }} />;
};
const MetaCritic = ({ text }) => {
  return <Ratings Icon={MetaCriticLogo} text={text} style={{ transform: "scale(4)" }} />;
};
