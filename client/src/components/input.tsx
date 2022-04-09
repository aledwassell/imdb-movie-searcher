import React from "react";

const debounce = (
  fn: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
  delay: number
) => {
  let timeout = -1;

  return (...args: any[]) => {
    if (timeout !== -1) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(fn, delay, ...args);
  };
};

export interface Props {
  submit: (text: string) => void;
  placeholder: string | undefined;
}

export const InputField = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.submit(event.target.value);

  };

  return (
    <form className="input">
      <input
        onChange={debounce(async (event: any) => {
          await handleChange(event);
        }, 500)}
        placeholder={props.placeholder}
        type="textarea"
        name="name"
      />
    </form>
  );
};
