import React from "react";
import { Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Transform = () => {
  const fetchPosts = () => {
    return axios.get("http://localhost:3000/posts");
  };

  const { data } = useQuery(["posts"], fetchPosts, {
    select: (data) => {
      const authors = data?.data?.map((post: any) => post.post.author);
      return authors;
    },
  });
  console.log(data);

  return (
    <div className="mt-10">
      Transform
      {data?.map((post: any, i: number) => {
        return (
          <div key={i}>
            <li className="text-2xl text-green-600 flex">{post}</li>
          </div>
        );
      })}
      <div>
        <Button>Get authors</Button>
      </div>
    </div>
  );
};

export default Transform;
