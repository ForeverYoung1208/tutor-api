import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const UseResponse = (ResponseClass: any) => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      type: ResponseClass,
    }),
  );
};
