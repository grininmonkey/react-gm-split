import React from "react"
import { axis, str, dataKey, splitPropTypes } from "./config"
import { getSessionData } from "./session"
//---------------------------------------------------------------
//  Older Browser friendly Nullish (??)
//---------------------------------------------------------------
const nullishThenThis = (obj1, obj2) => {
    return typeof obj1 !== str.undefined
        ? obj1 : obj2
}
//---------------------------------------------------------------
//  When no id is passed, use a somewhat/verylikely unique id
//  for use with session data. Likelyhood of looping 20+
//  Splits is low and should avoid a Birthday.
//  Modify this more in the future?
//---------------------------------------------------------------
const generalId = () => Date.now() + Array.from(
    {length: 2}, () => '-' + Math.floor(Math.random() * 10000)
).join('')
//---------------------------------------------------------------
//  Get value as style string, eg '25%' or '15px'
//---------------------------------------------------------------
const parseIntTo = (value, to) => parseInt(value) + to
//---------------------------------------------------------------
//  Get split container class key for styles module
//---------------------------------------------------------------
const splitContainerClass = (state, root) => hasHeader(state)
    ? root ? str.withHeader : state.as + str.WithHeader
    : state.as
//---------------------------------------------------------------
//  Children array helper, objects that are valid React
//  elements, using filter with fallback for IE
//---------------------------------------------------------------
const childrenObjects = (children) => { 
    if ([].filter)
        return children.filter(obj => React.isValidElement(obj))
    //IE safe
    let result = []
    for (let i = 0; i <= children.length; i++) 
        if (React.isValidElement(children[i]))
            result.push(children[i])
    return result
}
//---------------------------------------------------------------
//  Children array helper, number of objects vs length
//---------------------------------------------------------------
const childrenCount = (children) => childrenObjects(children).length
//---------------------------------------------------------------
//  Child helper, pass split props object if child is
//  a function
//---------------------------------------------------------------
const childPassProps = (state, element, object) => state.passProps 
    && typeof element.type === str.function 
        ? object : null
//---------------------------------------------------------------
//  Is first child a header based on passed value
//---------------------------------------------------------------
const hasHeader = (state) => state.firstChildIsHeader
//---------------------------------------------------------------
//  Is first child a header and child count = 3
//---------------------------------------------------------------
const renderMode = (state,children) => state.firstChildIsHeader && childrenCount(children) === 3
    ? 1 : 0
