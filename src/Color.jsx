import '../src/Styles/Main-Home.css';
import PropTypes from 'prop-types';
import React from 'react';



function ColorPicker({color, handleColor}) {  
   
  
 const ColorStyle = color.choose ? "color-square-border" : undefined;
    
             return (
                 <li
                     className= {`color-square ${ColorStyle} `}
                     id= {color.hex}
                     onClick = {(e) => handleColor(e, color)}
                     style= {{backgroundColor: color.hex}}
                                          
                 />
             );
        
     }

     export default ColorPicker;

     // Se agregan PropTypes para asegurar el paso de la información en el formato deseado https://www.npmjs.com/package/prop-types
     ColorPicker.propTypes = {
         color: PropTypes.shape({
            name: PropTypes.string,
            choose: PropTypes.bool.isRequired,
            hex: PropTypes.string.isRequired
          })
         
     };
