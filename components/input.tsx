interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
}

const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="simple-search" className="font-bold">
        {props.label}
      </label>
      <input
        type="text"
        id="simple-search"
        className="border border-border text-text text-sm rounded-[5px] block w-full ps-3 p-2.5 focus:ring-1 focus:ring-primary outline-none focus:border-primary"
        placeholder={props.placeholder}
        required
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
