import { Key } from 'react';
import CategoryItem from '../category-item/category-item.component';
import categories from './categories.json';

import { CategoriesContainer } from './categories.styles';

export type TCategory = {
  id: Key;
  title: string;
  imageUrl: string;
  route: string;
};

const Categories = () => {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </CategoriesContainer>
  );
};

export default Categories;
