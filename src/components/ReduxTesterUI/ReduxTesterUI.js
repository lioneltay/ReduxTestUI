import React, {PropTypes, Component} from 'react'
import getParameterNames from 'get-parameter-names'
import fp from 'lodash/fp'
import {createStore} from 'redux'
import './styles.scss'
import ActionCreator from './ActionCreator'

const functionSig = (fn) => `${fn.name}(${getParameterNames(fn).join(',')})`

export default class ReduxTesterUI extends Component {
  static propTypes = {
    actionCreators: PropTypes.object.isRequired,
    selectors: PropTypes.object,
    reducer: PropTypes.func.isRequired,
  }

  static propTypes = {
    actionCreators: null,
    selectors: null,
    reducer: null,
  }

  constructor(props) {
    super(props)

    const store = createStore(props.reducer)
    this.store = store
    
    this.state = {
      storeState: store.getState(),
    }

    store.subscribe(() => this.setState(() => ({ storeState: store.getState() })))

  }

  renderActionCreators = () => {
    const actionCreators = fp.values(this.props.actionCreators)

    return actionCreators.map(actionCreator => 
      <ActionCreator 
        key={functionSig(actionCreator)} 
        actionCreator={actionCreator}
        dispatch={this.store.dispatch}
      />
    )
  }

  render() {
    return (
      <div className='redux-test-ui'>
        <div className='interface'>
          <h5>Action Creators</h5>
          <div>
            {this.renderActionCreators()}
          </div>
          {/*<h5>Selectors</h5>
          <pre>{console.log(this.props.selectors)}</pre>
          <h5>Reducer</h5>
          <pre>{functionSig(this.props.reducer)}</pre>*/}
        </div>

        <div className='store-state'>
          <h5>Store State</h5>
          <pre>{JSON.stringify(this.state.storeState, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

