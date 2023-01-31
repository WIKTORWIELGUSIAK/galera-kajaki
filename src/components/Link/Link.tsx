/** @format */

import React from "react";
import { ArrowRightCircle, PlusCircle } from "lucide-react";
import style from "./Link.module.css";

interface LinkProps {
  name: string;
  addNew: boolean;
  clickHandler: () => void;
  mouseEnterHandler: () => void;
  mouseLeaveHandler: () => void;
}
const Link = (prosp: LinkProps) => {
  const { name, addNew, clickHandler, mouseEnterHandler, mouseLeaveHandler } =
    prosp;
  return (
    <div
      className={style.Link}
      onClick={() => clickHandler()}
      onMouseEnter={() => mouseEnterHandler()}
      onMouseLeave={() => mouseLeaveHandler()}
    >
      {addNew ? (
        <PlusCircle className={style.icon} />
      ) : (
        <ArrowRightCircle className={style.icon} />
      )}
      {`${name}`}
    </div>
  );
};

export default Link;
