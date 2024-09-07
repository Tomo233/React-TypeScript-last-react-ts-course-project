import { ReactNode, ComponentPropsWithoutRef } from "react";
import { NavLink } from "react-router-dom";

type ButtonProps = {
  textOnly?: boolean;
  children: ReactNode;
  url?: never;
} & ComponentPropsWithoutRef<"button">;

type LinkProps = {
  textOnly?: boolean;
  url: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof NavLink>, "to">;

function Button(props: ButtonProps | LinkProps) {
  if (props.url !== undefined) {
    const { url, children, textOnly, ...otherProps } = props;
    return (
      <NavLink
        to={url}
        className={`button ${textOnly ? "button--text-only" : ""}`}
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  }

  const { children, textOnly, ...otherProps } = props;

  return (
    <button
      className={`button ${textOnly ? "button--text-only" : ""}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
