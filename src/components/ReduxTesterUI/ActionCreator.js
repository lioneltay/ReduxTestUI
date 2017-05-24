import React, {PropTypes, Component} from 'react'
import getParameterNames from 'get-parameter-names'

const functionSig = (fn) => `${fn.name}(${getParameterNames(fn).join(',')})`

export default class ActionCreator extends Component {
  static propTypes = {
    actionCreator: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props) 
    
    const paramNames = getParameterNames(props.actionCreator)
    const values = paramNames.reduce((a,v) => {
      a[v] = null
      return a
    }, {})
    this.state = {
      argNames: paramNames,
      values: {},
    }
  }

  setValue = (name) => (event) => {
    event.persist()
    this.setState((prev) => ({ values: { ...prev.values, [name]: event.target.value }}))
  }
  
  callActionCreator = () => {
    const values = this.state.values
    let args
    try {
      args = Object.keys(values).map(key => JSON.parse(values[key]))
    } catch(err) {
      console.warn('invalid JSON', err)
      return
    }
    
    this.props.dispatch(this.props.actionCreator(...args))
  }

  renderParam = (argName) => {
    const stateVal = this.state.values[argName]

    return (
      <div key={argName}>
        <label>
          {argName}:
          <textarea onChange={this.setValue(argName)} value={stateVal ? stateVal : ''} />
        </label>
      </div>
    )
  }

  render() {
    const {actionCreator} = this.props

    return (
      <div>
        <h6>{functionSig(actionCreator)}</h6>
        <div>
          {this.state.argNames.map(this.renderParam)}
        </div>
        <button onClick={this.callActionCreator}>Call</button>
      </div>
    )
  }
}