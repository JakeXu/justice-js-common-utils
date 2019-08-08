/*
 * Copyright (c) 2019. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { isEmpty } from "validator";
import { Enum } from "../../types/types";
import { ErrorTypes } from "./constant/errorTypes";

export const ValidateLengthErrorType = Enum(
  ErrorTypes.empty,
  ErrorTypes.lessThanLengthLimit,
  ErrorTypes.exceedLengthLimit,
  ErrorTypes.invalidOption
);
export type ValidateLengthErrorType = Enum<typeof ValidateLengthErrorType>;

export interface ValidateLengthOption {
  min?: number;
  max?: number;
  isRequired?: boolean;
}

export const validateLength = (value: string, { min = 1, max = 256, isRequired = true }: ValidateLengthOption = {}) => {
  const isMinOptionMinus = min < 0;
  const isMaxOptionMinus = max < 0;
  const isMaxOptionSmallerThanMinOption = max < min;
  if (isMinOptionMinus || isMaxOptionMinus || isMaxOptionSmallerThanMinOption) {
    return ValidateLengthErrorType.invalidOption;
  }
  if (isEmpty(value)) {
    if (!isRequired) {
      return null;
    }
    return ValidateLengthErrorType.empty;
  }
  if (value && value.length < min) {
    return ValidateLengthErrorType.lessThanLengthLimit;
  }
  if (value && value.length > max) {
    return ValidateLengthErrorType.exceedLengthLimit;
  }

  return null;
};
