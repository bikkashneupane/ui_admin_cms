import { useState } from "react";

export const CustomInput = (props) => {
  const { label, inputRef, ...rest } = props;

  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...rest}
        ref={inputRef}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export const CustomSelect = (props) => {
  const { label, options, defaultValue, ...rest } = props;
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        {...rest}
        defaultValue={defaultValue}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option>--Select--</option>
        {options?.map((item) => (
          <option key={item?.value} value={item?.value}>
            {item?.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export const CustomCheck = (props) => {
  const { label, name, options, onChange } = props;
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-1 flex gap-4 rounded-md shadow-lg p-2 border">
        {options.map((option) => (
          <div key={option.value} className="flex items-center ">
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              onChange={onChange}
              className="mr-2"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="text-gray-700"
            >
              {option.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DynamicInputField = (props) => {
  const { label, name, value, onChange } = props;

  const [fields, setFields] = useState(value || [""]);

  const addField = () => {
    const newFields = [...fields, ""];
    setFields(newFields);
  };

  const removeField = () => {};

  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {fields.map((item, index) => {
        return (
          <div className="" key={index}>
            <CustomInput name={name} value={item.value} />
            <button
              type="button"
              className="ml-2 text-red-600"
              onClick={() => removeField(index)}
              data-id={index}
              data-action="remove"
            >
              &times;
            </button>
          </div>
        );
      })}
      <div className="flex gap-4 items-center">
        <input className="mt-1 block w-4/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <div
          className="text-teal-500 font-bold text-sm cursor-pointer"
          onClick={addField}
        >
          + Add Another
        </div>
      </div>
    </div>
  );
};
