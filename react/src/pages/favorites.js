import React, {useEffect} from "react";

const Favorites = ()=>{
    useEffect(()=>{
        document.title = 'Favorites - Notedly'
    })
    return (
        <div>
            <h1>Notedly</h1>
            <p>My Favorites</p>
        </div>
    )
}

export default Favorites;