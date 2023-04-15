import { z,TypeOf } from "zod";
import {fromZodError} from "zod-validation-error"

export const userVaild = z.object({
    body:z.object({
        name:z.string({ 
            required_error: "يجب ادخال الاسم",
            invalid_type_error: "الاسم يجب ان يكون نص",
            
    }).min(5,{ message: "يجب ان تكون احرف او ارقام" }),

        password :z.string({
            required_error: "يجب ادخال كلمة السر",
            invalid_type_error: "يجب ان تكون كلمة السر احرف و ارقام",
    })
  .min(5, { message: "يجب ان تكون كلمة السر اكثر من 5 احرف او ارقام" }),
  email :z.string({
    required_error: "يجب عليك ادخال البريد الالكتروني",
    
})
,

role:z.string({
  required_error: "role is required",
  invalid_type_error: "role must be a User or Admin or Company ",
})
}),
});



export const userlogin = z.object({
    body:z.object({
        password :z.string({
          required_error: "يجب ادخال كلمة السر",
          invalid_type_error: "يجب ان تكون كلمة السر احرف و ارقام",
    })
    .min(5, { message: "يجب ان تكون كلمة السر اكثر من 5 احرف او ارقام" }),
  


  email :z.string({
    required_error: "يجب عليك ادخال البريد الالكتروني",
    
})
// .email({ message: "Invalid email address" })
}),
});



export type userlogin = TypeOf<typeof userlogin>["body"];
export type userVaild = TypeOf<typeof userVaild>["body"];

