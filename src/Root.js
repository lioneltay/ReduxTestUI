import React, {PropTypes, Component} from 'react'

import {ReduxTesterUI} from 'components'
import * as reduxModule from 'shop'
import * as selectors from 'selectors'


export default class Root extends Component {
	render() {
		const actionCreators = Object.keys(reduxModule)
			.filter(key => key !== 'default')
			.reduce((a,v) => {
				a[v] = reduxModule[v]
				return a
			}, {})

		return (
			<div>
				<ReduxTesterUI 
					actionCreators={actionCreators}
					selectors={selectors.default}
					reducer={reduxModule.default}
				/>
			</div>
		)
	}
}