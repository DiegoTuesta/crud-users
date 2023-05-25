import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import UsersForm from "./UsersForm";
import Message from "./Message";

const UserList = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const [updateList, setUpdateList] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [dataMessage, setDataMessage] = useState({})

  const getData = () => {
    axios
      .get(`https://users-crud.academlo.tech/users/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
     getData();
  }, [updateList]);

  const handleClick = (type) => {
      if (type === 'c') {
        setDataEdit({data:null, type});
        setShowModal(true);
      }else{
        setShowModal(true)
      }
  };

  const renderView = (value) => {
    setUpdateList([...value])
    setShowModal(false)
    setShowMessage(true)
  }
  const confirm = () => {
    // console.log('entro')
    setShowMessage(false)
    axios
      .delete(`https://users-crud.academlo.tech/users/${dataMessage.id}/`)
      .then((res) => { 
        renderView('d')
        setDataMessage({data:dataMessage.data, type: 'd'})
        setShowMessage(true)
      })
      .catch((err) => console.error(err));
  }

  const getInfo = (id, type) => {
    if (type === "u") {
      axios
        .get(`https://users-crud.academlo.tech/users/${id}/`)
        .then((res) => { 
          setDataEdit({data:res.data, type});
          handleClick(type)
        })
        .catch((err) => console.error(err));
    } else {
      axios
      .get(`https://users-crud.academlo.tech/users/${id}/`)
      .then((res) => { 
        
        setDataMessage({data:res.data.first_name, type:'dq', id})
        setShowMessage(true)
        // renderView(true)
      })
      .catch((err) => console.error(err));
    }
  };
  return (
    <>
     <Modal isOpen ={showModal} onClose={ () => setShowModal(false) }>
        <UsersForm data={dataEdit}   updateList={(param) => renderView(param) } infoMessage={setDataMessage}/>
      </Modal>
      <Modal isOpen={showMessage} onClose={() => setShowMessage(false)} >
          <Message info={dataMessage} confirm={confirm} />
      </Modal>
      <div className="container">
      <div className="container-content">
        <div className="container-title">
          <h1>Users</h1>
          <button className="btn btn-add" onClick={() => handleClick('c')}>
            New User
          </button>
        </div>
        <div className="container-body">
          <table className="table">
            <thead className="table-thead">
              <tr>
                <th className="th">Full Name</th>
                <th className="th">Email</th>
                <th className="th">Birthday</th>
                <th className="th">Op</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="td">
                      {item.first_name} {item.last_name}
                    </td>
                    <td className="td">{item.email}</td>
                    <td className="td">{item.birthday}</td>
                    <td className="td">
                      <button
                        onClick={() => getInfo(item.id, "u")}
                        className="btn btn-edit"
                      >
                        U
                      </button>
                      <button
                        onClick={() => getInfo(item.id, "d")}
                        className="btn btn-delete"
                      >
                        D
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                 <td className="td"></td>
                 <td className="td">No hay Datos</td>
                 <td className="td"></td>
                 <td className="td"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default UserList;
