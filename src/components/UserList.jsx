import axios from "axios";
import { useEffect, useState } from "react";

const UserList = ({ dataUpdate, isOpenModal, getDataEdit, updateList }) => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get(`https://users-crud.academlo.tech/users/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
     getData();
  }, [dataUpdate]);

  const handleClick = (type = "c") => {
      if (type === 'c') {
        getDataEdit({data:null, type});
        isOpenModal(true);
      }else{
        isOpenModal(true)
      }
  };

  const getInfo = (id, type) => {
    if (type === "u") {
      axios
        .get(`https://users-crud.academlo.tech/users/${id}/`)
        .then((res) => { 
          getDataEdit({data:res.data, type});
          handleClick(type)
        })
        .catch((err) => console.error(err));
    } else {
      axios
      .delete(`https://users-crud.academlo.tech/users/${id}/`)
      .then((res) => { 
        updateList('d')
      })
      .catch((err) => console.error(err));
    }
  };
  return (
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
                  <td width={100} >No data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
