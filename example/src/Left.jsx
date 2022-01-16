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

    const btnProps = {
        style: {
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            justifyContent: "center",
        },
        'data-button': true
    }

    return (
        <div data-overflow="auto">
            <div 
                {...btnProps}
                onClick={collapseToggle}
            >
                <span>
                    {expanded ? "collapse" : ">"}
                </span>
            </div>
            { expanded && (
            <div 
                {...btnProps}
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