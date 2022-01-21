import React from "react"
import styles from './App.module.css'

export default function Content (props) {

    return (
        <div className={styles.exampleContent}>
            <div>Some None Split Content...</div>
            <div
                data-button
                onClick={()=>props.back()}
            >
                Back
            </div>
        </div>
    )

}