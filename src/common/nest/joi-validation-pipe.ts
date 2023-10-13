import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';
import * as Joi from 'joi';

import { ValidationException } from './validation-exception';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private static logger = new Logger(JoiValidationPipe.name);

  constructor(private readonly schema: Joi.AnySchema) {}

  static validateAndReturn<T>(
    input: T,
    schema: Joi.AnySchema,
    onError: (err: Joi.ValidationError) => void,
  ) {
    const { error, value } = (<Joi.AnySchema<T>>schema).validate(input, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      onError && onError(error);
    }

    return { value, valid: !error, error };
  }

  static validateAndThrow(input: any, schema: Joi.AnySchema) {
    return JoiValidationPipe.validateAndReturn(input, schema, (error) => {
      const { details, _original } = error;
      JoiValidationPipe.logger.log(_original);
      JoiValidationPipe.logger.log(details);
      throw new ValidationException(
        details.map(({ type, context, ...rest }) => rest),
        _original,
      );
    }).value;
  }

  transform(input: any, metadata: ArgumentMetadata) {
    return JoiValidationPipe.validateAndThrow(input, this.schema);
  }

  static get IdNumberSchema() {
    return Joi.number().integer().positive().disallow(0).required();
  }

  static get idNumber() {
    return new JoiValidationPipe(JoiValidationPipe.IdNumberSchema);
  }

  static get requiredStr() {
    return new JoiValidationPipe(Joi.string().required().invalid(''));
  }

  static booleanPipe(
    builder: (s: Joi.BooleanSchema) => Joi.BooleanSchema = (s) => s,
  ) {
    return new JoiValidationPipe(builder(Joi.boolean()));
  }
}
