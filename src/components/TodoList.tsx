"use client";
import {
  useDeleteTodoMutation,
  useGetMeQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useUploadFileMutation,
} from "@/redux/api/todo";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface IformInput {
  _id?: number;
  name: string;
  photo: string;
}
const TodoList = () => {
  const [isEdit, setIsEdit] = React.useState<number>(0);
  const { data } = useGetMeQuery();
  const [PostTodoMutation] = usePostTodoMutation();
  const [UploadFileMutation] = useUploadFileMutation();
  const [DeleteTodoMutation] = useDeleteTodoMutation();
  const [UpdateTodoMutation] = useUpdateTodoMutation();
  const { register, handleSubmit } = useForm<IformInput>();
  const { register: registerEdit, handleSubmit: handleSubmitEdit } =
    useForm<IformInput>();
  const onSubmit: SubmitHandler<IformInput> = async (data) => {
    const file = data.photo[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data: uploadData } = await UploadFileMutation(formData);
      const newObj = {
        name: data.name,
        photo: uploadData.url,
      };
      await PostTodoMutation(newObj);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitEdit: SubmitHandler<IformInput> = async (data) => {
    const file = data.photo[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data: uploadData } = await UploadFileMutation(formData);
      const newObj = {
        _id: isEdit,
        name: data.name,
        photo: uploadData.url,
      };
      await UpdateTodoMutation(newObj);
      setIsEdit(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input type="text" {...register("name", { required: true })} />
        <label>Photo</label>
        <input type="file" {...register("photo", { required: true })} />
        <button type="submit">Send</button>
      </form>
      {data?.map((todo) => (
        <div key={todo._id}>
          {isEdit === todo._id ? (
            <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <input type="text" {...registerEdit("name")} />
              <input type="file" {...registerEdit("photo")} />
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <img src={todo.photo} alt="" width={200} />
              <p>{todo.name}</p>
              <button onClick={() => DeleteTodoMutation(todo._id)}>
                delete
              </button>
              <button onClick={() => setIsEdit(todo._id!)}>edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
