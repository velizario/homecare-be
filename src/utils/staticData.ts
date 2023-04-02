import path from "path";

export const IMAGE_PATH = path.join(path.resolve(__dirname).split("\\src\\")[0], "public");

export const seedServiceTypeData = [
  { id: "1", value: "Почистване на дома" },
  { id: "2", value: "Почистване на офиси и магазини" },
  { id: "3", value: "Основно почистване" },
  { id: "4", value: "Следремонтно чистене" },
  { id: "5", value: "Индустриално обслужване" },
  { id: "6", value: "Пране на мека мебел" },
  { id: "7", value: "Пране на мокети / килими" },
  { id: "8", value: "Почистване на подови настилки" },
  { id: "9", value: "Почистване на прозорци и витрини" },
];

export const seedVisitFrequencyData = [
  { id: "1", value: "Еднократно" },
  { id: "2", value: "Седмично" },
  { id: "3", value: "Двуседмично" },
];

export const seedVisitDayData = [
  { id: "1", value: "Понеделник" },
  { id: "2", value: "Вторник" },
  { id: "3", value: "Сряда" },
  { id: "4", value: "Четвъртък" },
  { id: "5", value: "Петък" },
  { id: "6", value: "Събота" },
  { id: "7", value: "Неделя" },
];

export const seedOrderStatusData = [
  { id: "1", value: "Нова" },
  { id: "2", value: "Активна" },
  { id: "3", value: "Завършена" },
  { id: "4", value: "Анулирана" },
]

export const seedVisitHourData = [
  { id: "1", value: "08:00", daytime: "morning" },
  { id: "2", value: "08:30", daytime: "morning" },
  { id: "3", value: "09:00", daytime: "morning" },
  { id: "4", value: "10:00", daytime: "morning" },
  { id: "5", value: "10:30", daytime: "morning" },
  { id: "6", value: "11:00", daytime: "morning" },
  { id: "7", value: "11:30", daytime: "morning" },
  { id: "8", value: "12:00", daytime: "afternoon" },
  { id: "9", value: "12:30", daytime: "afternoon" },
  { id: "10", value: "13:00", daytime: "afternoon" },
  { id: "11", value: "13:30", daytime: "afternoon" },
  { id: "12", value: "14:00", daytime: "afternoon" },
  { id: "13", value: "14:30", daytime: "afternoon" },
  { id: "14", value: "15:00", daytime: "afternoon" },
  { id: "16", value: "15:30", daytime: "afternoon" },
  { id: "17", value: "16:00", daytime: "afternoon" },
  { id: "18", value: "16:30", daytime: "afternoon" },
  { id: "19", value: "17:00", daytime: "afternoon" },
  { id: "20", value: "17:30", daytime: "afternoon" },
  { id: "21", value: "18:00", daytime: "afternoon" },
];

export const seedEstateSizeData = [
  { id: "1", value: "0" },
  { id: "2", value: "20" },
  { id: "3", value: "40" },
  { id: "4", value: "60" },
  { id: "5", value: "80" },
  { id: "6", value: "100" },
  { id: "7", value: "120" },
  { id: "8", value: "140" },
  { id: "9", value: "160" },
  { id: "10", value: "180" },
  { id: "11", value: "200" },
];

export const seedDistrictNameData = [
  { id: "1", value: "Надежда 1" },
  { id: "2", value: "Дружба" },
  { id: "3", value: "Младост 1" },
  { id: "4", value: "Младост 2" },
  { id: "5", value: "Младост 3" },
  { id: "6", value: "Младост 4" },
  { id: "7", value: "Хладилника" },
  { id: "8", value: "Овча Купел" },
  { id: "9", value: "Витоша" },
  { id: "10", value: "Лозенец" },
  { id: "11", value: "Център" },
  { id: "12", value: "Бояна" },
  { id: "13", value: "Надежда 2" },
  { id: "14", value: "Надежда 3" },
  { id: "15", value: "Надежда 4" },
];
