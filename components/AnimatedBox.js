import React from 'react'
import posed from 'react-pose'
import BasicBox from './Box'
import cn from 'classnames'

const Box = props => {
  const { children, innerRef, isLoaded } = props
  return (
    <div className={cn(!isLoaded && 'dn')} ref={innerRef}>
      <BasicBox>
        {children}
      </BasicBox>
    </div>
  )
}

const TweenBox = posed(Box)({
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
    delay: 500
  },
  hide: {
    opacity: 0,
    y: -200
  }
})

TweenBox.displayName = 'TweenBox'

const AnimatedBox = ({ isLoaded, children }) => {
  return (
    <TweenBox isLoaded={isLoaded} pose={isLoaded ? 'show' : 'hide'}>
      {children}
    </TweenBox>
  )
}

export default AnimatedBox
