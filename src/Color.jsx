import '../src/Styles/Main-Home.css';
// import PropTypes from 'prop-types';
import React from 'react';


function ColorPicker(color, handle) {   
  
 const ColorStyle = color.choose ? "color-square-border" : undefined;
    
             return (
                 <li
                     className= {`color-square ${ColorStyle} `}
                     id= {color.hex}
                     onClick = {(e) => handle (e, color)}
                     style= {{backgroundColor: color.hex}}
                 />
             );
        
     }

     export default ColorPicker;

    //  ColorPicker.PropTypes = {
         
    //  }
