import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Put('activate')
  activate(@Body() body: { email: string; password: string }) {
    return this.service.activate(body.email, body.password);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('active')
  findActive() {
    return this.service.findActive();
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.service.findOneByEmail(email);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }
}
