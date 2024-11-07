import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  maidenName: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  birthDate: String,
  image: String,
  bloodGroup: String,
  height: Number,
  weight: Number,
  eyeColor: String,
  hair: {
    type: Object,
    default: {},
  },
  address: {
    type: Object,
    default: {},
  },
  macAddress: String,
  university: String,
  bank: {
    type: Object,
    default: {},
  },
  company: {
    type: Object,
    default: {},
  },
  ein: String,
  ssn: String,
  userAgent: String,
  crypto: {
    type: Object,
    default: {},
  },
  role: String,
});

const User = models.User || model('User', userSchema);

export default User;
