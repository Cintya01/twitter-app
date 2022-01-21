import '../src/Styles/Main-Home.css'
import React, {useContext} from 'react';
import { AppFirebaseContext } from "./Context/AppContext";
import {colorList} from "./colorList";

function ColorPicker() {
    const {setColorList} = useContext(AppFirebaseContext);
    const colorOption = (color) => {
             return (
                 <div
                     onClick={() => setColorList(color)}
                     key= {color.hex}
                     className= "color"
                     style= {{backgroundColor: color.hex}}
                 />
             );
         };

         const colorOptions = () => {
             return colorList.map((color) => {
                 return colorOption(color);
             });
         };
         return <div>{colorOptions()}</div>;
     }

     export default ColorPicker;
