import React from 'react'

const Select = ({
  values,
  handleChange,
  name,
  placeholder,
  options,
  label
}) => {
  return (
    <div>
      <div className='b'>
        <label>
          {label}
        </label>
      </div>
      <select
        className='bl-0 bt-0 br-0 bb bw1 w5 outline-0 pa1 mt2 f5 b--black-20'
        value={values[name]}
        name={name}
        key={values[name]}
        onChange={handleChange}
      >
        <option value={-1}>{placeholder}</option>
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
