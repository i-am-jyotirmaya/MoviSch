import React, { useEffect, useState } from 'react';

import './ListItem.scss';
import NoPoster from '../../assets/no-poster.png'
import { motion } from 'framer-motion';
import { useStore } from 'react-redux';

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
            x: { stiffness: 1000 }
        }
    }
}

const ListItem = ({leadingImage, title, subTitle, endImage}) => {
    const [leadingImageURL, setLeadingImageURL] = useState('');
    const [endImageURL, setEndImageURL] = useState('');
    const store = useStore();
    const isMobile = store.getState().app.isMobile;

    useEffect(() => {
        if(leadingImage === 'N/A')
            setLeadingImageURL(NoPoster);
        else {
            leadingImage && fetch(leadingImage).then(res => res.blob()).then(img => {
                setLeadingImageURL(URL.createObjectURL(img));
            }).catch(err => console.log(err));
        }
        if(endImage === 'N/A')
            setEndImageURL(NoPoster);
        else {
            endImage && fetch(endImage).then(res => res.blob()).then(img => {
                setEndImageURL(URL.createObjectURL(img));
            }).catch(err => console.log(err));
        }

    }, [leadingImage, endImage]);

    return (
        <motion.li animate={itemVariants.open} initial={itemVariants.close} className="list__list-item" variants={itemVariants}>
            <div className="listItem">
                {leadingImage && <div className="listItem__leadimg">
                    <img src={leadingImageURL} alt="" className="listItem__leadimg__img"/>
                </div>}
                <div className="listItem__text">
                    <h1 style={{fontSize: isMobile ? 'large': 'x-large'}}>{title}</h1>
                    <h3>{subTitle}</h3>
                </div>
                {endImage && <div className="listItem__endimg">
                    <img src={endImageURL} alt="" className="listItem__leadimg__img"/>
                </div>}
            </div>
        </motion.li>
    )
}

export default ListItem;