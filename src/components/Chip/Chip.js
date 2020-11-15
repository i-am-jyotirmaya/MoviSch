import React from 'react';

const Chip = ({text}) => (
    <div style={{
        padding: '.5em 1em', 
        backgroundColor: 'rgba(0,0,0,.25)', 
        borderRadius: '100vmax', 
        color: 'whitesmoke',
        display: 'inline-block',
        fontSize: '.8em',
        fontWeight: 300,
        marginTop: '.3em',
        marginRight: '.3em'
        }}>
        {text}
    </div>
)

export default Chip;