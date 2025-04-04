// app/components/ui/Input.tsx
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      {...props}
    />
  );
};

export default Input;
//
// // components/ui/input.tsx
// import React from "react";
// export const Input = ({ value, onChange }: any) => (
//   <input className="border rounded p-1" value={value} onChange={onChange} />
// );