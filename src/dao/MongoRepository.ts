export interface Repository {}

// export interface Repository<T> {
//   add(document: T): Promise<HydratedDocument<T>>;
//   edit(id: string, document: UpdateQuery<T>): Promise<HydratedDocument<T> | null>;
//   deleteById(id: string): Promise<HydratedDocument<T> | null>;
//   findByQuery(reqObj: Record<string, string>): Promise<HydratedDocument<T>[]>;
//   findUserById(id: string): Promise<T | null>;
//   // getCount(): Promise<number>;
// }

// export class MongoRepository<T> implements Repository<T> {
//   constructor(public model: Model<T>) {}

//   async add(document: T) {
//     const newDoc = await this.model.create(document);
//     return newDoc;
//   }
//   // if edit is not working correctly, remove back 'UpdateQuery and replace findUserByIdAndUpdate with findOneAndReplace

//   async edit(id: string, document: UpdateQuery<T>) {
//     const updatedDoc = await this.model.findUserByIdAndUpdate(id, document, {
//       new: true,
//       runValidators: true,
//     });
//     return updatedDoc;
//   }

//   async deleteById(id: string) {
//     return await this.model.findUserByIdAndDelete(id);
//   }

//   async findByQuery(reqObj: Record<string, string>) {

//     // Build query
//     // 1) Remove special conditions. Not mandatory in latest version?
//     const { page, sort, limit, fields, ...queryObj } = {
//       ...reqObj,
//     } as Record<string, string>;

//     // 2) Finding
//     // fix searches for queries, containing gte|gt|lte|lt (adds to the search string $ in front of these conditions)
//     let queryStr = JSON.stringify(queryObj);
//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     let query = this.model.find(JSON.parse(queryStr));

//     // 3) Sorting
//     if (reqObj.sort) {
//       const sortBy = (reqObj.sort as string).replace(",", " ").concat(" _id");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("firstName _id");
//     }

//     // 4) Field Limiting
//     if (reqObj.fields) {
//       const fields = (reqObj.fields as string).replace(",", " ");
//       query = query.select(fields);
//     } else {
//       query.select("-__v");
//     }

//     // 5) Pagination
//     if (reqObj.page && reqObj.limit) {
//       const page = Number(reqObj.page) || 1;
//       const limit = Number(reqObj.limit) || 100;
//       const skip = (page - 1) * limit;
//       query = query.skip(skip).limit(limit);

//       const numDocs = await this.model.countDocuments();
//       if (skip >= numDocs) throw new Error("This page does not exist");
//     }

//     // execute query
//     const data = await query;
//     return data;
//   }

//   async findUserById(id: string): Promise<T | null> {
//     const data: T = await this.model.findUserById(id).lean();
//     return data;
//   }

//   // async getCount(): Promise<number> {
//   //   throw new Error("Method not implemented.");
//   // }
// }
