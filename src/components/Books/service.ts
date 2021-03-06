import mongoose from 'mongoose';
import BooksModel from './model';
import { IbookSchema, IbookData } from './interfaces';


class Service {
    private bookModel: mongoose.Model<IbookSchema>;

    constructor(bookModel: mongoose.Model<IbookSchema>) {
        this.bookModel = bookModel;
    }


    /**
 * @async
 * @method getChartData
 * @returns {Promise < void >}  books code3's and their values
 */
    getChartData(): mongoose.Aggregate<IbookData[]> {
        return this.bookModel.aggregate([{

            $group:
            { _id: '$code3', value: { $sum: 1 } },
        },
        {
            $project: {
                _id: 0,
                code3: '$_id',
                value: 1,
            },
        },
        ]);
    }
}
export default new Service(BooksModel);
