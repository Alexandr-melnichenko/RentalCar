// eslint-disable-next-line no-unused-vars
import Select, { components } from "react-select";

export const SelectField = ({
  field,
  form,
  options,
  placeholder,
  isPriceField = false,
  ...props
}) => {
  const handleChange = (selectedOption) => {
    form.setFieldValue(field.name, selectedOption?.value || "");
  };

  const selectedValue = options.find((option) => option.value === field.value);

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {isPriceField && props.data.value !== "" ? `To $${children}` : children}
    </components.SingleValue>
  );

  return (
    <Select
      options={options}
      name={field.name}
      value={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable={false}
      isSearchable={false}
      //   formatOptionLabel={formatOptionLabel} // Добавляем форматирование
      components={{
        SingleValue,
        DropdownIndicator: ({ selectProps }) => (
          <div style={{ paddingRight: "8px", paddingTop: "6px" }}>
            <img
              src={
                selectProps.menuIsOpen
                  ? "/icons/arrow-up.svg"
                  : "/icons/arrow-down.svg"
              }
              alt=""
              width={16}
              height={16}
            />
          </div>
        ),
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base) => ({
          ...base,
          width: 204,
          minHeight: 44,
          backgroundColor: "#f7f7f7",
          border: "none",
          padding: "0 8px",
          textAlign: "left",
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            borderColor: "none",
          },
          cursor: "pointer",
        }),
        input: (base) => ({
          ...base,
          cursor: "pointer", // Курсор pointer для input
          caretColor: "transparent", // Скрываем мигающий курсор
        }),
        menu: (base) => ({
          ...base,
          width: 204,
          backgroundColor: "white",
          borderRadius: 8,
          border: "none",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: 4,
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: 272,
          margin: "0 8px 0 0",
          borderRadius: 8,
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-track": {
            background: "FFFFFF",
            borderRadius: "0 8px 8px 0",
            margin: "0 8px 0 0",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#DADDE1",
            borderRadius: "4px",
            marginRight: "8px", // Отступ для ползунка
          },
        }),
        option: (base, { isSelected }) => ({
          ...base,
          backgroundColor: isSelected ? "#f9fafb" : "white",
          color: isSelected ? "#101828" : "gray",
          padding: "12px 8px 12px 16px", // Корректировка padding
          marginRight: "-8px", // Компенсация для выравнивания текста
          textAlign: "left",
          ":hover": {
            backgroundColor: "#f9fafb",
          },
        }),
        singleValue: (base) => ({
          ...base,
          color: "#101828",
          //   '&[class*="-singleValue"]': {
          //     '&:not([data-value=""])::before': {
          //       content: '"To $"',
          //     },
          //   },
        }),
        placeholder: (base) => ({
          ...base,
          color: "gray",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          padding: "8px",
        }),
      }}
      {...props}
    />
  );
};
