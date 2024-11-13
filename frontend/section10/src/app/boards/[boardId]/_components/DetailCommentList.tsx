"use client";

import {
  DELETE_COMMENT,
  FETCH_COMMENTS,
  UPDATE_COMMENT,
} from "@/app/queries/comments-queries";
import { useMutation, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";

import DetailCommentListItem from "./DetailCommentListItem";
import { useState } from "react";
import { warnOptionHasBeenMovedOutOfExperimental } from "next/dist/server/config";

export default function DetailCommentList({ boardId }: IDeteailCommentProps) {
  const [hasMore, setHasMore] = useState(true);
  const [editId, setEditId] = useState("");
  const deleteComment = useMutation(DELETE_COMMENT);
  const updateComment = useMutation(UPDATE_COMMENT);
  const fetchScale = 10;

  const { data, fetchMore } = useQuery(FETCH_COMMENTS, {
    variables: { page: 1, boardId: boardId },
  });

  // NOTE : 옮겨야할지도?
  const dataLength = data?.fetchBoardComments.length ?? 10;
  // console.log(data);

  const handleEditId = (id: string) => {
    setEditId((prevId) => (prevId === id ? "" : id));
  };

  const handleDeleteComment = () => {};
  const handleEditComment = () => {};
  const onNext = () => {
    fetchMore({
      variables: { page: Math.ceil(dataLength / fetchScale) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log("료이키텐카이", fetchMoreResult);
        if (fetchMoreResult.fetchBoardComments.length === 0) {
          console.log("마지막 입니다");
          setHasMore(false);
          return { fetchBoardComments: [...prev.fetchBoardComments] };
        }
        console.log(
          Math.ceil(dataLength / fetchScale) + 1,
          fetchMoreResult.fetchBoardComments
        );
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };
  return (
    <InfiniteScroll
      next={onNext}
      hasMore={hasMore}
      dataLength={dataLength}
      loader={<div>로딩중입니다...</div>}
      endMessage={<div>마지막입니다</div>}
    >
      {data?.fetchBoardComments.map((el: IComment, idx: number) => (
        <DetailCommentListItem
          key={el._id}
          el={el}
          editId={editId}
          handleEditId={handleEditId}
        />
      ))}
    </InfiniteScroll>
  );
}
