import React from 'react'
import Left from './Left'
import Right from './Right'
import Split from 'react-gm-split'
import styles from './App.module.css'
import OtherLeft from './OtherLeft'

const App = () => {
  
  const[counter, setCounter] = React.useState(0)
  const[exampleNumber, setExampleNumber] = React.useState(2)

  const onClick = () => {
    setCounter(counter + 1)
  }

  return (
      <div className={styles.main}>
          <div>
              <div onClick={onClick}>
                <span>Header</span>
              </div>
              <div>
              <span 
                  data-button={true}
                  onClick={()=>setExampleNumber(1)}
                >
                  Example1
                </span>                
                <span 
                  data-button={true}
                  onClick={()=>setExampleNumber(2)}
                >
                  Example2
                </span>
                <span 
                  data-button={true}
                  onClick={()=>setExampleNumber(3)}
                >
                  Example3
                </span>
                <span 
                  data-button={true}
                  onClick={()=>setExampleNumber(4)}
                >
                  Example4
                </span>                                
              </div>
          </div>
          <div>
            <Split
              id="exampleRoot"
              passProps={true}
              gutterSize="7px"
              collapsedSize="40px"
              primaryMinSize="10%"
              primaryMaxSize="90%"
              initialPrimarySize="20%"
            >
              {exampleNumber === 1 && <div data-lots-padding>Single Child</div>}
              {exampleNumber === 2 && <Left/>}
              {exampleNumber === 4 && <OtherLeft/>}
              {(exampleNumber === 2 || exampleNumber === 4) && <Right ExampleCounter={counter}/>}
              {exampleNumber === 3 && <div data-lots-padding>Child 1</div>}
              {exampleNumber === 3 && <div data-lots-padding>Child 2</div>}
              {exampleNumber === 3 && <div data-lots-padding>Child 3</div>}
            </Split>
          </div>
      </div>
  )
  
}

export default App
