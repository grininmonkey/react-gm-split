import React from "react"
import PropTypes from "prop-types"

/*****************************************************************************************

    General Stuff

******************************************************************************************/
const axis = {
    vertical: {
        offset  : "offsetWidth",
        client  : "width",
        cursor  : "col-resize",
        pointer : "clientX",
        template: "Columns"
    },
    horizontal: {
        offset  : "offsetHeight",
        client  : "height",
        cursor  : "row-resize",
        pointer : "clientY",
        template: "Rows"
    }
}

const stdStyles = {
    parent: {
        width   : "100%",
        height  : "100%",
        display : "grid",
        overflow: "hidden"
    },
    gutter: {
        display         : "flex",
        overflow        : "hidden",
        alignItems      : "center",
        userSelect      : "none",
        justifyContent  : "center"
    }
}

const str = {
    rows         : "rows",
    space        : " ",
    string       : "string",
    object       : "object",
    hidden       : "hidden",
    columns      : "columns",
    primary      : "Primary",
    gridUnit     : "fr",
    gridAuto     : "1fr",
    gridNone     : "0px",
    function     : "function",
    vertical     : "vertical",
    collapsed    : "collapsed",
    secondary    : "Secondary",
    horizontal   : "horizontal",
    gutterSize   : "5px",
    primarySize  : "50%",
    collapsedSize: "50px",
    gridTemplate : "gridTemplate"
}
//---------------------------------------------------------------
//  When no id is passed, use a somewhat/verylikely unique id
//  for use with session data. Likelyhood of looping 20+
//  Splits is low and should avoid a Birthday.
//  Modify this otherwise.
//---------------------------------------------------------------
const generalId = () => Date.now() + Array.from(
    {length: 2}, () => '-' + Math.floor(Math.random() * 10000)
).join('')
//---------------------------------------------------------------
//  Children array helper, number of objects vs length
//---------------------------------------------------------------
const childrenObjects = (children) => children.filter(obj => React.isValidElement(obj))
//---------------------------------------------------------------
//  Children array helper, number of objects vs length
//---------------------------------------------------------------
const childrenCount = (children) => childrenObjects(children).length
//---------------------------------------------------------------
//  Child  helper, pass split props object if child is
//  a function
//---------------------------------------------------------------
const childPassProps = (state, element, object) => state.passProps 
    && typeof element.type === str.function 
        ? object : null
//---------------------------------------------------------------
//  getBoundingClientRect helper
//---------------------------------------------------------------
const getBoundingClientRect = (state) => state.parentRef.current.getBoundingClientRect()
/*****************************************************************************************

    sessionData

******************************************************************************************/
const sessionDataKey = state => state.id + '-split'

const getSessionData = state => JSON.parse(
    sessionStorage.getItem(sessionDataKey(state)) || "{}"
)

const updateSessionData = (state, object, skipTemplate) => {
    //---------------------------------------------------------------
    //  Get current gridTemplateStyle property from parent
    //---------------------------------------------------------------
    const template = state.parentRef.current.style[
        gridTemplateStyleKey(state)
    ]
    //---------------------------------------------------------------
    //  If not skipTemplate, merge current template when
    //  collapsed or one of children are not hidden.
    //---------------------------------------------------------------
    if (!skipTemplate && !template.split(' ').includes(str.gridNone))
        object = {
            ...object,
            gridTemplateStyle: template
        }
    //---------------------------------------------------------------
    //  Save object (w/wo merged template)
    //---------------------------------------------------------------
    sessionStorage.setItem(
        sessionDataKey(state),JSON.stringify(
            {
                ...getSessionData(state),
                ...object
            }
        )
    )
}
/******************************************************************************************
  gridTemplate[Columns/Rows]
******************************************************************************************/
const gridTemplateIsRows = s => typeof s === str.string
    && s.toLowerCase() === str.rows

const gridTemplateStyleKey = state => state
    && str.gridTemplate + axis[state.orientation].template

const gridTemplateStyleObject = (state, array) => {
    return {
        [gridTemplateStyleKey(state)]: array.join(str.space)
    }
}

