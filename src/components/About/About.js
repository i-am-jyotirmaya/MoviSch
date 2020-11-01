import React from 'react';
import './About.scss';

const About = ({style, ...props}) => (
    <p style={style} {...props}>
        <span>
            Made with <span role="img" aria-label="love">&#129505;</span> and <span>passion</span>
        </span>
        <span>by</span>
        <span>
            <span>Jyotirmaya</span> <span>Sahu</span>
        </span>
    </p>
);

export default About;