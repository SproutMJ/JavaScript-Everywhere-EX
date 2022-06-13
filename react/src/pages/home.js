import React from "react";
import {Link} from "react-router-dom";

import Header from "../components/Header";
import Navigation from "../../final/components/Navigation";

const Home = ()=>{
    return (
        <div>
            <Header/>
            <Navigation/>
            <p>Home</p>
        </div>
    )
}

export default Home;