const gridTemplateStyle = (state, primary, gutter, hideChild) => {

    const primaryStyleIndex = state.primaryIndex === 1 ? 2 : 0
    //---------------------------------------------------------------
    //  Set the gridTemplate style property hiding gutter and
    //  target child by setting each to 0px and the non target
    //  to full.
    //---------------------------------------------------------------
    if ( hideChild ) {
        const hideIndex = hideChild === str.secondary
            ? primaryStyleIndex === 0 ? 2 : 0
            : primaryStyleIndex === 0 ? 0 : 2
        //-----------------------------------------------------------
        //  Return result as gridTemplate<Rows|Columns> property 
        //  string.
        //-----------------------------------------------------------
        return gridTemplateStyleObject(state,
            [
                hideIndex === 0 ? str.gridNone : str.gridAuto,
                str.gridNone,
                hideIndex === 2 ? str.gridNone : str.gridAuto
            ]
        )
    }
    //---------------------------------------------------------------
    //  Calculate size (percentage) of secondary child based on
    //  primary's percentage
    //---------------------------------------------------------------
    const secondary = primary.toLowerCase().includes(str.gridUnit)
        ? (1 - parseFloat(primary)) + str.gridUnit : str.gridAuto
    //---------------------------------------------------------------
    //  Return result as gridTemplate<Rows|Columns> property 
    //  string.
    //---------------------------------------------------------------
    return gridTemplateStyleObject(state,
        [
            primaryStyleIndex === 0 ? primary : secondary,
            gutter || state.gutterSize,
            primaryStyleIndex === 2 ? primary : secondary
        ]
    )

}

const gridTemplateStyleFromSession = state => {
    
    const session = getSessionData(state)
    
    if (session.hiddenPrimary || session.hiddenSecondary)
        return gridTemplateStyle(
            state, null, null,
            session.hiddenPrimary ? str.primary : str.secondary 
        )
    if (session.collapsed)
        return gridTemplateStyle(
            state,
            state.collapsedSize,
            str.gridNone
        )
    return {
        [gridTemplateStyleKey(state)]: session.gridTemplateStyle
    }
}

