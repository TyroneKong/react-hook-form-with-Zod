import React from "react";
import { useGetPosts } from "./hooks/hooks";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const Query = () => {
  const { data, refetch } = useGetPosts();
  console.log(`This is the data`, data?.data);

  const getAllposts = () => {
    refetch();
  };

  const editPost = (id: number): any => {
    const filteredData = data?.data?.filter((post: any) => post.id !== id);

    return axios.put(`http://localhost:3000/posts/${id}`, {
      id: id,
      title: "Name of the wind",
      author: "Patrick Roffuss",
    });
  };

  return (
    <div className="mt-10">
      Query
      <div className="mt-10">
        <Button onClick={getAllposts}>Get all Posts</Button>
      </div>
      {data?.data?.map((post: any, i: number) => {
        return (
          <div className="flex justify-center justify-between" key={i}>
            <li className="text-2xl text-green-600">{post.post.title}</li>
            <div>
              <Button onClick={() => editPost(post.id)}>edit</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Query;
