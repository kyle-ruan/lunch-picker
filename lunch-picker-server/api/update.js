import { success, failure } from '../libs/responseLib';
import { getUserIdentity } from '../libs/requestLib';
import { Restaurants } from '../models/Restaurants';

export const handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);

  const restaurantId = event.pathParameters.id;

  try {
    await Restaurants.update(
      {
        ...data
      },
      {
        where: {
          restaurantId
        }
      }
    );
    callback(null, success());
  } catch (e) {
    callback(null, failure(e));
  }
};