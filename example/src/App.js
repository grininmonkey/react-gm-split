import React from 'react'
import Left from './Left'
import Right from './Right'
import Split from 'react-gm-split'
import styles from './App.module.css'

const App = () => {
  
  return (
      <div className={styles.main}>
          <div>
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
              <Right/>
            </Split>
          </div>
      </div>
  )
  
}

export default App