const gridTemplateUpdate = (state, newPrimary, newGridTemplateStyle, gutter) => {

    const styleKey = gridTemplateStyleKey(state)
    //---------------------------------------------------------------
    //  Get updated gridTemplateStyle or use the one passed.
    //---------------------------------------------------------------
    if (newPrimary) {
        state.gridTemplateStyle = gridTemplateStyle(
            state,
            newPrimary,
            gutter
        )[styleKey]
    } else if (newGridTemplateStyle) {
        state.gridTemplateStyle = newGridTemplateStyle
    }
    //---------------------------------------------------------------
    //  Update the DOM element style property
    //---------------------------------------------------------------
    state.parentRef.current.style[styleKey] = state.gridTemplateStyle

}
/*****************************************************************************************

    Actions

******************************************************************************************/
//---------------------------------------------------------------
//  Set SessionData and then update gridTemplate with 
//  collapsedSize as new primary size and gutterSize as none
//---------------------------------------------------------------
const actionCollapse = (state) => {

    if (!getSessionData(state).collapsed) {
        updateSessionData(
            state, {
                collapsed: true
            }
        )
        gridTemplateUpdate(
            state, state.collapsedSize, null, str.gridNone
        )
    }

    return true
}
//---------------------------------------------------------------
//  Set SessionData and then update gridTemplate with
//  0 sized target and gutter sections
//---------------------------------------------------------------
const actionHide = (state, child) => {

    if (!getSessionData(state)[str.hidden+child]) {
        updateSessionData(
            state, {
                [str.hidden+child]: true
            }
        )
        gridTemplateUpdate(
            state, null, gridTemplateStyle(state,
                null, null, child
            )[gridTemplateStyleKey(state)]
        )
    }

    return true
}
//---------------------------------------------------------------
//  Update gridTemplate with stored session of last snapshot
//  when all sections have values or restore as collapsed
//  if primary was hidden after a collapse state.
//---------------------------------------------------------------
const actionRestore = (state) => {

    const session = getSessionData(state)
    const restore = {
        collapsed: false,
        gridTemplateStyle: session.gridTemplateStyle
    }

    if (
            session.collapsed
        ||  session.hiddenPrimary
        ||  session.hiddenSecondary
    ) {

        if (
                session.collapsed 
            &&  session.hiddenPrimary
        ) {
            restore.collapsed = true
            restore.gridTemplateStyle = gridTemplateStyle(
                state,
                state.collapsedSize,
                str.gridNone
            )[gridTemplateStyleKey(state)]
        }
        gridTemplateUpdate(
            state, null,
            restore.gridTemplateStyle
        )
        updateSessionData(
            state, {
                collapsed: restore.collapsed,
                hiddenPrimary: false,
                hiddenSecondary: false
            }
        )
    }

    return true
}
//---------------------------------------------------------------
//  Route action to corresponding method.
//---------------------------------------------------------------
const splitAction = (state, action) => {
    switch (action) {
        case "collapse":
            return actionCollapse(state);
        case "restore":
            return actionRestore(state);
        case "hidePrimary":
            return actionHide(state, str.primary)
        case "hideSecondary":
            return actionHide(state, str.secondary)
        default:
            return false;
    }
}
/*****************************************************************************************

    Initial Render set first gridTemplate style

******************************************************************************************/
const setToRender = (state, setState) => {
    //---------------------------------------------------------------------
    //  If value contains % character then treat as integer that
    //  represents a percent and return as .x decimal. Otherwise treat
    //  value as integer representing pixels.
    //---------------------------------------------------------------------
    const sanitized = value => typeof value === str.string
        &&  value.includes('%') ? parseFloat(value) / 100.0
            : parseFloat(value)
    //---------------------------------------------------------------------
    //  Divide by 0 and numerator already is .x decimal helper
    //---------------------------------------------------------------------
    const getPercent = ( numerator, denominator) => numerator < 1
        ? numerator : denominator !== 0
        ? numerator / denominator : 1
    //---------------------------------------------------------------------
    //  Get calculated gridTemplateStyle for grid based on
    //  initial state.
    //---------------------------------------------------------------------
    let template = gridTemplateStyle(
        state,
        getPercent(
            sanitized(state.initialPrimarySize),
            getBoundingClientRect(state)[axis[state.orientation].client]
        ) + str.gridUnit
    )
    //---------------------------------------------------------------------
    //  Call updateSessionData with template and passed key property
    //  skipping updateSessionData's auto gridTemplateStyle merge.
    //---------------------------------------------------------------------
    const setSession = key =>  updateSessionData(
        state, {
            [key]: true,
            gridTemplateStyle: template[gridTemplateStyleKey(state)]
        }, true
    )
    //---------------------------------------------------------------------
    //  Set session with "calculated" template then set template
    //  as collapsed if state collapsed property is true and
    //  Primary/Secondary initial states are true.
    //---------------------------------------------------------------------
    if (
            state.collapsedInitialState
        &&  !(!state.primaryInitialState || !state.secondaryInitialState)
    ) {
        setSession(str.collapsed)
        template = gridTemplateStyle(
            state, state.collapsedSize, str.gridNone
        )
    }
    //---------------------------------------------------------------------
    //  Set session with "calculated" template then set template
    //  as Primary/Secondary hidden.
    //  Primary/Secondary false state takes precedence over collapsed
    //  with Primary taking precedence of Secondary.
    //---------------------------------------------------------------------
    if (!state.primaryInitialState || !state.secondaryInitialState) {
        setSession(str.hidden + (
            !state.primaryInitialState ? str.primary : str.secondary
        ))
        template = gridTemplateStyle(state, null, null,
            !state.primaryInitialState ? str.primary : str.secondary
        )
    }
    //---------------------------------------------------------------------
    //  Set parent state with updated properties and template style
    //  to render the (split) component.
    //---------------------------------------------------------------------
    setState({
        ...state,
        render: true,
        primaryMinSize: sanitized(state.primaryMinSize),
        primaryMaxSize: sanitized(state.primaryMaxSize),
        initialParentStyle: {
            ...stdStyles.parent,
            ...template
        }
    })

}
/*****************************************************************************************

    In bounds check

******************************************************************************************/
const inBounds = (state, primary, percent, parent) => {
    //---------------------------------------------------------------
    //  If value is less than 1 then it should represent a
    //  percent value.
    //---------------------------------------------------------------
    const check = against => {
        if (against < 1)
            return percent
        return primary
    }
    //---------------------------------------------------------------
    //  Use and array of conditions and test for any result
    //  equal to true.
    //---------------------------------------------------------------
    return ![
        check(state.primaryMinSize) < state.primaryMinSize || false,
        check(state.primaryMaxSize) > state.primaryMaxSize || false,
    ].includes(true)

}
/*****************************************************************************************

    Gutter Component

******************************************************************************************/
const Gutter = ({ state }) => {

    const config = {
        axis: axis[state.orientation],
        splitter: state.parentRef.current,
        primaryChildIndex: state.primaryIndex === 1 ? 2 : 0
    }
    //---------------------------------------------------------------
    //  Use state for capturing initial values and indication
    //  element is being dragged/moved.
    //---------------------------------------------------------------
    const [gutter, setGutter] = React.useState({
        dragging: false
    })
    //---------------------------------------------------------------
    //  Capture pointer and save start position and primary size
    //---------------------------------------------------------------
    const onPointerDown = event => {
        if (!getSessionData(state).collapsed) {
            event.currentTarget.setPointerCapture(event.pointerId);
            setGutter({
                ...gutter,
                dragging: true,
                parentSize: config.splitter.getBoundingClientRect()[config.axis.client],
                primarySize: config.splitter.children[config.primaryChildIndex][config.axis.offset],
                pointerStart: event[config.axis.pointer]
            })
        }
    }
    //---------------------------------------------------------------
    //  As pointer moves calculate new primary size and check
    //  if inBounds.
    //---------------------------------------------------------------
    const onPointerMove = event => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          const position = event[config.axis.pointer]
          const primarySize = gutter.primarySize + (position - gutter.pointerStart);
          const newPrimary = Math.max(0, Math.min(primarySize, gutter.parentSize));
          const newPercent = (newPrimary / gutter.parentSize);
          if (inBounds(state, newPrimary, newPercent, gutter.parentSize))
            gridTemplateUpdate(state, newPercent + str.gridUnit)
        }
      }
    //---------------------------------------------------------------
    //  Stop capturing pointer
    //---------------------------------------------------------------
    const onPointerUp = event => {
        event.currentTarget.releasePointerCapture(event.pointerId);
        updateSessionData(state,{})
        setGutter({
            ...gutter,
            dragging: false
        })
    };
    //---------------------------------------------------------------
    //  Set merge gutter style object, use passed style or
    //  set width/height property.
    //---------------------------------------------------------------
    const gutterStyle = () => {
        if (state.gutterStyle)
            return state.gutterStyle
        return {
            [axis[state.orientation].client]: state.gutterSize
        }
    }
    //---------------------------------------------------------------
    //  Set basic style and merge passed gutter style object
    //---------------------------------------------------------------
    const style = {
        ...stdStyles.gutter,
        ...gutterStyle(),
        cursor: axis[state.orientation].cursor
    }
    //---------------------------------------------------------------
    //  Set final component props to be passed to gutter
    //  component. 
    //---------------------------------------------------------------
    const gutterProps = {
        style: style,
        className           : state.gutterClassName,
        onPointerUp         : onPointerUp,
        onPointerDown       : onPointerDown,
        onPointerMove       : onPointerMove,
        'data-is-dragging'  : gutter.dragging,
        'data-split-gutter' : true,
        'data-orientation'  : state.orientation
    }
    //---------------------------------------------------------------
    //  Return passed component if one was passed
    //---------------------------------------------------------------
    if (state.gutterRender)
        return React.cloneElement(state.gutterRender, gutterProps)
    //---------------------------------------------------------------
    //  Return simple DIV element
    //---------------------------------------------------------------
    return (
        <div {...gutterProps}/>
    )
}
/*****************************************************************************************

    Split Component

******************************************************************************************/
export const Split = ( props ) => {
    //---------------------------------------------------------------
    //  Set initial state properties
    //---------------------------------------------------------------
    const [state, setState] = React.useState({
        id: props.id || generalId(),
        render: false,
        parentRef: React.useRef(),
        passProps: props.passProps || false,
        childCount: childrenCount(props.children),
        gutterSize: props.gutterSize || str.gutterSize,
        gutterStyle: props.gutterStyle,
        orientation: gridTemplateIsRows(props.as) ? str.horizontal : str.vertical,
        gutterRender: props.gutterRender,
        primaryIndex: props.primaryIndex === 1 ? 1 : 0,
        collapsedSize: props.collapsedSize ||  str.collapsedSize,
        primaryMinSize: props.primaryMinSize,
        primaryMaxSize: props.primaryMaxSize,
        gutterClassName: props.gutterClassName,
        gridTemplateType: gridTemplateIsRows(props.as) ? str.rows : str.columns,
        initialPrimarySize: props.initialPrimarySize || str.primarySize,
        initialParentStyle: stdStyles.parent,
        primaryInitialState: props.primaryInitialState ?? true,
        secondaryInitialState: props.secondaryInitialState ?? true,
        collapsedInitialState: props.collapsedInitialState  ?? false
    })
    //---------------------------------------------------------------
    //  Set props object to be passed to children
    //  and define a couple helper funcs
    //---------------------------------------------------------------
    const _splitProps = {
        splitProps: {
            ...state,
            dispatch: action => action && splitAction(state, action),
            isCollapsed: () => getSessionData(state)[str.collapsed] 
                ?? state.collapsedInitialState,
            getSessionData: () => getSessionData(state),
            isPrimaryHidden: () => getSessionData(state)[str.hidden+str.primary]
                ?? !state.primaryInitialState,
            isSecondaryHidden: () => getSessionData(state)[str.hidden+str.secondary]
                ?? !state.secondaryInitialState,                
            getParentClientRect: () => getBoundingClientRect(state),
            getGridTemplateStyle: () => state.gridTemplateStyle,
        }
    }
    //---------------------------------------------------------------
    //  props based.. Child Count & Can Split?
    //---------------------------------------------------------------
    const childCount = childrenCount(props.children)    
    const canSplit = props.children && childCount === 2
    //---------------------------------------------------------------
    //  Determine initial style, if session or initial or passed
    //  style if not canSplit
    //---------------------------------------------------------------
    const containerStyle = () => {
        const sessionTemplate = gridTemplateStyleFromSession(state)
        return canSplit 
            ? sessionTemplate[gridTemplateStyleKey(state)] 
                ? {
                    ...stdStyles.parent,
                    ...sessionTemplate
                }
                : state.initialParentStyle
            : props.style
    }
    //---------------------------------------------------------------
    //  If child count has changed update state, trigger render
    //---------------------------------------------------------------
    childCount !== state.childCount
        && setState({
            ...state,
            childCount
        })
    //---------------------------------------------------------------
    //  envoke setToRender once... first time when canSplit and 
    //  state.render flag has not be set. Its an instance of the
    //  wrapper element and not based on the children.
    //---------------------------------------------------------------
    React.useEffect(()=>{
        state.parentRef.current
            && canSplit
            && !state.render
            && setToRender(state, setState)
    },[state,setState])
    //---------------------------------------------------------------
    //  Render wrapper and children if there are objects and there
    //  are 2 children then split, otherwise just render passed
    //  children
    //---------------------------------------------------------------
    const element = childrenObjects(props.children)
    return (
        <div
            id={state.id}
            ref={state.parentRef}
            style={containerStyle()}
            data-split-container={canSplit ? state.orientation : null}
        >
            {canSplit && state.render ? (
                <React.Fragment>
                    {React.cloneElement(element[0], childPassProps(state,element[0],_splitProps))}
                    <Gutter state={state} />
                    {React.cloneElement(element[1],  childPassProps(state,element[1],_splitProps))}
                </React.Fragment>
            ) : (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        </div>
    )
}

Split.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    as: PropTypes.string,
    passProps: PropTypes.bool,
    gutterSize: PropTypes.string,
    gutterStyle: PropTypes.object,
    gutterRender: PropTypes.func,
    primaryIndex: PropTypes.number,
    collapsedSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    primaryMinSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    primaryMaxSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    gutterClassName: PropTypes.string,
    initialPrimarySize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    primaryInitialState: PropTypes.bool,
    secondaryInitialState: PropTypes.bool,
    collapsedInitialState: PropTypes.bool
}

export default Split
