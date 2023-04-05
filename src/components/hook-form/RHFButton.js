import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

RHFButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  rules: PropTypes.object,
  control: PropTypes.object.isRequired,
};

export default function RHFButton({ name, label, helperText, rules, control, ...other }) {
  const { formState } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Button
          {...field}
          {...other}
          variant="contained"
          onClick={field.onChange}
          error={Boolean(error)}
        >
          {label}
          {helperText && <span>{helperText}</span>}
          {error && <p>{error?.message}</p>}
        </Button>
      )}
    />
  );
}
