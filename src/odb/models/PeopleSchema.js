// // https://gist.github.com/KelvinCampelo/254924241ce8156f86e38d5fdfdd572c

// import mongoose, { Schema } from 'mongoose';

// const peopleSchema = new Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     lastName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     birthday: {
//       type: Date
//     },
//     activated: {
//       type: Boolean,
//       default: true
//     }
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//       transform: (obj, ret) => {
//         delete ret._id;
//         delete ret.__v;
//       }
//     }
//   }
// );

// peopleSchema.methods = {
//   view(full) {
//     const view = {
//       id: this.id,
//       fullName: `${this.firstName} ${this.lastName}`,
//       age: this.age
//     };

//     return full
//       ? {
//           ...view,
//           birthday: this.birthday,
//           activated: this.activated,
//           createdAt: this.createdAt,
//           updatedAt: this.updatedAt
//         }
//       : view;
//   }
// };

// peopleSchema.virtual('age').get(function() {
//   var birthday = +new Date(this.birthday);
//   return ~~((Date.now() - birthday) / 31557600000);
// });

// const model = mongoose.model('People', peopleSchema);

// export const schema = model.schema;
// export default model;