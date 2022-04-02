import React from "react"
import Gutter from "./components/Gutter"
import styles from "./css/split.module.css"
import {
    str,
    actions, 
    dataProps,
    renderMode, 
    splitAction, 
    initialState,
    propsChanged,
    childrenCount,
    getSessionData, 
    containerStyle,
    childPassProps,
    splitPropTypes,
    childrenObjects, 
    initialDataProps, 
    splitContainerClass,
} from './js'

const Split = ( props ) => {
    //---------------------------------------------------------------
    //  Set state object with initial values from passed props
    //---------------------------------------------------------------
    const [state, setState] = React.useState(initialState(props))
    //---------------------------------------------------------------
    //  Set props object to be passed to children
    //  adding a couple helper functions/objects.
    //---------------------------------------------------------------
    const splitProps = {
        splitProps: {
            ...state,
            action: actions,
            dispatch: action => action && splitAction(state, action),
            isCollapsed: () => getSessionData(state)[str.collapsed]
                ?? state.initialCollapsedState,
            getSessionData: () => getSessionData(state),
            isLeftTopHidden: () => !getSessionData(state)[str.leftTop+str.state]
                ?? !state.initialLeftTopState,
            isRightBottomHidden: () => !getSessionData(state)[str.rightBottom+str.state]
                ?? !state.initialRightBottomState,
            getParentClientRect: () => getBoundingClientRect(state)
        }
    }
    //---------------------------------------------------------------
    //  props based.. Child Count & Can Split?
    //---------------------------------------------------------------
    const childCount    = childrenCount(props.children)
    const changedProps  = propsChanged(state, props)
    const renderType    = renderMode(state,props.children)
    const canSplit      = props.children && (
        childCount === 2 || (
             renderType === 1 && childCount === 3
        )
    )
    //---------------------------------------------------------------
    //  If child count or limited props has changed,
    //  update state / trigger re-render.
    //---------------------------------------------------------------
    if (Object.keys(changedProps).length > 0) {
        setState({
            ...state,
            ...changedProps,
            childCount
        })
    } else {
       childCount !== state.childCount
           && setState({
               ...state,
               childCount
           })
    }
    //---------------------------------------------------------------
    //  Get valid React Elements from Children and render
    //---------------------------------------------------------------
    const element = childrenObjects(props.children)
    return (
        <div
            ref={state.parentRef}
            className={styles[splitContainerClass(state,true)]}
            {...initialDataProps(state)}
            data-collapsed={getSessionData(state).collapsed}
            {...dataProps(props)}
        >
            {renderType === 1 && (
            <div data-header-container>
                <div 
                    className={styles.headerContainer}
                    data-header-content-container
                >
                    {React.cloneElement(
                        element[0],
                        childPassProps(state,element[0],splitProps)
                    )}
                </div>
            </div>
            )}
            {canSplit && state.render ? (
            <div
                className={styles[splitContainerClass(state)]}
                data-split-container
            >
                <div
                    ref={state.sizerRef}
                    style={containerStyle(state,true)}
                    className={styles.leftTop}
                    data-content-container
                    data-left-top
                >
                    {React.cloneElement(
                        element[0 + renderType],
                        childPassProps(state,element[0 + renderType],splitProps)
                    )}
                </div>
                <div 
                    className={styles.rightBottom} 
                    data-right-bottom
                    data-gutter-overlay={state.gutterOverlay}
                >
                    <Gutter 
                        className={styles.gutter} 
                        data-gutter {...state} 
                    />
                    <div 
                        style={containerStyle(state)}
                        data-content-container
                    >
                        {React.cloneElement(
                            element[1 + renderType],
                            childPassProps(state,element[1 + renderType],splitProps)
                        )}
                    </div>
                </div>
            </div>
            ) : (
            <div data-content-container>
                <div 
                    data-non-split-content
                    style={{height:"inherit",width:"inherit"}}
                >
                    {props.children}
                </div>
            </div>
            )}
      </div>
    )

}

Split.propTypes = splitPropTypes

export default Split
