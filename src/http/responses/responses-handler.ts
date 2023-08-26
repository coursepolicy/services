import 'dotenv/config';
import { ExtendedApiGateWayEvent } from '../../shared/types';
import { longPolling } from './long-polling';

export const responsesHandler = async ({
  queryStringParameters: { generatedId },
}: ExtendedApiGateWayEvent) => {
  try {
    const { results } = await longPolling(generatedId);

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
