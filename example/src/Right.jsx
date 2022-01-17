import React from 'react'
import Lorem from './Lorem'
import Split from 'react-gm-split'

export default function Right ( props ) {

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
        >
            <div data-overflow="auto">
                <div
                    data-button
                    onClick={primaryToggle}
                >
                    <span>
                        {!primaryHidden ? "hide primary" : "restore"}
                    </span>
                </div>
                <span>HeaderClicks: {props.testCounter}</span>
            </div>
            <Lorem/>
        </Split>
    )

}

/*

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


*/