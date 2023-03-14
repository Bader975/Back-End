import { z,TypeOf } from "zod";

export const ideatVaild = z.object({
    Header:z.object({
      authorization:z.string({
        required_error: "authorization is required",
      })
    }),
    body:z.object({
      title:z.string({
          required_error: "title is required",
          invalid_type_error: "title must be a string",
  })
  ,
  discription :z.string({
  required_error: "discription is required",
  })
  }),
  
  });

  export type ideatVaild = TypeOf<typeof ideatVaild>["body"];
