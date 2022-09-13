import React, { useRef } from "react";
import { useAddPost } from "./hooks/hooks";
import { useForm } from "react-hook-form";

import { Button, Input, FormLabel } from "@chakra-ui/react";

const Mutation = () => {
  const { mutate: addPost } = useAddPost();
  const { register, handleSubmit } = useForm();

  const formRef = useRef<HTMLFormElement>(null);

  const addNewPost = (data: any) => {
    addPost(data);
    formRef.current?.reset();
  };

  return (
    <div>
      Mutation
      <div>
        <form ref={formRef} onSubmit={handleSubmit(addNewPost)}>
          <FormLabel>title</FormLabel>
          <Input placeholder="enter book title" {...register("title")} />
          <FormLabel>author</FormLabel>
          <Input placeholder="enter author" {...register("author")} />
          <Button type="submit">Add Post</Button>
        </form>
      </div>
    </div>
  );
};

export default Mutation;
