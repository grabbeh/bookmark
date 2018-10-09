import React, { Component } from 'react'
import styled from 'styled-components'

class Checkbox extends Component {
  state = {
    required: this.props.checked
  }
  render () {
    let { handleChange, name, label } = this.props
    let { checked } = this.state
    return (
      <div>
        <input
          className='checkbox'
          name={name}
          type='checkbox'
          checked={checked}
          onChange={handleChange}
        />
        <label className='b ml2'>{label}</label>
      </div>
    )
  }
}

export default Checkbox

const Styled = styled.div`
  display: inline-block;
  > input {
    opacity: 0;
  }
  > input + label {
    position: relative; 
    padding-left: 25px; 
    cursor: pointer;   
    &:before {
      content: '';
      position: absolute;
      left:0; top: 1px;
      width: 17px; height: 17px; /* dim. de la case */
      border: 1px solid #aaa;
      background: #f8f8f8;
    }
    &:after {
      content: '✔';
      position: absolute;
      top: -1px; left: 2px;
      font-size: 16px;
      color: #09ad7e;
      transition: all .2s; 
    }
  }
  > input:not(:checked) + label {
      &:after {
        opacity: 0;
        transform: scale(0); 
      }
  }
  > input:disabled:not(:checked) + label {
      &:before {
        box-shadow: none;
        border-color: #bbb;
        background-color: #ddd;
      }
  }
  > input:checked + label {
    &:after {
      opacity: 1; 
      transform: scale(1); 
    }
  }
  > input:disabled:checked + label {
    &:after {
      color: #999;
    }
  }
  > input:disabled + label {
    color: #aaa;
  }
  > input:checked:focus + label, input:not(:checked):focus + label {
    &:before {
      border: 1px dotted blue;
    }
  }
`
