// index.js
// This is the main entry point of our application
import React from "react";
import ReactDOM from "react-dom";

const App = ()=>{
    return (
        <div>
            <h1>Hello Notedly</h1>
            <p>환영합니다.</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));