import { Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Recipe, recipe => recipe.categories)
  recipes: Recipe[];
}
