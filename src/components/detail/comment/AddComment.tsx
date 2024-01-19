import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { foundDetailPostProps } from '../../../pages/Detail';
import { useModal } from '../../../hooks/useModal';
import { QUERY_KEYS } from '../../../query/keys';
import useCommentQuery from '../../../query/useCommentQuery';
import { auth } from '../../../shared/firebase';
import theme from '../../../styles/theme';
import { FoundDetailPostProps } from '../../../types/PostType';

const AddCommentForm = ({ foundDetailPost }: FoundDetailPostProps) => {
  const modal = useModal();

  const queryClient = useQueryClient();
  const currentUser = auth.currentUser;

  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const { addCommentMutate } = useCommentQuery();
  // 이벤트 핸들러
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  // 댓글 등록
  const onSubmitNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (content.trim().length === 0) {
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '내용을 입력해주세요.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    } else {
      const newComment = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        createdAt: Date.now(),
        content
      };

      addCommentMutate(
        { newComment, postId: foundDetailPost.id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.COMMENTS]
            });
          }
        }
      );
      setContent('');

      //alert('등록되었습니다.');
      const onClickSave = () => {
        modal.close();
      };

      const openModalParams: Parameters<typeof modal.open>[0] = {
        title: '등록되었습니다.',
        message: '',
        leftButtonLabel: '',
        onClickLeftButton: undefined,
        rightButtonLabel: '확인',
        onClickRightButton: onClickSave
      };
      modal.open(openModalParams);
    }
  };

  // 로그인 여부 확인
  const onAuthCheckHandler = () => {
    if (!currentUser) {
      const confirmation = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
      if (confirmation) navigate('/auth');
    }
  };

  return (
    <CommentSubmitForm onSubmit={onSubmitNewComment}>
      <input
        value={content}
        onChange={onChangeContent}
        onClick={onAuthCheckHandler}
        type="text"
        placeholder="댓글을 입력하세요."
      />
      <SubmitButton type="submit">등록하기</SubmitButton>
    </CommentSubmitForm>
  );
};

export default AddCommentForm;

const CommentSubmitForm = styled.form`
  display: flex;
  width: 100%;
  height: 60px;
  column-gap: 10px;

  & input {
    flex: 1;
    color: ${theme.color.gray};
    border: 1px solid #888;
    border-radius: 10px;
    background-color: #f6f6f6;
    font-size: 16px;
    padding: 0 20px;
  }
`;

const SubmitButton = styled.button`
  color: white;
  border: 1px solid #888;
  border: none;
  border-radius: 10px;
  background-color: ${theme.color.mangoMain};
  font-size: 16px;
  font-weight: bold;
  width: 100px;
  &:hover {
    background-color: #df8d11;
  }
`;
