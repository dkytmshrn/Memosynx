import {
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';

export abstract class BaseModel<T> extends Model<T> {
  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
