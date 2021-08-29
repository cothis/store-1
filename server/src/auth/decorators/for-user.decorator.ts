import { SetMetadata } from '@nestjs/common';

export const IS_FOR_USER_KEY = 'isForUser';
export const ForUser = () => SetMetadata(IS_FOR_USER_KEY, true);
