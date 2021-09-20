import React from 'react';
import './Card.css'

const Card = ({img, rotation})=>{
    let styles={
        transform: [{rotate:`${rotation}deg`}]  
    }
    //these styles need !important to work. That is not supported by jsx. I searched everywhere and found no solution.
    
    return(
        <img className='card'style={styles} alt='playing card'src={img}></img>
    )

}

export default Card