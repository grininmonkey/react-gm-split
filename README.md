# react-gm-split

[![NPM](https://img.shields.io/npm/v/react-gm-split.svg)](https://www.npmjs.com/package/react-gm-split) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Work in Progress, I am copying my personal split component I have used within my CRA-Templates for some time and making "Yet Another" public split component... because, why not ;-)

## Install

```bash
Work In Progress: Not Ready Yet...
```

## Or

Download the raw src/index.js file from this repo and save it within your existing project (rename and/or modify it) and then import it... 
```jsx
import Split from '<path to saved file>'
```

## Usage

```jsx
import Split from 'react-gm-split'
...

export default function MyComponent(props) {
  return(
    <Split>
      <MyLeftComponent>
      <MyRightComponent>
    <Split>
  )
}
```

## Properties
- `id: string | number`
- `as: string 'Columns' | 'Rows'`
- `passProps: bool` 
- `gutterSize: string | number`
- `gutterStyle: style object`
- `gutterRender: react component`
- `primaryIndex: number`
- `collapsedSize: string | number`
- `primaryMinSize: string | number`
- `primaryMaxSize: string | number`
- `gutterClassName: string`
- `initialPrimarySize: string | number`
- `primaryInitialState: bool`
- `secondaryInitialState: bool`
- `collapsedInitialState: bool`

### `Size` related properties

The component works by calculating and setting percentage for Left|Right or Top|Bottom `gridTemplate`
css property.

`gutterSize` is treated as pixels.

The primary `Size` related properties are treated as pixels unless the value passed is a string that contains `%`.

## Key Behaviors

- If the children count is something other than 2 it simply returns/renders the children directly without wrapping the children as a `split`.
- Has collapse primary and hide parent/secondary actions that can be envoked from the child elements using a passed dispatch method. `passProps` must be set to `{true}`
- Parent wrapping element does not trigger state when resizing... allowing for resizing and actions to not envoke children during those activites.
- Children can reference and get parent dems and properties via the passed `splitProps` properties. `passProps` must be set to `{true}`
- Can specify which child component is treated as the primary using the `primaryIndex` property.

## Notes

- Once rendered, props are not tested for changes, meaning any state changes within the calling component that are used for any of the `Split` properties will not have an impact. I needed this behavior for my projects from which I extract this from... and may setup a new property to trigger testing and resetting on `Split` prop changes
- The children must have CSS `overflow` set and have a `background-color` set or the natural grid behavior(s) will either prevent the shrinking or when using the hide actions which just set one column/row to 0px.. the contents will be visible underneath the sized column/row.
- Uses sessionStorage to keep restore snapshots etc.. which relies on the `id` property to be unique. One is assigned by default, but if you manually pass one.. make sure it's unique within the scope of rendered `Splits` at one time.

## License

MIT © [grininmonkey](https://github.com/grininmonkey)
