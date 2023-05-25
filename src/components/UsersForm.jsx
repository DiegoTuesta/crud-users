import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const UsersForm = ({ data, updateList, infoMessage }) => {
  const { register, handleSubmit, reset } = useForm();


  useEffect(() => {
    if (data.data === null) {
      reset({
        birthday: "",
        email: "",
        first_name: "",
        id: null,
        last_name: "",
        password: "",
      });
    } else {
      reset({
        birthday: data.data?.birthday,
        email: data.data?.email,
        first_name: data.data?.first_name,
        id: data.data?.id,
        last_name: data.data?.last_name,
        password: data.data?.password,
      });
    }
  }, [data]);

  const submit = (data2) => {
    // console.log(data.type)
    if (data.type === "c") {
      axios
        .post(`https://users-crud.academlo.tech/users/`, data2)
        .then((resp) => {
          resp.data.id &&
            reset({
              birthday: "",
              email: "",
              first_name: "",
              id: null,
              last_name: "",
              password: "",
            });
          updateList('c');
          infoMessage({data: resp.data.first_name, type:'c'})
        })
        .catch((err) => console.error(err));
    }else{
        axios.put(`https://users-crud.academlo.tech/users/${data2.id}/`, data2)
        .then( (res) => {
          
            res.data.id &&
            reset({
                birthday: "",
                email: "",
                first_name: "",
                id: null,
                last_name: "",
                password: "",
            });
            updateList('u');
            infoMessage({data: res.data.first_name, type:'u'})
        } )
    }
  };

  return (
    <div className="form-container">
      <h2>Nuevo Usuario</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-control">
          <label htmlFor="txt_name">Name</label>
          <input type="hidden" name="txt_id" id="txt_id" {...register("id")} />
          <input
            name="txt_name"
            id="txt_name"
            {...register("first_name")}
            type="text"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="txt_last_name">Last Name</label>
          <input
            name="txt_last_name"
            {...register("last_name")}
            id="txt_last_name"
            type="text"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="txt_email">Email</label>
          <input
            name="txt_email"
            id="txt_email"
            {...register("email")}
            type="email"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="txt_pass">Password</label>
          <input
            name="txt_pass"
            id="txt_pass"
            {...register("password")}
            type="password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="txt_birthday">Birthday</label>
          <input
            name="txt_birthday"
            id="txt_birthday"
            {...register("birthday")}
            type="date"
            required
          />
        </div>
        <div className="form-control">
          <button className="btn btn-submit" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
