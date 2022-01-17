import React from 'react'
import Lorem from './Lorem'
import Split from 'react-gm-split'

export default function Right ( props ) {

    const [lorem, setLorem] = React.useState(false)
    const [primaryHidden, setPrimaryHidden] = React.useState(
        props.splitProps && props.splitProps.isPrimaryHidden()
    )
    
    const primaryToggle = () => {
        props.splitProps && props.splitProps.dispatch(
            primaryHidden ? "restore" : "hidePrimary"
        ) && setPrimaryHidden(
            !primaryHidden
        )
    }

    return (
        <Split
            id="lorem45bc"
            as="rows"
            passProps={true}
            gutterSize="7px"
            data-border-left={!primaryHidden}
        >
            <div data-overflow="auto" data-content data-lots-padding data-border-bottom={lorem}>
                <span
                    data-button
                    data-bottom-margin
                    onClick={primaryToggle}
                >
                    {!primaryHidden ? "hide primary" : "restore"}
                </span>
                <span
                    data-button
                    data-bottom-margin
                    onClick={()=>setLorem(!lorem)}
                >
                    {lorem ? "Hide" : "Show"} Something someone said in 45BC
                </span>
                <span>HeaderClicks: {props.ExampleCounter}</span><br/>
            </div>
            {lorem && <Lorem/>}
        </Split>
    )

}
