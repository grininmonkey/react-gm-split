import React from 'react'
import styles from './App.module.css'


export default function Left ( props ) {

    const split = props.splitProps

    const [collapsed, setCollapsed] = React.useState(
        split && split.isCollapsed()
    )

    const [rightBottomHidden, setRightBottomHidden] = React.useState(
        split && split.isRightBottomHidden()
    )

    const collapseToggle = () => {
        split.dispatch(
            !collapsed ? split.action.collapse : split.action.restore
        ) && setCollapsed(
            !collapsed
        )
    }

    const secondaryToggle = () => {
        props.splitProps.dispatch(
            rightBottomHidden ? split.action.restore : split.action.hideRightBottom
        ) && setRightBottomHidden(
            !rightBottomHidden
        )
    }

    return (
        <div className={styles.content}>
            <div className={styles.menuContainer}>
                {!rightBottomHidden && (
                <div 
                    data-button={true}
                    data-bottom-margin={true}
                    onClick={collapseToggle}
                >
                    {collapsed ? ">" : "Collapse"}
                </div>
                )}
                {!collapsed && (          
                <div 
                    data-button={true}
                    onClick={secondaryToggle}
                >
                    {!rightBottomHidden ? "Hide Right" : "Restore"}
                </div>
                )}
            </div>
        </div>
    )

}