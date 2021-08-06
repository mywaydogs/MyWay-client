import { Customer } from 'src/customers/entities/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age_years: number;

  @Column()
  age_months: number;

  @Column()
  age_last_updated: Date;

  @Column()
  breed: string;

  @Column()
  color: string;

  @Column()
  customerId: number;

  @ManyToOne((type) => Customer)
  customer: Customer;
}
