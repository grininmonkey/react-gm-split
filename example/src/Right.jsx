import React from 'react'
import Lorem from './Lorem'
import Split from 'react-gm-split'
import styles from './App.module.css'

export default function Right ( props ) {

    const parentSplit = props.splitProps

    const [lorem, setLorem] = React.useState(false)

    const [leftHidden, setLeftHidden] = React.useState(
        parentSplit && parentSplit.isLeftTopHidden()
    )

    const leftToggle = () => {
        parentSplit && parentSplit.dispatch(
            leftHidden ? parentSplit.action.restore : parentSplit.action.hideLeftTop
        ) && setLeftHidden(
            !leftHidden
        )
    }

    /*
        Example of using state to manipulate children of Split.
        The effect of this approach will be the split (2) child
        will always be hidden when this parent is re-rendered
        because it's a child of another parent which is added
        or removed to the render tree.... in short, initial state
        assigned using useState is evaluated each time.
    */

    return (
        <Split
            id="lorem45bc"
            as="horizontal"
            passProps={true}
            gutterSize="10px"
            leftTopMinSize={5}
            leftTopMaxSize={95}
            gutterHoverStyle={{
                opacity: ".6",
                backgroundColor: "var(--gutter-hover-color)",
                transition: "all 0.4s ease-in"
            }}
        >
            <div 
                className={styles.content}
                data-border-left={!leftHidden}
                data-border-bottom={lorem}
            >
                <div className={styles.container}>
                    <div
                        data-button
                        onClick={leftToggle}
                    >
                        {leftHidden ? "Restore" : "Hide Left Pane"}
                    </div>
                    <div
                        data-button
                        onClick={()=>setLorem(!lorem)}
                    >
                        {lorem ? "Hide" : "Show"} Some Long Text
                    </div>
                    <span className={styles.someSpan}>HeaderClicks: {props.ExampleCounter}</span><br/>
                </div>
            </div>
            {lorem && <Lorem/>}
        </Split>
    )

}
