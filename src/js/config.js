import PropTypes from "prop-types"

const axis = {
    vertical: {
        client  : "width",
        pointer : "clientX",
    },
    horizontal: {
        client  : "height",
        pointer : "clientY",
    }
}

const actions = {
    restore: 1,
    collapse: 2,
    hideLeftTop: 3,
    hideRightBottom: 4
}

const dataKey = {
    hover           : "data-hover",
    gutter          : "data-gutter", 
    collapse        : "data-collapse",
    collapsed       : "data-collapsed",
    isDragging      : "data-is-dragging",
    headerContainer : "data-header-container"
}

const str = {
    size         : "Size",
    state        : "State",
    pixel        : "px",
    width        : "width",
    string       : "string",
    object       : "object",
    hidden       : "hidden",
    initial      : "initial",
    leftTop      : "LeftTop",
    percent      : "%",
    function     : "function",
    vertical     : Object.keys(axis)[0],
    animation    : "all 0.2s ease-out",
    collapsed    : "collapsed",
    undefined    : "undefined",
    horizontal   : Object.keys(axis)[1],
    transition   : "transition",
    gutterSize   : "5px",
    WithHeader   : "WithHeader",
    withHeader   : "withHeader",
    leftTopSize  : "50%",
    rightBottom  : "RightBottom",
    collapsedSize: "50px",
    // collapsedSide: "LeftTop",
}

const splitPropTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    as: PropTypes.string,
    passProps: PropTypes.bool,
    gutterSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    gutterStyle: PropTypes.object,
    gutterRender: PropTypes.func,
    gutterOverlay: PropTypes.bool,
    collapsedSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    leftTopMinSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    leftTopMaxSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    gutterHoverStyle: PropTypes.object,
    leftTopBackground: PropTypes.string,
    collapseTransition: PropTypes.bool,
    firstChildIsHeader: PropTypes.bool,
    initialLeftTopSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    initialLeftTopState: PropTypes.bool,
    initialCollapsedState: PropTypes.bool,
    rightBottomBackground: PropTypes.string,
    leftTopOverflowHidden: PropTypes.bool,
    initialRightBottomState: PropTypes.bool,
    rightBottomOverflowHidden: PropTypes.bool
}

export {
    str,
    axis,
    dataKey,
    actions,
    splitPropTypes
}