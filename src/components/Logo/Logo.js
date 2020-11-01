import React from 'react';
import { motion } from 'framer-motion';
import './Logo.scss';

const logo = {
    'focus': {
        translateX: 0
    },
    'blur': {
        translateX: -500
    }
}

const Logo = ({isMobile, style}) => {

    return <motion.div className={['logo', isMobile ? 'mob' : ''].join(' ')} 
                variants={logo}
                animate={style}
                transition={{duration: 1, type: 'spring'}}
            >MoviSch</motion.div>
    // return (isMobile ? <div className="logo mob" {...props}>MoviSch</div> : <div className="logo" {...props}>MoviSch</div>)
}

export default Logo;