import React from "react";
import {
    str,
    axis,
    dataKey,
    inBounds,
    getSessionData, 
    updateSessionData,
    getElementReferences,
    getPercentFromPointer
} from '../js'

export default function Gutter ( state ) {
    const thisAxis  = axis[state.as]
    const hasRender = React.isValidElement(state.gutterRender)
    //---------------------------------------------------------------
    //  Use state for capturing initial values and indication
    //  element is being dragged/moved.
    //---------------------------------------------------------------
    const [gutter, setGutter] = React.useState({
        dragging: false,
        hover: false
    })
    //---------------------------------------------------------------
    //  Toggle state hover property
    //---------------------------------------------------------------
    const toggleHover = () => {
        setGutter({
            ...gutter,
            hover: !gutter.hover
        })
    }
    //---------------------------------------------------------------
    //  Capture pointer and save start position and primary size
    //---------------------------------------------------------------
    const onPointerDown = event => {
        if (!getSessionData(state).collapsed) {
            const elements  = getElementReferences(state)
            event.currentTarget.setPointerCapture(event.pointerId);
            if (state.collapseTransition)
                elements.target.style.removeProperty(str.transition)
            setGutter({
                ...gutter,
                dragging    : true,
                parentSize  : elements.parent.getBoundingClientRect()[thisAxis.client],
                leftTopSize : elements.target.getBoundingClientRect()[thisAxis.client],
                pointerStart: event[thisAxis.pointer]
            })
        }
    }    
    //---------------------------------------------------------------
    //  As pointer moves calculate new primary size and check
    //  if inBounds.
    //---------------------------------------------------------------
    const onPointerMove = event => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            const percent = getPercentFromPointer(
                event[thisAxis.pointer],
                gutter.leftTopSize,
                gutter.pointerStart,
                gutter.parentSize
            )
            inBounds(state, percent) 
                && getElementReferences(state).target.style.setProperty(
                thisAxis.client, percent+str.percent
            )
        }
      }
    //---------------------------------------------------------------
    //  Stop capturing pointer
    //---------------------------------------------------------------
    const onPointerUp = event => {
        const elements  = getElementReferences(state)
        event.currentTarget.releasePointerCapture(event.pointerId);
        if (state.collapseTransition)
            elements.target.style.setProperty(
                str.transition, str.animation
            )         
        updateSessionData(state,{
            LeftTopSize: getPercentFromPointer(
                event[thisAxis.pointer],
                gutter.leftTopSize,
                gutter.pointerStart,
                gutter.parentSize
            )+str.percent
        })
        setGutter({
            ...gutter,
            dragging: false
        })
    };
    //---------------------------------------------------------------
    //  Gutter Style
    //---------------------------------------------------------------
    const hoverStyle = () => {
        if (gutter.hover)
            return state.gutterHoverStyle
        return {}
    }

    const gutterStyle = {
        ...state.gutterStyle,
        ...hoverStyle(),
        ...{[thisAxis.client]: state.gutterSize}
    }
    //---------------------------------------------------------------
    //  Set final component state to be passed to gutter
    //  component. 
    //---------------------------------------------------------------
    const gutterProps = {
        style                 : gutterStyle,
        className             : state.className,
        onPointerDown         : onPointerDown,
        onPointerUp           : onPointerUp,
        onPointerMove         : onPointerMove,
        onMouseEnter          : toggleHover,
        onMouseLeave          : toggleHover,
        [dataKey.gutter]      : true,
        [dataKey.hover]       : gutter.hover,
        [dataKey.isDragging]  : gutter.dragging
    }
    //---------------------------------------------------------------
    //  Return passed component if one was specified
    //---------------------------------------------------------------
    if (hasRender)
        return (
             <div {...gutterProps}>
                 {state.gutterRender}
            </div>
        )
    //---------------------------------------------------------------
    //  Return default DIV element
    //---------------------------------------------------------------
    return (
        <div {...gutterProps}/>
    )
}