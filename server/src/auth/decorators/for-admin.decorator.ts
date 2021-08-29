import { SetMetadata } from '@nestjs/common';

export const IS_FOR_ADMIN_KEY = 'isForAdmin';
export const ForAdmin = () => SetMetadata(IS_FOR_ADMIN_KEY, true);
