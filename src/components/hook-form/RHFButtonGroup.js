import React from 'react';
import { Controller } from 'react-hook-form';
import { ButtonGroup } from '@mui/material';

const RHFButtonGroup = ({ name, control, defaultValue, options, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ButtonGroup
          {...field}
          {...rest}
          aria-label={name}
          value={field.value === undefined ? null : field.value}
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </ButtonGroup>
      )}
    />
  );
};

export default RHFButtonGroup;
