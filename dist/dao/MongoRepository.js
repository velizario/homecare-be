export class MongoRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async add(document) {
        const newDoc = await this.model.create(document);
        return newDoc;
    }
    // if edit is not working correctly, remove back 'UpdateQuery and replace findByIdAndUpdate with findOneAndReplace
    async edit(id, document) {
        const updatedDoc = await this.model.findByIdAndUpdate(id, document, {
            new: true,
            runValidators: true,
        });
        return updatedDoc;
    }
    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }
    async findByQuery(reqObj) {
        // Build query
        // 1) Remove special conditions. Not mandatory in latest version?
        const { page, sort, limit, fields, ...queryObj } = {
            ...reqObj,
        };
        // 2) Finding
        // fix searches for queries, containing gte|gt|lte|lt (adds to the search string $ in front of these conditions)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = this.model.find(JSON.parse(queryStr));
        // 3) Sorting
        if (reqObj.sort) {
            const sortBy = reqObj.sort.replace(",", " ").concat(" _id");
            query = query.sort(sortBy);
        }
        else {
            query = query.sort("firstName _id");
        }
        // 4) Field Limiting
        if (reqObj.fields) {
            const fields = reqObj.fields.replace(",", " ");
            query = query.select(fields);
        }
        else {
            query.select("-__v");
        }
        // 5) Pagination
        if (reqObj.page && reqObj.limit) {
            const page = Number(reqObj.page) || 1;
            const limit = Number(reqObj.limit) || 100;
            const skip = (page - 1) * limit;
            query = query.skip(skip).limit(limit);
            const numDocs = await this.model.countDocuments();
            if (skip >= numDocs)
                throw new Error("This page does not exist");
        }
        // execute query
        const data = await query;
        return data;
    }
    async findById(id) {
        const data = await this.model.findById(id).lean();
        return data;
    }
}
