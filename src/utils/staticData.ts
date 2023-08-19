import path from "path";
import { ORDER_STATUS } from "../entity/Entities";

export const IMAGE_PATH = path.join(path.resolve(__dirname).split("\\src\\")[0], "public");

export const seedServiceTypeData = [
  {
    id: 1,
    value: "Почистване на дома",
    description: "Почистване на гъз, глава, и тем подобни",
    imgUrl: "https://topmopscleaning.com/wp-content/uploads/2021/04/keeping-a-house-clean.jpeg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 2,
    value: "Почистване на офиси и магазини",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://nswcommercialcleaning.com.au/wp-content/uploads/2018/04/iStock-609094288.jpg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 3,
    value: "Основно почистване",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://cdn-ffokf.nitrocdn.com/LFtvDxXrnvtNThwjbFdxUfsgQYSGUhUB/assets/images/optimized/rev-37403d5/wp-content/uploads/2023/03/house-dusting.png",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 4,
    value: "Следремонтно чистене",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://prohousekeepers.com/wp-content/uploads/2019/05/post-construction-cleanup.jpg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 5,
    value: "Индустриално обслужване",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://www.service-techcorp.com/hs-fs/hubfs/Industrial_Cleaning.jpeg?width=863&name=Industrial_Cleaning.jpeg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 6,
    value: "Пране на мека мебел",
    description: "Почистване на фотьойли и изхвърляне на котки",
    imgUrl: "https://media.angi.com/s3fs-public/Man-professionally-cleaning-couch.jpg?impolicy=leadImage",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 7,
    value: "Пране на мокети / килими",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://aadvancedcarpetcleaning.com/wp-content/uploads/2021/07/carpet-cleaners.jpg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 8,
    value: "Почистване на подови настилки",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://www.webstaurantstore.com/images/products/large/573058/2253417.jpg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 4, value: "Миене на хладилник" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 2, value: "Миене на прозорци" },
    // ]
  },
  {
    id: 9,
    value: "Почистване на прозорци и витрини",
    description: "Рязане на кабели и промиване с чист спирт",
    imgUrl: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/05/featured-image-window-cleaning.jpeg.jpg",
    // additionalServices: [
    //   { id: 1, value: "Миене на печка" },
    //   { id: 2, value: "Миене на прозорци" },
    //   { id: 3, value: "Миене на тераса" },
    //   { id: 4, value: "Миене на хладилник" },
    // ]
  },
];
export const seedDistrictNameData = [
  { id: 1, value: "Надежда 1" },
  { id: 2, value: "Дружба" },
  { id: 3, value: "Младост 1" },
  { id: 4, value: "Младост 2" },
  { id: 5, value: "Младост 3" },
  { id: 6, value: "Младост 4" },
  { id: 7, value: "Хладилника" },
  { id: 8, value: "Овча Купел" },
  { id: 9, value: "Витоша" },
  { id: 10, value: "Лозенец" },
  { id: 11, value: "Център" },
  { id: 12, value: "Бояна" },
  { id: 13, value: "Надежда 2" },
  { id: 14, value: "Надежда 3" },
  { id: 15, value: "Надежда 4" },
];


export const seedVisitFrequencyData = [
  { id: 1, value: "Еднократно" },
  { id: 2, value: "Седмично" },
  { id: 3, value: "Двуседмично" },
];

export const seedWeekDayData = [
  { id: 1, value: "Понеделник" },
  { id: 2, value: "Вторник" },
  { id: 3, value: "Сряда" },
  { id: 4, value: "Четвъртък" },
  { id: 5, value: "Петък" },
  { id: 6, value: "Събота" },
  { id: 7, value: "Неделя" },
];

export const seedOrderStatusData = [
  { id: ORDER_STATUS.NEW, value: "Нова" },
  { id: ORDER_STATUS.OFFER, value: "Оферта" },
  { id: ORDER_STATUS.RESERVATION, value: "Резервация" },
  { id: ORDER_STATUS.ACTIVE, value: "Активна" },
  { id: ORDER_STATUS.CANCELLED, value: "Анулирана" },
  { id: ORDER_STATUS.COMPLETE, value: "Завършена" },
  { id: ORDER_STATUS.PASSED, value: "Изминала" },
]

export const seedHourDayData = [
  { id: 1, value: "08:00", daytime: "morning" },
  { id: 2, value: "08:30", daytime: "morning" },
  { id: 3, value: "09:00", daytime: "morning" },
  { id: 4, value: "10:00", daytime: "morning" },
  { id: 5, value: "10:30", daytime: "morning" },
  { id: 6, value: "11:00", daytime: "morning" },
  { id: 7, value: "11:30", daytime: "morning" },
  { id: 8, value: "12:00", daytime: "afternoon" },
  { id: 9, value: "12:30", daytime: "afternoon" },
  { id: 10, value: "13:00", daytime: "afternoon" },
  { id: 11, value: "13:30", daytime: "afternoon" },
  { id: 12, value: "14:00", daytime: "afternoon" },
  { id: 13, value: "14:30", daytime: "afternoon" },
  { id: 14, value: "15:00", daytime: "afternoon" },
  { id: 16, value: "15:30", daytime: "afternoon" },
  { id: 17, value: "16:00", daytime: "afternoon" },
  { id: 18, value: "16:30", daytime: "afternoon" },
  { id: 19, value: "17:00", daytime: "afternoon" },
  { id: 20, value: "17:30", daytime: "afternoon" },
  { id: 21, value: "18:00", daytime: "afternoon" },
];


// if changed here, needs to be changed on the FE too
export const seedEstateSizeData = [
  { id: 1, value: "0" },
  { id: 2, value: "10" },
  { id: 3, value: "20" },
  { id: 4, value: "30" },
  { id: 5, value: "40" },
  { id: 6, value: "50" },
  { id: 7, value: "60" },
  { id: 8, value: "70" },
  { id: 9, value: "80" },
  { id: 10, value: "90" },
  { id: 11, value: "100" },
  { id: 12, value: "110" },
  { id: 13, value: "120" },
  { id: 14, value: "130" },
  { id: 15, value: "140" },
  { id: 16, value: "150" },
  { id: 17, value: "160" },
  { id: 18, value: "170" },
  { id: 19, value: "180" },
  { id: 20, value: "190" },
  { id: 21, value: "200" },
];