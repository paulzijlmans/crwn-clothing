import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCategory } from '../categories/categories.component';

import {
  BackgroundImage,
  Body,
  CategoryItemContainer,
} from './category-item.styles';

type CategoryItemProps = {
  category: TCategory;
};

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <CategoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
