interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = ({ label, id, ...props }: InputProps) => {
  return (
    <div className="relative w-full max-w-[300px]">
      {label && (
        <label
          htmlFor={id}
          className="absolute top-4 left-4 text-sm text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className="w-full bg-red-200 text-sm text-black rounded-xl px-4 pt-6 pb-2 focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
