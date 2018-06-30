import { Restaurants } from '../models/Restaurants';
import * as dynamodbLib from '../libs/dynamodbLib';
import DynamoDBClient from '../libs/dynamodbLib';
import logger from '../libs/logLib';

export default class RestaurantRepository {
  constructor() {
    this.dbClient = new DynamoDBClient(`${process.env.STAGE}-users`);
  }

  async get(userId, restaurantId) {
    const result = await this.dbClient.get({
      userId: `U-${userId}`,
      entityId: `R-${restaurantId}`
    });

    const { restaurantName, rating, entityId, profileImage } = result;
    return {
      restaurantId: entityId.substr(2),
      userId: result.userId.substr(2),
      rating,
      restaurantName,
      profileImage
    };
  }

  async create(item) {
    await this.dbClient.add({
      userId: `U-${item.userId}`,
      entityId: `R-${item.restaurantId}`,
      restaurantName: item.restaurantName,
      profileImage: item.profileImage,
      rating: item.rating
    });
  }

  async update(item) {
    const keyProps = {
      userId: `U-${item.userId}`,
      entityId: `R-${item.restaurantId}`
    };

    const updateProps = {
      restaurantName: item.restaurantName,
      profileImage: item.profileImage,
      rating: item.rating
    };

    const {
      userId,
      entityId,
      rating,
      restaurantName,
      profileImage
    } = await this.dbClient.update(keyProps, updateProps);

    return {
      restaurantId: entityId.substr(2),
      userId: userId.substr(2),
      rating,
      restaurantName,
      profileImage
    };
  }

  async delete(userId, restaurantId) {
    await this.dbClient.delete({
      userId: `U-${userId}`,
      entityId: `R-${restaurantId}`
    });
  }

  async getByUser(userId) {
    const results = await this.dbClient.query({ userId: `U-${userId}` });
    return results;
  }

  getOnlineDetail(id) {
    return dynamodbLib.get(id);
  }

  saveOnlineDetail(detail) {
    return dynamodbLib.add(detail.id, detail);
  }

  saveOnlineReviews(id, reviews) {
    return dynamodbLib.update(id, 'reviews', reviews);
  }
}
