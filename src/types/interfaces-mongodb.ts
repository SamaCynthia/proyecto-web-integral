export type ObjectId = string; // Placeholder for MongoDB ObjectId type

// Base MongoDB document with optional timestamps
export interface IMongoDoc {
  _id?: ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser extends IMongoDoc {
  name: string;
  email: string;
  passwordHash?: string;
  role?: 'user' | 'admin' | string;
  isActive?: boolean;
}

export interface IProduct extends IMongoDoc {
  title: string;
  description?: string;
  price: number;
  stock?: number;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface IOrderItem {
  productId: ObjectId | string;
  quantity: number;
  price: number; // price at time of order
}

export interface IOrder extends IMongoDoc {
  userId: ObjectId | string;
  items: IOrderItem[];
  total: number;
  status?: 'pending' | 'paid' | 'shipped' | 'cancelled' | string;
  placedAt?: Date;
}

// Generic repository interfaces
export interface IRepository<T extends IMongoDoc> {
  findById(id: ObjectId | string): Promise<T | null>;
  find(filter?: Partial<T>): Promise<T[]>;
  create(doc: Partial<T>): Promise<T>;
  update(id: ObjectId | string, update: Partial<T>): Promise<boolean>;
  delete(id: ObjectId | string): Promise<boolean>;
}
