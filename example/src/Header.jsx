import React from "react"
import styles from './App.module.css'

export default function Header ({counter, setCounter,setExampleNumber}) {

    return (
        <div className={styles.header}>
            <div onClick={()=>setCounter(counter + 1)}>
                <span>Header</span>
            </div>
            <div>
                <span 
                    data-button={true}
                    onClick={()=>setExampleNumber(1)}
                >
                    Menu 1
                </span>                
                <span 
                    data-button={true}
                    onClick={()=>setExampleNumber(2)}
                >
                    Menu 2
                </span>
                <span 
                    data-button={true}
                    onClick={()=>setExampleNumber(3)}
                >
                    Content
                </span>                
            </div>
        </div>
    )
}