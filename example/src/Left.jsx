import React from 'react'

export default function Left ( props ) {

    const [expanded, setExpanded] = React.useState(
        !props.splitProps.collapsedInitialState
    )

    const [secondaryHidden, setSecondaryHidden] = React.useState(
        !props.splitProps.secondaryInitialState
    )

    const collapseToggle = () => {
        props.splitProps.dispatch(
            expanded ? "collapse" : "restore"
        )
        setExpanded(!expanded)
    }

    const secondaryToggle = () => {
        props.splitProps.dispatch(
            secondaryHidden ? "restore" : "hideSecondary"
        )
        setSecondaryHidden(!secondaryHidden)
    }

    return (
        <div data-overflow="auto">
            <div 
                data-button={true}
                onClick={collapseToggle}
            >
                <span>
                    {expanded ? "collapse" : ">"}
                </span>
            </div>
            { expanded && (
            <div 
                data-button={true}
                onClick={secondaryToggle}
            >
                <span>
                    {!secondaryHidden ? "hide secondary" : "restore"}
                </span>
            </div>
            )}   
        </div>
    )

}