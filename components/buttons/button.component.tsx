import React from "react";

export default function Button({
  children,
  ...props
}: React.PropsWithChildren<{}> | React.ButtonHTMLAttributes<{}>) {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {children}
    </button>
  );
}
