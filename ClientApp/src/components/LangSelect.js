import * as React from 'react'
import { translate, setLanguage, getLanguage } from 'react-multi-lang'
import Flag from "react-world-flags";
class LangSelect extends React.Component {
  render () {
    switch (getLanguage()) {
      case 'pl':
        return(
          <div style={{borderRadius: 6, overflow:"hidden"}} onClick={()=>setLanguage('en')}>
            <Flag code="gb" height="16" />
          </div>
        )
      case 'en':
          return(
            <div style={{borderRadius: 6}} onClick={()=>setLanguage('pl')}>
            <Flag code="pl" height="16" />
            </div>
          )
      default:
        return (<div></div>);
    }
  }
}

export default translate(LangSelect);