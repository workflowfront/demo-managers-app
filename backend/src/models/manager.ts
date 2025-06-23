import mongoose, { Model, Document, HydratedDocument } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'; // импортируем bcrypt
import { urlRegExp } from '../middlewares/validatons';
import UnauthorizedError from '../errors/unauthorized-error';

interface IManager extends Document {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface IManagerMethods {
  toJSON(): string;
}

interface IManagerModel extends Model<IManager, {}, IManagerMethods> {
  findManagerByCredentials: (email: string, password: string) =>
                             Promise<HydratedDocument<IManager, IManagerMethods>>;
}

const managerSchema = new mongoose.Schema<IManager, IManagerModel, IManagerMethods>({
  name: {
    type: String,
    default: 'Имя по умолчанию',
    minlength: [3, 'Минимальная длина поля "name" - 3'],
    maxlength: [20, 'Максимальная длина поля "name" - 20'],
  },
  about: {
    type: String,
    default: 'Инженер',
    minlength: [3, 'Минимальная длина поля "about" - 3'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png',
    validate: {
      validator: (v: string) => urlRegExp.test(v),
      message: 'Поле "avatar" должно быть валидным url-адресом.',
    },
  },
  // в схеме пользователя есть обязательные email и password
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true, // поле email уникально (есть опция unique: true);
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  // поле password не имеет ограничения на длину, т.к. пароль хранится в виде хэша
  password: {
    type: String,
    required: [true, 'Поле "ключ" обязательно'],
    select: false,
  },
}, { versionKey: false });

managerSchema.statics
  .findManagerByCredentials = function findByCredentials(email: string, password: string) {
    return this.findOne({ email }).select('+password')
      .then((manager) => {
        if (!manager) {
          return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
        }
        return bcrypt.compare(password, manager.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
            }
            return manager;
          });
      });
  };

managerSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model<IManager, IManagerModel>('manager', managerSchema);
