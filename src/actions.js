import { axis, actions, dataKey, str } from "./config"
import { getSessionData, updateSessionData } from "./session"
//---------------------------------------------------------------
//  Set SessionData and then update gridTemplate with 
//  collapsedSize as new primary size and gutterSize as none
//---------------------------------------------------------------
const actionCollapse = (state) => {
    if (!getSessionData(state).collapsed) {
        state.parentRef.current.setAttribute(dataKey.collapsed,true)
        state.sizerRef.current.style.setProperty(
            axis[state.as].client, state.collapsedSize
        )
        updateSessionData(
            state, {
                collapsed: true
            }
        )
    }

    return true
}
//---------------------------------------------------------------
//  Set SessionData and then update gridTemplate with
//  0 sized target and gutter sections
//---------------------------------------------------------------
const actionHide = (state, child) => {
    if (getSessionData(state)[child+str.state]) {
        state.parentRef.current.setAttribute(
            dataKey.collapse, child
        )
        state.sizerRef.current.style.setProperty(
            axis[state.as].client,
            (child === str.rightBottom ? 100 : 0)+str.percent
        )
        updateSessionData(
            state, {
                [child+str.state]: false
            }
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
        collapsed: false
    }
    
    if (
        session.collapsed
        ||  !session[str.leftTop+str.state]
        ||  !session[str.rightBottom+str.state]
    ) {
        if (
            session.collapsed 
            && !session[str.leftTop+str.state]
        ) 
            restore.collapsed = true
            
        state.parentRef.current.setAttribute(dataKey.collapsed,restore.collapsed)
        state.parentRef.current.removeAttribute(dataKey.collapse)
        state.sizerRef.current.style.setProperty(
            axis[state.as].client,
            restore.collapsed
                ? state.collapsedSize
                : session[str.leftTop+str.size]
        )

        updateSessionData(
            state, {
                collapsed: restore.collapsed,
                [str.leftTop+str.state]: true,
                [str.rightBottom+str.state]: true
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
        case actions.collapse:
            return actionCollapse(state);
        case actions.restore:
            return actionRestore(state);
        case actions.hideLeftTop:
            return actionHide(state, str.leftTop)
        case actions.hideRightBottom:
            return actionHide(state, str.rightBottom)
        default:
            return false;
    }
}

export default splitAction
