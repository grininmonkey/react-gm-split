import React from 'react'

export default function Right ( props ) {

    const [primaryHidden, setPrimaryHidden] = React.useState(
        props.splitProps && props.splitProps.isPrimaryHidden()
    )

    const primaryToggle = () => {
        props.splitProps.dispatch(
            primaryHidden ? "restore" : "hidePrimary"
        ) && setPrimaryHidden(
            !primaryHidden
        )
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
            <span>HeaderClicks: {props.testCounter}</span>
        </div>
    )

}