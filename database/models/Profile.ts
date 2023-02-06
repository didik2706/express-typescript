import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
  MALE = "male",
  FEMALE = "female"
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: "date", nullable: true })
  birth_date: Date
} 