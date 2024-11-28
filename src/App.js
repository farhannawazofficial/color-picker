import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [color, setColor] = useState("#3498db");
  const [format, setFormat] = useState("HEX");
  const [copied, setCopied] = useState(false);

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setCopied(false);
  };

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h, s, l;
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(
      l * 100
    )}%)`;
  };

  const getColorValue = () => {
    if (format === "RGB") return hexToRgb(color);
    if (format === "HSL") return hexToHsl(color);
    return color; // HEX
  };

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="color-input"
      />
      <div
        className="color-display"
        style={{ backgroundColor: color }}
      ></div>
      <div className="color-values">
        <div>
          <button onClick={() => setFormat("HEX")}>HEX</button>
          <button onClick={() => setFormat("RGB")}>RGB</button>
          <button onClick={() => setFormat("HSL")}>HSL</button>
        </div>
        <p>
          {getColorValue()}{" "}
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(getColorValue())}
          >
            Copy
          </button>
        </p>
        {copied && <p className="copied-message">Copied to clipboard!</p>}
      </div>
    </div>
  );
};

export default App;
