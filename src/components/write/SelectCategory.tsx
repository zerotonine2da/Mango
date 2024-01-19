import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { editPostState, isEditingPostState } from '../../recoil/posts';
import { roleState } from '../../recoil/users';
import { categoryList } from './common/Lists';

function SelectCategory() {
  const [isEditingPost] = useRecoilState(isEditingPostState);
  const { foundPost } = isEditingPost;
  // const [foundPost] = useRecoilState(foundPostState);
  const role = useRecoilValue(roleState);
  // const categoryList = useRecoilValue(categoryListState);

  // const [post, setEditPost] = useRecoilState(postState);
  const [editPost, setEditPost] = useRecoilState(editPostState);

  // Determine the current display category
  const displayCategoryEng =
    isEditingPost.isEditing && foundPost?.category ? foundPost.category : categoryList[0].nameEng;

  // const [displayCategoryEng, setDisplayCategoryEng] = useState();
  const [selectedCategoryEng, setSelectedCategoryEng] = useState(displayCategoryEng);

  useEffect(() => {
    setSelectedCategoryEng(displayCategoryEng);
  }, [displayCategoryEng]);

  // Filtered category list based on role
  const filteredCategoryList = useMemo(() => {
    return role === 'user' ? categoryList.filter((category) => !category.isAdmin) : categoryList;
  }, [categoryList, role]);

  const onChangeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategoryEng = event.target.value;
    setSelectedCategoryEng(newCategoryEng); // Update the selected category
    setEditPost({ ...editPost, category: newCategoryEng }); // Update the post state
  };

  return (
    <Select value={selectedCategoryEng} onChange={onChangeSelectHandler}>
      {filteredCategoryList.map((item, idx) => {
        return (
          <option key={idx} value={item.nameEng}>
            {item.nameKor}
          </option>
        );
      })}
    </Select>
  );
}

export default SelectCategory;

const Select = styled.select`
  width: 200px;
  height: 30px;
  font-size: 16px;
  border-color: transparent;
  text-align: center;
`;
