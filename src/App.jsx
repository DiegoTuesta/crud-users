import { useState } from 'react'

import Modal from './components/Modal'
import UsersForm from './components/UsersForm'
import UserList from './components/UserList'

function App() {
  
  const [showModal, setShowModal] = useState(false)
  const [dataUpdate, setDataUpdate] = useState(['a'])
  const [dataEdit, setDataEdit] = useState({data:null, type:'c'})
  const [showModalMessage, setShowModalMessage] = useState({type: null, show:false, data:null})

  const updateList = (value) => {
    setDataUpdate([...value])
    setShowModal(false)
    setShowModalMessage({type: value, show:true, data:null})
  }

  const closeMessage = (value) => {
    setShowModalMessage({show:value})
  }

  return (
    <div>
      {/* <button onClick={()=>setShowModal(true)}>Abril Modal</button> */}
      <Modal isOpen ={showModal} onClose={ () => setShowModal(false) }>
        <UsersForm data={dataEdit}   updateList={(param) => updateList(param)  } />
      </Modal>
      <UserList dataUpdate={dataUpdate}  isOpenModal={setShowModal} getDataEdit={setDataEdit} updateList={(param) => updateList(param)} />
      <Modal isOpen={showModalMessage.show} onClose={() => closeMessage(false)} > 
          <div className='form-container'>
              <h2>{showModalMessage.type ==='c' ? 'Created User' : showModalMessage.type === 'u' ? 'Update User' : showModalMessage.type === 'd'? 'Delete User' : showModalMessage.type }</h2>
              <div className="form-control">
                <p></p>
              </div>
          </div>
      </Modal>
      
    </div>
  )
}

export default App
