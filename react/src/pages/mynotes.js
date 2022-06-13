import React, {useEffect} from "react";

const MyNotes = ()=>{
    useEffect(()=>{
        document.title = 'My Notes - Notedly'
    })
    return (
        <div>
            <h1>Notedly</h1>
            <p>My Notes</p>
        </div>
    )
}

export default MyNotes;