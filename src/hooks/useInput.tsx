import { ChangeEvent, FocusEvent, useCallback, useState } from 'react';
import { TypeField, TypeValidationRequirements } from 'types/types';
import { useValidation } from './useValidation';

export const useInput = (
  name: TypeField,
  initialValue: string,
  validations: TypeValidationRequirements
) => {
  const [value, setValue] = useState(initialValue);
  const [isLeave, setIsLeave] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLeave(true);
  }, []);

  const onFocus = useCallback((e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLeave(false);
  }, []);

  return { name, value, setValue, isLeave, onChange, onBlur, onFocus, ...valid };
};
