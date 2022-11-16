import { useEffect, useState } from 'react';
import { TypeValidationRequirements } from 'types/types';

export const useValidation = (value: string, validations: TypeValidationRequirements) => {
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [isMinLengthError, setIsMinLengthError] = useState(false);
  const [isRegularError, setIsRegularError] = useState(false);

  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    block_for: for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          const isEmpty = !value && validations[validation];
          setIsEmptyError(isEmpty);
          setErrorText(isEmpty ? validations.isEmptyText : '');
          if (isEmpty) {
            break block_for;
          }
          continue;
        case 'isMinLength':
          const isMinLength = value.length < validations[validation];
          setIsMinLengthError(isMinLength);
          setErrorText(isMinLength ? validations.isMinLengthText : '');
          if (isMinLength) {
            break block_for;
          }
          continue;
        case 'isRegularMatch':
          const isContainRegularName = validations.isRegularMatch.test(value);
          setIsRegularError(!isContainRegularName);
          setErrorText(!isContainRegularName ? validations.isRegularMatchText : '');
          if (!isContainRegularName) {
            break block_for;
          }
          continue;
        default:
          break;
      }
    }
  }, [isMinLengthError, validations, value]);

  const isError = isEmptyError || isMinLengthError || isRegularError;

  return { isError, errorText };
};
