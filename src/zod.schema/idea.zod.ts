import { z,TypeOf } from "zod";

export const ideatVaild = z.object({
    Header:z.object({
      authorization:z.string({
        required_error: "authorization is required",
      })
    }),
    body:z.object({
      title:z.string({
          required_error: " يجب ادخال عنوان للفكرة ",
          invalid_type_error: "  يجب ان تكون الفكرة احرف",
  })
  ,
  discription :z.string({
    required_error:"يجب ادخال وصف المشروع",
    
    })
  }),
  
  });

  export type ideatVaild = TypeOf<typeof ideatVaild>["body"];
