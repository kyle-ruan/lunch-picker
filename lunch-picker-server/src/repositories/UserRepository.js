import Sequelize from 'sequelize';
import { Users } from '../models/Users';
import DynamoDBClient from '../libs/dynamodbLib';

const Op = Sequelize.Op;

export default class UserRepository {
  constructor() {
    this.dbClient = new DynamoDBClient(`${process.env.STAGE}-users`);
  }

  get(id) {
    return Users.findById(id);
  }

  getAll() {
    return Users.findAll();
  }

  getByUsername(username) {
    return Users.findAll({ where: { userToken: username } });
  }

  create(user) {
    return Users.create(user);
  }

  update(id, fields) {
    return Users.update({ ...fields }, { where: { userId: id } });
  }

  getList(ids) {
    return Users.findAll({
      where: {
        userId: {
          [Op.in]: ids
        }
      }
    });
  }

  // Restaurants
  async rateRestaurant(item) {
    await this.dbClient.add({
      userId: `U-${item.userId}`,
      entityId: `R-${item.restaurantId}`,
      restaurantName: item.restaurantName,
      profileImage: item.profileImage,
      rating: item.rating
    });
  }
}
