import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let root = document.createElement("div");
root.id = 'root';

// Fill the whole page
root.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.height = '100%';
// Normalize.css changes line height to 1.15 on the html tag, this causes spacing issues
document.documentElement.style.lineHeight = 'initial';

document.body.prepend(root);
ReactDOM.render(<App/>, root);
