import React, {useState} from "react";

import "./Field.css";
import Brush from "./Brush";

const Field = () => {
    const [block, setBlock] = useState(new Array(100).fill({color: "white"}));
    const [currentColor, setCurrentColor] = useState("black");
    const [colorHistory, setColorHistory] = useState([]);

    const saveToHistory = (ind) => {
        if (!colorHistory.includes(currentColor)) {
            setColorHistory([...colorHistory, currentColor]);
        }
        console.log(colorHistory);
        setBlock(
            [...block].map((el, i) =>
                i === ind ? {...el, color: currentColor} : el
            )
        );
    };
    const changeColor = (e) => {
        setCurrentColor(e);
    };
    const changePixelColor = (color) => {
        setCurrentColor(color);
    };
    return (
        <>
            <Brush/>
            {/*{colorHistory.map((el,i) => <div  className='color-history' style={{background: el}}>.</div>)} */}
            <div className="colorhistory">
                {colorHistory.map((el, i) => (
                    <div
                        className="pixelHistory"
                        style={{background: el}}
                        onClick={() => changePixelColor(el)}
                    >
                        {" "}
                    </div>
                ))}
            </div>
            <input
                type="color"
                value={currentColor}
                onChange={(e) => changeColor(e.target.value)}
            />

            <div className="grid">
                {block.map((el, i) => (
                    <div
                        className="pixel"
                        style={{background: el.color}}
                        onClick={() => saveToHistory(i)}
                    >
                        {i}
                    </div>
                ))}
            </div>
        </>
    );
};
export default Field;
