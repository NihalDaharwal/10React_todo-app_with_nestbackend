import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";

interface TodoModel {
  title: string;
  date: string;
  id: number;
}

export const UserDetail = () => {
  const [todos, setTodos] = React.useState<TodoModel[]>([]);

  const { state } = useLocation();
  // console.log("🚀 ~ file: UserDetail.tsx:18 ~ UserDetail ~ state:", state);
  const { id, firstName, lastName, email } = state;
  console.log("🚀 ~ file: UserDetail.tsx:13 ~ UserDetail ~ id:", id);

  const getAllNotCompletedTodos = async () => {
    const userId = id;
    if (userId != null) {
      const response = await custom_axios.get(
        ApiConstants.TODO.FIND_NOT_COMPLETED(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(
        "🚀 ~ file: UserDetail.tsx:32 ~ getAllNotCompletedTodos ~ response:",
        response
      );
      setTodos(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };
  React.useEffect(() => {
    if (todos.length === 0) getAllNotCompletedTodos();
  }, []);

  return (
    <>
      <div onLoad={getAllNotCompletedTodos}>
        <p>{id}</p>
        <p>firstName: {firstName}</p>
        <p>lastName: {lastName}</p>
        <p>email: {email}</p>

        <div>todos count: {todos.length}</div>
        {todos.map((item) => {
          return (
            <div key={item.id}>
              <ul>
                <li>todo id: {item.id}</li>
                <li> {item.title}</li>
                <li> {item.date}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
