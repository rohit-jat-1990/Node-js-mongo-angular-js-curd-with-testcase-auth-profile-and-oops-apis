const mongoose = require('mongoose')
const CONSTANTS = require('../../Config/app.constants')
/**
 * @schema PostSchema
 * @description mongoose define the database schema of mongoDB
 */
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true,CONSTANTS.MESSAGES.REQUIRED],
      trim:true
    },
    post_original_image:{
      type:Buffer
    },
    post_thumbnail:{
      type:Buffer
    },
    description: {
      type: String,
      required: [true,CONSTANTS.MESSAGES.REQUIRED],
      default: null,
      trim:true
    },
    status: {
      type: Boolean,
      required: true,
      default: true
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
  },
  { timestamps: true }
)
PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema)