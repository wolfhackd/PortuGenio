declare module 'fastify/types/schema' {
  import type {
    FastifySchemaValidationError,
    FastifySerializerCompiler,
  } from 'fastify';
  export type { FastifySerializerCompiler, FastifySchemaValidationError };
}
