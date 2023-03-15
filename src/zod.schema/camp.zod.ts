import { z,TypeOf } from "zod";

export const campVaild = z.object({
    Header:z.object({
      authorization:z.string({
        required_error: "لا يوجد لديك تصريح",
      })
    }),
    body:z.object({
        name:z.string({
          required_error: "يجب ادخال الاسم",
          invalid_type_error: "الاسم يجب ان يكون نص",
  })
  ,
  date :z.string({
  required_error: "يجب ادخال التاريخ",
  })
  }),
  
  });

  export type campVaild = TypeOf<typeof campVaild>["body"];
