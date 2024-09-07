import { ComponentPropsWithoutRef } from "react";

type InputProps = {
  id: string;
  labelContent: string;
} & ComponentPropsWithoutRef<"input">;

function Input({ id, labelContent, ...otherProps }: InputProps) {
  return (
    <div className="control">
      <label htmlFor={id}>{labelContent}</label>
      <input id={id} {...otherProps} />
    </div>
  );
}

export default Input;
