import "./App.css";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  Select,
  FormLabel,
  useToast,
  Box,
} from "@chakra-ui/react";
import { z, ZodError } from "zod";
import axios from "axios";
import Query from "./components/Query";
import Mutation from "./components/Mutation";
import Transform from "./components/Transform";

// zod schema
const userInput = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email({ message: "invalid email address" }),
    from: z.string().transform((x) => new Date(x)),
    to: z.string().transform((x) => new Date(x)),
    position: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.to > data.from, {
    message: "End date should be greater than start date",
    path: ["to"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password should match",
    path: ["confirmPassword"],
  });

const options = [
  "Junior Software Developer",
  "Software Developer",
  "Senior Developer",
  "Lead Software Developer",
  "Principle Developer",
];

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const submit = async <T extends object>(data: T) => {
    try {
      const userData = userInput.parse(data);
      console.log(userData);
      // toast({
      //   position: "top-left",
      //   render: () => (
      //     <Box color="white" p={3} bg="blue.500">
      //       Hello World
      //     </Box>
      //   ),
      // });
      toast({
        title: "submitted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return await axios.post(`http://localhost:8001/todos`, userData);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log({
          sucess: false,
          errors: error.flatten().fieldErrors,
        });
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="App">
      <h1 className="text-3xl text-blue-400 mb-10">
        React Hook Form and Zod Practice
      </h1>

      <div>
        <form onSubmit={handleSubmit(submit)}>
          <>
            <FormLabel htmlFor="firstname">First Name</FormLabel>
            <Input
              id="firstname"
              {...register("firstname", {
                required: "Please enter a valid firstname",
              })}
            />
            {errors?.firstname?.message}
            <FormLabel htmlFor="lastname">Last Name</FormLabel>

            <Input id="lastname" {...register("lastname")} />
            <FormLabel htmlFor="email">Email</FormLabel>

            <Input
              id="email"
              {...register("email", { required: "Please enter a valid email" })}
            />
            {errors?.email?.message}
            <FormLabel htmlFor="from">From Date:</FormLabel>

            <Input id="from" {...register("from")} type="date" />
            <FormLabel>To Date:</FormLabel>

            <Input {...register("to")} type="date" />
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              {...register("password", {
                required: "Must be at least 5 characters",
              })}
              placeholder="Please enter password!"
            />
            {errors?.password?.message}
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm password!",
              })}
              placeholder="Please confirm password"
            />
            {errors?.confirmPassword?.message}
            <FormLabel>Title</FormLabel>
            <Select {...register("position")}>
              {options?.map((value, i) => {
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              })}
            </Select>
            <Button type="submit">Submit</Button>
          </>
        </form>
      </div>
      <div className="text-3xl text-blue-400 mt-10">
        <h2> Tanstack React Query v4 Practice</h2>
        <Query />
        <Mutation />
        <Transform />
      </div>
    </div>
  );
}

export default App;
