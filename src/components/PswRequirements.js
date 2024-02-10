import React from 'react'
import "../styles/pswRequirements.css";

function PswRequirements() {
  return (
    <div
    className='pswRequirementsContainer'
  >
    <ul>
      {/* <div
      className='liContainer'
      > */}
        <li>
          <p className='requirement'>✓ Al menos 1 mayúscula</p>
        </li>
        <li>
          <p className='requirement'>✓ Al menos 1 minúscula</p>
        </li>
      {/* </div> */}
      {/* <div
      className='liContainer'
      > */}
        <li>
          <p className='requirement'>✓ Al menos 1 nùmero</p>
        </li>
        <li>
          <p className='requirement'>✓ Al menos 8 caracteres</p>
        </li>
      {/* </div> */}
    </ul>
  </div>
  )
}

export default PswRequirements