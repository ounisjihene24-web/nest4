import {
  Entity,
  Column,
  ObjectIdColumn,
 ObjectID,  // <-- changer ici
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
} from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity()
export class User {
  private logger = new Logger(User.name);

  @ObjectIdColumn()
  id: ObjectID; // <-- changer ici

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @BeforeInsert()
  beforeInsert() {
    this.logger.log(`Before Insert → Creating user with email: ${this.email}`);
  }

  @AfterInsert()
  afterInsert() {
    this.logger.log(`After Insert → User ${this.email} created`);
  }

  @AfterUpdate()
  afterUpdate() {
    this.logger.log(`After Update → User ${this.id} updated`);
  }

  @BeforeRemove()
  beforeRemove() {
    this.logger.log(`Before Remove → User ${this.id} will be deleted`);
  }
}
