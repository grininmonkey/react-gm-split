import React from 'react'
import Left from './Left'
import Right from './Right'
import Split from 'react-gm-split'
import styles from './App.module.css'
import OtherLeft from './OtherLeft'

const App = () => {
  
  const[counter, setCounter] = React.useState(0)
  const[testNumber, setTestNumber] = React.useState(1)

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
                  onClick={()=>setTestNumber(1)}
                >
                  Test1
                </span>                
                <span 
                  data-button={true}
                  onClick={()=>setTestNumber(2)}
                >
                  Test2
                </span>
                <span 
                  data-button={true}
                  onClick={()=>setTestNumber(3)}
                >
                  Test3
                </span>
                <span 
                  data-button={true}
                  onClick={()=>setTestNumber(4)}
                >
                  Test4
                </span>                                
              </div>
          </div>
          <div>
            <Split
              passProps={true}
              gutterSize="7px"
              collapsedSize="40px"
              primaryMinSize="10%"
              primaryMaxSize="90%"
              initialPrimarySize="20%"
            >
              {testNumber === 1 && <div>Single Child</div>}
              {testNumber === 2 && <Left/>}
              {testNumber === 4 && <OtherLeft/>}
              {(testNumber === 2 || testNumber === 4) && <Right testCounter={counter}/>}
              {testNumber === 3 && <div>Child 1</div>}
              {testNumber === 3 && <div>Child 2</div>}
              {testNumber === 3 && <div>Child 3</div>}
            </Split>
          </div>
      </div>
  )
  
}

export default App
