import React, {useState} from "react";
import "./Field.css";

const Field = () => {
    const [block, setBlock] = useState(new Array(100).fill({color: "white"}));
    const [currentColor, setCurrentColor] = useState("black");
    const [colorHistory, setColorHistory] = useState(["yellow"]);
    const changePixelColor = (ind) => {
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
    const saveToHistory = (color) => {
        setCurrentColor(color);
    };
    return (
        <>
            {/*{colorHistory.map((el,i) => <div  className='color-history' style={{background: el}}>.</div>)} */}
            <div className="colorhistory">
                {colorHistory.map((el, i) => (
                    <div
                        className="pixelHistory"
                        style={{background: el}}
                        onClick={() => saveToHistory(el)}
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
                        onClick={() => changePixelColor(i)}
                    >
                        {i}
                    </div>
                ))}
            </div>
        </>
    );
};
export default Field;
