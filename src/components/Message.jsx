import React from 'react'

const Message = ({info, confirm}) => {
  return (
    <div className='content-message'>
        <div className='message-content'>
        <h2 style={{ color: info.type === 'c' ? 'green' : info.type === 'u' ? 'orange' : '#db3333' }} >{ info.type === 'c' ? 'New User' : info.type === 'u' ? 'Update User' : info.type === 'dq' ? 'Delete' : 'Delete user' }</h2>
        <p>{ info.type === 'c' ? `User ${info.data} add!` : info.type === 'u' ? `User ${info.data} update!` : info.type === 'dq' ?  `Are you sure to delete ${info.data}? ` :  `User ${info.data} delete!` }</p>
        </div>
       {info.type === 'dq' &&  <div className='message-footer'><button onClick={confirm}>Confirm</button></div>}
       
    </div>
  )
}

export default Message