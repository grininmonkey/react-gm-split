import { useRef } from "react"
import { str } from "./config"
import { 
    generalId, childrenCount, sanitizedProps,
    nullishThenThis 
} from "./helpers"
import { updateSessionData } from "./session"

export default function initialState( props ) {

    const id = nullishThenThis(props.id,generalId()) 
    //---------------------------------------------------------------
    //  Specify some default values,
    //  Add/Overwrite based on props and sanitize where needed
    //---------------------------------------------------------------
    const defaults = sanitizedProps(
        {id}, props, {
            id: id,
            as: str.vertical,
            render: true,
            parentRef: useRef(),
            sizerRef: useRef(),
            passProps: false,
            childCount: childrenCount(props.children),
            gutterSize: str.gutterSize,
            gutterOverlay: true,
            collapsedSize: str.collapsedSize,
            initialLeftTopSize: str.leftTopSize,
            collapseTransition: true,
            firstChildIsHeader: false,
            initialLeftTopState: true,
            initialCollapsedState: false,
            initialRightBottomState: true,            
        }
    ) 
    //---------------------------------------------------------------
    //  Set session object with initial values from props
    //---------------------------------------------------------------    
    updateSessionData({id},{
        collapsed: defaults.initialCollapsedState,
        LeftTopSize: defaults.initialLeftTopSize,
        LeftTopState: defaults.initialLeftTopState,
        RightBottomState: defaults.initialRightBottomState
    })   

    return defaults

}