import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import errorLogger from '@middy/error-logger';
import httpSecurityHeaders from '@middy/http-security-headers';
import { responsesHandler } from './responses-handler';
import { validateRequestBody } from './schema';

export const handler = middy(responsesHandler)
  .before(validateRequestBody())
  .use(httpEventNormalizer())
  .use(errorLogger())
  .use(httpErrorHandler())
  .use(httpSecurityHeaders());