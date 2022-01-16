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

    return (
        <div data-overflow="auto">
            <div
                data-button={true}
                onClick={primaryToggle}
            >
                <span>
                    {!primaryHidden ? "hide primary" : "restore"}
                </span>
            </div>
        </div>
    )

}