import { z,TypeOf } from "zod";

export const campVaild = z.object({
    Header:z.object({
      authorization:z.string({
        required_error: "authorization is required",
      })
    }),
    body:z.object({
        name:z.string({
          required_error: "name is required",
          invalid_type_error: "name must be a string",
  })
  ,
  date :z.string({
  required_error: "date is required",
  })
  }),
  
  });

  export type campVaild = TypeOf<typeof campVaild>["body"];
