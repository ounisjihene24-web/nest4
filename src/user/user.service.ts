import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(data: any) {
    const user = await this.userModel.create({
      email: data.email,
      password: data.password,
      active: false,
    });

    return plainToInstance(UserResponseDto, user.toObject());
  }

  async findAll() {
    const users = await this.userModel.find();
    return users.map(u =>
      plainToInstance(UserResponseDto, u.toObject()),
    );
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) return null;

    return plainToInstance(UserResponseDto, user.toObject());
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findActive() {
    const users = await this.userModel.find({ active: true });
    return users.map(u =>
      plainToInstance(UserResponseDto, u.toObject()),
    );
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, dto);
    return this.findOneById(id);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async activate(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return { message: 'User not found' };
    if (user.password !== password)
      return { message: 'Incorrect password' };

    user.active = true;
    await user.save();

    return plainToInstance(UserResponseDto, user.toObject());
  }
}
