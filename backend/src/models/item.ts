import mongoose, { ObjectId } from 'mongoose';
import { urlRegExp } from '../middlewares/validatons';

interface IItem {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date | string;
}

const itemsSchema = new mongoose.Schema<IItem>({
  name: {
    type: String,
    required: [true, 'Заполните поле "name"'],
    minlength: [3, 'Поле "name" должно содержать минимум 3 символа'],
    maxlength: [20, 'Поле "name" не может быть длиннее 20 символов'],
  },
  link: {
    type: String,
    required: [true, 'Заполните поле "link"'],
    validate: {
      validator: (v: string) => urlRegExp.test(v),
      message: 'Введите корректный url-адрес для поля "link"',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

export default mongoose.model<IItem>('item', itemsSchema);
