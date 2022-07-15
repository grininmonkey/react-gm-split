# react-gm-split

[![NPM](https://img.shields.io/npm/v/react-gm-split.svg)](https://www.npmjs.com/package/react-gm-split) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> Here is a codesandbox [Demo](https://codesandbox.io/s/reac-gm-split-example-1uoiz?file=/src/App.js)

## Install

```bash
npm install --save react-gm-split
```

## Usage

```jsx
import Split from 'react-gm-split'
/*
  At some root level, not each instance/file,
  import the styles which are required.
*/
import 'react-gm-split/dist/index.css' 
...
export default function MyComponent(props) {
  return(
    <Split>
      <MyLeftComponent/>
      <MyRightComponent/>
    <Split>
  )
}
```
or (as a simple concept example)

```jsx
const [userMode, setUserMode] = React.useState(1)

return(
    <Split firstChildIsHeader={true}>
      <AppHeader {...{userMode,setUserMode}}/>
      {userMode === 1 && <UserLeftMenu/>}
      {userMode === 2 && <AdminLeftMenu/>}
      {userMode === 1 && <UserRightContent/>}
      {userMode === 2 && <AdminRightContent/>}
    <Split>
)
```

The `Split` component will setup a split when there are 2 ( 3 when `firstChildIsHeader` is true ) valid React.Components within the children array. So there can be `null` or `false` items as a result of a map or direct conditions like above, and they will be ignored when split is checking for children to return.

Review the example(s) for a better sense of how to use the component.

## Properties
- `id: string | number`
- `as: string 'vertical' | 'horizontal' (default:'vertical)'`
- `passProps: boolean (default:false)` 
- `gutterSize: string | number (pixel)`
- `gutterStyle: React.CSSProperties`
- `gutterRender: React.Component`
- `gutterOverlay: boolean (default:true)`
- `collapsedSize: string | number (pixel)`
- `leftTopMinSize: string | number (percent)`
- `leftTopMaxSize: string | number (percent)`
- `gutterHoverStyle: React.CSSProperties`
- `leftTopBackground: string`
- `firstChildIsHeader: boolean (default:false)`
- `collapseTransition: boolean (default:true)`
- `initialLeftTopSize: string | number (percent)`
- `initialLeftTopState: boolean (default:true)`
- `initialCollapsedState: boolean (default:false)`
- `rightBottomBackground: string`
- `leftTopOverflowHidden: boolean`
- `initialRightBottomState: boolean (default:true)`
- `rightBottomOverflowHidden: boolean`

### `Size` related properties

The component works by calculating and setting percentage for LeftTop by setting the with/height of the single `LeftTop` container within the split tree of elements. So just think of the first child as being `left` or `top`
based on rather the split is `vertical` or `horizontal`

`gutterSize` & `collapsedSize` are treated as pixels.

The other `Size` related properties are treated as percent.

### passProps

When set to `{true}` an additional object named `splitProps` is passed to the children of `Split` which contains the state props and some additional methods of the `Split` container. 

- `action`
  - object of action types
- `dispatch( actionType )`
  - collapse
  - restore
  - hideLeftTop
  - hideRightBottom
- `isCollapsed()`
- `getSessionData()`
- `isLeftTopHidden()`
- `isRightBottomHidden`
- `getParentClientRect()`

## Key Behaviors

- Can add a `header` component which can be easily used as a page navigation layout or properties editor with controls etc...
- Should be plenty of data attributes along with the existing `style`related properties to easily style the split/gutter to your liking using various aproaches. One could always make a copy of the index.css in the dist folder and import a modified version as another approach.
- If the children count is something other than 2 or 3 if header property is true, it simply returns/renders the children within the main container but does not split the children.
- Has collapse (LeftTop) and hide (LeftTop/RightBottom) actions that can be envoked from the child elements using a passed dispatch method. `passProps` must be set to `{true}`
- Has by default a transition style property which you could simulate mobile page panning left to right using the hide/restore actions with nested `Split` components.
- Parent wrapping element does not trigger state when resizing... allowing for resizing and actions to not envoke children render during those activites.
- Children can reference and get parent dems and properties via the passed `splitProps` properties. `passProps` must be set to `{true}`

## Notes
- Per usual with "Split" components, the css path of overflow and width/height impact the behavior.. I usuallly set html,body & root to 100v(h/w) with overflow: hidden before throwing splits out :)
- Uses sessionStorage (key={id}-split) to keep restore snapshots etc.. which relies on the `id` property to be unique. One is assigned by default, but if you manually pass one.. make sure it's unique within the scope of rendered `Splits` at one time. If your page conent changes and the `Split` component is unmounted and then changed back to render the same `Split` component... the last position and state (collapsed or hidden etc...) will remain if the same `id` is applied... with the exception of nested `Split`s that might be within a component that is modifing children/count.
- Properties such as ...Render and ...Style are objects which I have not yet added a compare. Most of the other properties will trigger a state update and re-render with new values applied, the exception being the properties that start with `initial`... as those are then checked against session after very first render. This maintains user sizing and action persistance.

## License

MIT © [grininmonkey](https://github.com/grininmonkey)
