import React from 'react'
import Left from './Left'
import Right from './Right'
import Split from 'react-gm-split'
import Content from './Content'
import OtherLeft from './OtherLeft'
import Header from './Header'
import 'react-gm-split/dist/index.css'

const App = () => {
  
  const[counter, setCounter] = React.useState(0)
  const[exampleNumber, setExampleNumber] = React.useState(1)

  return (
    <Split
      id="exampleRoot"
      as="vertical"
      passProps={true}
      gutterSize={8}
      gutterStyle={{}}
      gutterRender={null}
      gutterOverlay={true}
      gutterHoverStyle={{
        opacity: ".6",
        backgroundColor: "var(--split-gutter-hover-color)",
        transition: "all 0.4s ease-in"
      }}
      collapsedSize={50}
      leftTopMinSize={5}
      leftTopMaxSize={95}
      leftTopBackground="var(--color-section)"
      firstChildIsHeader={exampleNumber < 3}
      collapseTransition={true}
      initialLeftTopSize={25}
      initialLeftTopState={true}
      initialCollapsedState={false}
      rightBottomBackground="var(--color-content)"
      initialRightBottomState={false}
      rightBottomOverflowHidden={true}
    >
      {exampleNumber <  3 && (
        <Header {...{
            counter,
            setCounter,
            setExampleNumber
        }}/>
      )}
      {exampleNumber === 1 && <Left/>}
      {exampleNumber === 2 && <OtherLeft/>}
      {exampleNumber < 3 && (
        <Right ExampleCounter={counter}/>
      )}
      {exampleNumber === 3 && (
        <Content back={()=>setExampleNumber(1)} />
      )}
    </Split>
  )
  
}


export default App
