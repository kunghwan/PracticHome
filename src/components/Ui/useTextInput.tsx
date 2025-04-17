interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = ({ label, ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      <input
        {...props}
        className="w-full bg-red-200 text-sm text-black rounded-xl px-4 pt-6 pb-2 focus:outline-none"
      />
      {label && (
        <span className="absolute top-1.5 left-4 text-sm text-gray-700">
          {label}
        </span>
      )}
    </div>
  );
};

export default TextInput;
