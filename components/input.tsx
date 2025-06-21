interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
}

const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col md:flex-row max-w-sm md:items-center gap-2">
      <label htmlFor="simple-search" className="font-bold">
        {props.label}
      </label>
      <input
        type="text"
        id="simple-search"
        className="border border-border text-text text-sm rounded-lg block w-full ps-5 p-2.5 focus:ring-0 focus:ring-offset-0 !outline-none focus:border-primary focus:border-2"
        placeholder={props.placeholder}
        required
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
