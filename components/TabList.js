import React, { Children, cloneElement, Component } from 'react'
import * as PropTypes from 'prop-types'

class TabList extends Component {
  static contextTypes = {
    activeIndex: PropTypes.number.isRequired,
    onSelectTab: PropTypes.func.isRequired
  }
  render () {
    const { activeIndex } = this.context
    const children = Children.map(this.props.children, (child, index) => {
      return cloneElement(child, {
        isActive: index === activeIndex,
        onSelect: () => this.context.onSelectTab(index)
      })
    })
    return (
      <div>
        {children}
      </div>
    )
  }
}

export default TabList
