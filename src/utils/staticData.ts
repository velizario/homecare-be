import path from "path";

export const cleaningCategories = [
    "Гладене",
    "Почистване на печка от вътре",
    "Почистване на хладилник от вътре",
    "Почистване на прозорци",
    "Миене на под",
    "Сгъване на дрехи",
  ]

export default cleaningCategories;


export const IMAGE_PATH = path.join(
  path.resolve(__dirname).split("\\src\\")[0],
  "public"
);