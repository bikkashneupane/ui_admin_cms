export const CustomInput = (props) => {
  const { label, inputRef, ...rest } = props;

  return (
    <>
      {label && (
        <label className="block text-sm font-bold text-gray-700">{label}</label>
      )}
      <input
        {...rest}
        ref={inputRef}
        className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </>
  );
};

export const CustomSelect = (props) => {
  const { label, options, defaultValue, ...rest } = props;
  return (
    <div className="mb-3">
      {label && (
        <label className="block font-bold text-gray-700">{label}</label>
      )}
      <select
        {...rest}
        defaultValue={defaultValue}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">--Select--</option>
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
  const { label, name, options, onChange, form } = props;
  return (
    <div className="mb-3">
      {label && (
        <label className="block font-bold text-gray-700">{label}</label>
      )}
      <div className="flex flex-col gap-2 rounded-md shadow-lg p-2 border">
        {options?.map((option) => (
          <div key={option.value}>
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={form[name]?.includes(option.value) || false}
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

export const CustomRadio = (props) => {
  const { label, name, options, onChange, form } = props;
  return (
    <div className="mb-3">
      {label && (
        <label className="block font-bold text-gray-700">{label}</label>
      )}
      <div className="flex flex-col gap-2 rounded-md shadow-lg p-2 border">
        {options?.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={form[name]?.includes(option.value) || false}
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
  const { label, name, onChange, form, setForm, ...rest } = props;

  // add new dynamic field
  const addField = () => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: [...(prevForm[name] || []), ""],
    }));
  };

  //remove dynamic field
  const removeField = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: prevForm[name].filter((_, i) => i !== index),
    }));
  };

  // dynamic field on change
  const handleDynamicFieldChange = (e, index) => {
    const { name, value } = e.target;
    // check if form[name] has a value
    // if has a value, add the value to next available index
    const currentFields = Array.isArray(form[name]) ? form[name] : [];
    currentFields[index] = value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: currentFields,
    }));
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="block font-bold text-gray-700">{label}</label>
      )}

      <div className="flex flex-col gap-3">
        {form[name]?.map((item, index) => (
          <div className="flex gap-2 items-baseline justify-end" key={index}>
            <div className="w-[90vw]">
              <CustomInput
                {...rest}
                name={name}
                value={item}
                onChange={(e) => handleDynamicFieldChange(e, index)}
              />
            </div>

            {form[name]?.length > 1 && (
              <button
                type="button"
                className="text-red-600 text-xl font-bold"
                onClick={() => removeField(index)}
              >
                x
              </button>
            )}
          </div>
        ))}

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
