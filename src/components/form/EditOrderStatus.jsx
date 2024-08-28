import { CustomSelect } from "../common/CustomInput";
import { useForm } from "../../hooks/useForm";

export const EditOrderStatus = ({ selectedOrder, handleOrderChange }) => {
  const { form, handleOnChange } = useForm(selectedOrder);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleOrderChange(form);
  };

  const inputs = [
    {
      label: "Order Status",
      name: "orderStatus",
      type: "text",
      required: true,
      options: [
        { text: "Pending", value: "pending" },
        { text: "Confirmed", value: "confirmed" },
        { text: "Processing", value: "processing" },
        { text: "Shipped", value: "shipped" },
        { text: "Delivered", value: "delivered" },
      ],
    },
  ];

  return (
    <form className="space-y-4" onSubmit={handleOnSubmit}>
      {inputs.map((item) => {
        return (
          <CustomSelect
            key={item?.name}
            defaultValue={form[item?.name]}
            onChange={handleOnChange}
            {...item}
            form={form}
          />
        );
      })}

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-700 transition"
        >
          Edit Order Status
        </button>
      </div>
    </form>
  );
};
