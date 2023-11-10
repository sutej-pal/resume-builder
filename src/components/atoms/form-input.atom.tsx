interface FormInputProps {
    type?: 'text' | 'password';
    label?: string;
    name?: string;
    placeholder?: string;
    value: string;
    onChange: Function;
    disabled?: boolean
    wrapperClass?: string;
}

export function FormInput({
    label = "",
    type = 'text',
    name = '',
    placeholder = '',
    value = '',
    onChange = (value: string) => { },
    disabled = false,
    wrapperClass = 'false'
}: FormInputProps) {
    return (
        <div className={wrapperClass}>
            <label className="mb-1" htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                className="form-control mb-3"
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}
