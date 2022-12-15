/** @format */

import React from "react";
import { RiverFormInterface } from "../../interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  riverName: yup.string().required(),
});

const RiverForm = (props: RiverFormInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data: any) => {
    console.log(data);
    props.setInputText(data.riverName);
  };
  console.log(props.open);
  const closeHandler = () => {
    props.setOpen(false);
    console.log("click");
  };
  return (
    <dialog
      open={false}
      className="modal"
      id="modal"
      style={{
        display: props.open ? "flex" : "none",
      }}
    >
      <span
        className="modalBackground"
        id="modalBackground"
        onClick={closeHandler}
      ></span>
      <form onSubmit={handleSubmit(submitForm)} className="modalForm">
        <input
          type="text"
          // name="riverName"

          {...register("riverName")}
        />
        <button type="submit">Dodaj</button>
      </form>
    </dialog>
  );
};

export default RiverForm;
