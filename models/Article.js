var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    // unique:true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true,
    // unique:true
  },
  imgLink: {
    type: String,
    required: true,
    // unique:true
  },
  // `note` is an object that stores a Note _id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
  //lets add a time stamp
  timestamps: { 
    createdAt: 'created_at' 
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
