import { z,TypeOf } from "zod";

export const projectVaild = z.object({
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
.min(2, { message: " name Must be 2 or more characters long" }),
nameOfCamp :z.string({
        required_error: "name Of Camp is required",
        invalid_type_error: "nameOfCamp must be a String",
})
.min(5, { message: "Must be 5 or more characters long" }),
discription :z.string({
required_error: "discription is required",

})
,

projectURL:z.string({
required_error: "project URL is required",

}),
img:z.string({
  required_error: "img is required",
  
  })
}),

});






export type projectVaild = TypeOf<typeof projectVaild>["body"];
