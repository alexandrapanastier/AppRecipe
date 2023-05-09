import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './Category';
import { Ingredient } from './Ingredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  instructions: string;

  @ManyToMany(() => Category, category => category.recipes)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Ingredient, ingredient => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];
}