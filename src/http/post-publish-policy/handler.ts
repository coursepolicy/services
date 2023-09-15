import 'dotenv/config';
import { ExtendedApiGateWayEvent } from './utils/types';
import { db } from '../../../data/knex';

export const postPublishPolicyHandler = async ({
  parsedBody: { publishId, policyId, policy },
}: ExtendedApiGateWayEvent) => {
  try {
    const exists = await db('publish_policies')
      .where({ id: publishId })
      .first();

    if (!exists) {
      await db('publish_policies').insert({
        id: publishId,
        ai_policy: policy,
      });
      await db('survey_responses')
        .where({ id: policyId })
        .update({ publish_id: publishId });
    } else {
      await db('publish_policies')
        .where({ id: publishId })
        .update({ ai_policy: policy });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'DB Insert Success',
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
  }
};
