import {
  BackgroundImage,
  Body,
  CategoryItemContainer,
} from './category-item.styles';

const CategoryItem = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <CategoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
