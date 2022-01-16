import React from 'react'

export default function Right ( props ) {

    const [primaryHidden, setPrimaryHidden] = React.useState(
        !props.splitProps.primaryInitialState
    )

    const primaryToggle = () => {
        props.splitProps.dispatch(
            primaryHidden ? "restore" : "hidePrimary"
        )
        setPrimaryHidden(!primaryHidden)
    }

    const btnProps = {
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        'data-button': true
    }

    return (
        <div data-overflow="auto">
            <div
                {...btnProps}
                onClick={primaryToggle}
            >
                <span>
                    {!primaryHidden ? "hide primary" : "restore"}
                </span>
            </div>
        </div>
    )

}