//---------------------------------------------------------------
//  Get an object with keys as properties and key test regex
//  or return key as value. 
//---------------------------------------------------------------
const objectTestKey = (object, test) => {
    let result  = {}
    let regex   = test ? new RegExp(test) : null
    Object.keys(object).forEach(key => {
        if (test) {
            if (regex.test(key))
                result[key] = object[key]
        } else {
            result[key] = key
        }
    })
    return result
}
//---------------------------------------------------------------
//  Object helper, return object with key:value where key
//  matches the pattern "data", eg  data-is-something
//---------------------------------------------------------------
const dataProps = (props) => objectTestKey(props,'data')
//---------------------------------------------------------------
//  Get an object with keys as properties and key as value str
//---------------------------------------------------------------
const keysObject = (object) => objectTestKey(object) 
//---------------------------------------------------------------
//  Test if percent if < Min or > Max from props/state
//---------------------------------------------------------------
/*
const inBounds = (state, percent) => ![
    percent < parseInt(state.leftTopMinSize) || false,
    percent > parseInt(state.leftTopMaxSize) || false,
].includes(true)
*/
// IE safe version
const  inBounds = (state, percent) => {
    if (percent < parseInt(state.leftTopMinSize))
        return false
    if (percent > parseInt(state.leftTopMaxSize))
        return false
    return true
}
//---------------------------------------------------------------
//  Gutter helper for calculating new percent size
//---------------------------------------------------------------
const getPercentFromPointer = (position, originalSize, pointerStart, totalSize) => {
    const size      = originalSize + (position - pointerStart);
    const newSize   = Math.max(0, Math.min(size, totalSize));
    return (newSize / totalSize) * 100
}
//---------------------------------------------------------------
//  For Gutter, get parent and target (LeftTop Container) refs
//---------------------------------------------------------------
const getElementReferences = (state) => {
    if (state.parentRef.current.children[0].hasAttribute(dataKey.headerContainer)) {
        return {
            parent: state.parentRef.current.children[1],
            target: state.sizerRef.current
            // target: state.parentRef.current.children[1].children[0] 
        }
    } else {
        return {
            parent: state.parentRef.current,
            target: state.sizerRef.current
            // target: state.parentRef.current.children[0].children[0]
        }
    }
}
//---------------------------------------------------------------
//  LeftTop initial Size, set from session or 
//  initial properties. Hidden take priority, and LeftTop hidden
//  overrides RightBottom, else if collapsed, else session last
//  sized or initial size property
//---------------------------------------------------------------
const initialStateSize = (state) => {
    const session   = getSessionData(state)
    const states    = [
        !nullishThenThis(
            session[str.leftTop+str.state],
            state.initialLeftTopState 
        ),
        !nullishThenThis(
            session[str.rightBottom+str.state],
            state.initialRightBottomState
        ),
        nullishThenThis(
            session[str.collapsed],
            state.initialCollapsedState 
        )
    ]
    if ( states[0] || states[1] )
        return states[0] 
            ? 0+str.percent : 100+str.percent
    if (states[2])
        return state.collapsedSize
    return nullishThenThis(
        session[str.leftTop+str.size],
        state.initialLeftTopSize
    )
}
//---------------------------------------------------------------
//  LeftTop or RightBottom container inline style  
//---------------------------------------------------------------
const containerStyle = (state, leftTop) => {
    const session = getSessionData(state)
    const client = axis[state.as].client 
    let style = {}
    if (leftTop){
        style[client] = initialStateSize(state)
        if (state.collapseTransition)
            style[str.transition] = str.animation
        if (state.leftTopBackground)
            style.background = state.leftTopBackground
    } else {
        style.background = state.rightBottomBackground
    }
    return style
}
//---------------------------------------------------------------
// Return initial data- attributes
//---------------------------------------------------------------
const initialDataProps = (state) => {
    const session = getSessionData(state)
    return {
        [dataKey.collapsed]: session.collapsed,
        [dataKey.collapse]: !session[str.leftTop+str.state]
            ? str.leftTop 
            : !session[str.rightBottom+str.state]
                ? str.rightBottom : null
    }
}
//---------------------------------------------------------------
//  getBoundingClientRect helper
//---------------------------------------------------------------
const getBoundingClientRect = (state) => state.parentRef.current.getBoundingClientRect()
//---------------------------------------------------------------
//  Sanitize Props
//---------------------------------------------------------------
const sanitizedProps = (state, props, {...defaults},usePropsKeys) => {
    const keys = usePropsKeys 
        ? keysObject(props) 
        : keysObject(splitPropTypes)
    const sessionProps  = getSessionData(state)
    Object.keys(keys).forEach(key => {
        const sessionKey = key === keys.initialCollapsedState
            ? str.collapsed : key.replace(str.initial,'')
        if (sessionProps.hasOwnProperty(sessionKey)) {
            defaults[key] = sessionProps[sessionKey]
        } else {
            let value = nullishThenThis(props[key],defaults[key]) 
                if(key === keys.as)
                    value = axis[props[key]] 
                        ? props[key] : str.vertical
                if (
                        key === keys.gutterSize 
                    ||  key === keys.collapsedSize 
                )
                    value = parseIntTo(value, str.pixel)
                if (
                        key === keys.leftTopMinSize
                    ||  key === keys.leftTopMaxSize
                    ||  key === keys.initialLeftTopSize
                )
                    value = parseIntTo(value, str.percent)
            defaults[key] = value
        }
    })
    return defaults    
}
//---------------------------------------------------------------
//  Check for updated props (state change) for the ones
//  we can easly work with. comparing style and object
//  props may come later?
//---------------------------------------------------------------
const propsChanged = (state, props) => {
    let changed = {}
    const keys  = keysObject(splitPropTypes)
    Object.keys(keys).forEach(key => {
        if (
                !/initial/.test(key) 
            &&  typeof props[key] !== str.undefined
            &&  typeof props[key] !== str.object
        ) {
            if (/Size/.test(key)) {
                if(parseInt(state[key]) !== parseInt(props[key]))
                    changed[key] = props[key]
            } else {
                if (props[key] !== state[key])
                    changed[key] = props[key]
            }
        }
    })
    return sanitizedProps(state,changed,{},true)
}
//---------------------------------------------------------------
//  Export
//---------------------------------------------------------------
export {
    inBounds,
    generalId,
    dataProps,
    hasHeader,
    keysObject,
    renderMode,
    parseIntTo,
    propsChanged,
    childrenCount,
    containerStyle,
    childPassProps,
    sanitizedProps,
    nullishThenThis,
    childrenObjects,
    initialDataProps,
    splitContainerClass,
    getElementReferences,
    getPercentFromPointer,
    getBoundingClientRect
}

