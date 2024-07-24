import { Schema, model } from 'mongoose';

const UpvoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Upvote = model('Upvote', UpvoteSchema);
export default Upvote;