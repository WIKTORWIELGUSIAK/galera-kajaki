/** @format */

import { ArrowRightCircle, PlusCircle } from "lucide-react";
import { LinkProps } from "../../interfaces";
import style from "./Link.module.css";

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
