import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';

import './Details.scss';
import { ReactComponent as Imdb } from '../../assets/imdb-brands.svg'
import Logo from '../../components/Logo/Logo';
import NoPoster from '../../assets/no-poster.png';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Chip from '../../components/Chip/Chip';

const Details = ({data, match}) => {
    // console.log(match.params.id)
    const transition = {
        type:"spring",
        stiffness: 150,
        damping: 17,
        duration: .5,
        // ease: [0.43, 0.13, 0.23, 0.96]
    };
    const variants = {
        exit: {
            x: "-100vh",
            transition
        },
        in: {
            x: 0,
            transition
        }
    }
    const store = useStore();
    const [isMobile, setIsMobile] = useState(false);
    const [posterUrl, setPosterUrl] = useState('');
    useEffect(() => {
        console.log(store.getState());
        setIsMobile(store.getState().app.isMobile)
    }, []);

    useEffect(() => {
        if(data.Poster === 'N/A')
            setPosterUrl(NoPoster);
        else {
            fetch(data.Poster)
            .then(res => res.blob()).then(img => {
                setPosterUrl(URL.createObjectURL(img));
            })
            .catch(err => console.log(err));
        }
    }, [data.poster]);

    return (
        <motion.section className="details" initial="exit" animate="in" exit="exit" variants={variants}>
            <div style={{display: 'flex'}}><Logo isMobile={isMobile} style='focus'/></div>
            <SkeletonTheme color="rgba(0,0,0,.33)" highlightColor="rgba(0,0,0,.33)">
                <div className="details__main">
                    <div className="details__main__poster">
                        {posterUrl ? <img src={posterUrl} alt="" /> : <Skeleton height="100%"/>}
                    </div>
                    <div className="details__main__info">
                        <h1>{data.Title || <Skeleton />}</h1>
                        <h2>{data.Type ? `${data.Type} (${data.Year})` : <Skeleton />}</h2>
                        <div className="details__main__info__sub1">
                            <span className="rated">
                                {data.Rated || <Skeleton />}
                            </span>
                            <span className="duration">
                                {data.Runtime ? `Duration: ${data.Runtime}` : <Skeleton />}
                            </span>
                        </div>
                        <div className="details__main__info__sub2">
                            {data.Released ? `Released : ${data.Released}` : <Skeleton/>}
                            <div className="language">
                                {data.Language || <Skeleton/>}
                            </div>
                            <div className="genre">
                                {data.Genre && data.Genre.split(",").slice(0,5).map(item => <Chip text={item.trim()}/>)}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <hr/>
                <div className="details__ratings">
                    <Ratings Icon={Imdb} text={data.Ratings[0].Value}/>
                    <div className="details__ratings__division"></div>
                    <div className="details__ratings__rating"></div>
                    <div className="details__ratings__division"></div>
                    <div className="details__ratings__rating"></div>
                </div>
                <hr/>
            </SkeletonTheme>
        </motion.section>
    )
}

export default Details;

const Ratings = ({Icon, text}) => {
    return (
        <div className="details__ratings__rating">
            <Icon style={{maxHeight: '2.3em', width: '25%'}}/>
            {text || <Skeleton />}
        </div>
    )
}