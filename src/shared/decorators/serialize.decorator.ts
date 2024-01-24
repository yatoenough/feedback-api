import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/shared/interceptors/serialize.interceptor';

interface ClassConstructor {
  new (...args: any[]): object;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
