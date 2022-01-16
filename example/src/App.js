import React from 'react'
import Left from './Left'
import Right from './Right'
import Split from 'react-gm-split'
import styles from './App.module.css'

const App = () => {
  
  const[counter, setCounter] = React.useState(0)

  const onClick = () => {
    setCounter(counter + 1)
  }

  return (
      <div className={styles.main}>
          <div onClick={onClick}>
            <span>---header---</span>
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
              <Left/>
              <Right testCounter={counter}/>
            </Split>
          </div>
      </div>
  )
  
}

export default App
