import path from "path";

export const cleaningCategories = [
  "Гладене",
  "Почистване на печка от вътре",
  "Почистване на хладилник от вътре",
  "Почистване на прозорци",
  "Миене на под",
  "Сгъване на дрехи",
];

export default cleaningCategories;

export const IMAGE_PATH = path.join(path.resolve(__dirname).split("\\src\\")[0], "public");

export const servicesSeedData = [
  { id: "1", serviceName: "Почистване на дома" },
  { id: "2", serviceName: "Почистване на офиси и магазини" },
  { id: "3", serviceName: "Основно почистване" },
  { id: "4", serviceName: "Следремонтно чистене" },
  { id: "5", serviceName: "Индустриално обслужване" },
  { id: "6", serviceName: "Пране на мека мебел" },
  { id: "7", serviceName: "Пране на мокети / килими" },
  { id: "8", serviceName: "Почистване на подови настилки" },
  { id: "9", serviceName: "Почистване на прозорци и витрини" },
];

