import { z,TypeOf } from "zod";

export const projectVaild = z.object({
  Header:z.object({
    authorization:z.string({
      required_error: "لا يوجد لديك تصريح",
    })
  }),
  body:z.object({
    title:z.string({
        required_error: "ادخل عنوان المشروع",
        invalid_type_error: "يجب ادخال عنوان المشروع ",
})
.min(2, { message: " يجب ان يكون اكثر من 2 احرف" }),
nameOfCamp :z.string({
        required_error: "يجب ادخال اسم المعسكر",
        invalid_type_error: "اسم المعسكر يجب ان يكون احرف",
})
.min(5, { message: "يجب ان يكون اكثر من 5 احرف" }),
discription :z.string({
required_error:"يجب ادخال وصف المشروع",

})
,

projectURL:z.string({
required_error: "يجب ادخال اسم رابط الشمروع",

}),
img:z.string({
  required_error: "يجب ادخال صور للمشروع",
  
  })
}),

});






export type projectVaild = TypeOf<typeof projectVaild>["body"];
