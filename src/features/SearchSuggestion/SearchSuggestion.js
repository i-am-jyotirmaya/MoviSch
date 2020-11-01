import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

import ListItem from '../../components/ListItem/ListItem';

import './SearchSuggestion.scss';

const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    close: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: 1000 }
        }
    },
    close: {
        x: -100,
        opacity: 0,
        transition: {
            x: { stiffness: 1000, velocity: -1000 }
        }
    }
}

const SearchSuggestion = ({data, variant}) => {
    console.log(data.results.length, variant);
    return (
        <motion.section 
            animate={variant} 
            exit={{
                x: -100,
                opacity: 0,
                transition: {
                    x: { stiffness: 1000, velocity: -1000 }
                }
            }} 
            variants={variants} 
            className="search-suggestion"
        >
            <div className="list-container">
                <ul className="list">
                    {
                        data && data.results && data.results.map((item, index) => (
                            <ListItem key={index} leadingImage={item.Poster} title={item.Title} subTitle={`${item.Type} (${item.Year})`} />
                        ))
                    }
                </ul>
            </div>
        </motion.section>
    )
}

SearchSuggestion.propTypes = {
    data: PropTypes.shape({
        results: PropTypes.arrayOf(PropTypes.shape({
            Title: PropTypes.string,
            Year: PropTypes.string,
            imdbID: PropTypes.string,
            Type: PropTypes.string,
            Poster: PropTypes.string
        })),
        totalResults: PropTypes.number
    }),
    variant: PropTypes.string
}

export default SearchSuggestion;