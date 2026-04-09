// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     date: {
//       type: String, // "2026-01-24"
//       required: true,
//     },


//     slot: {
//       type: String, // "10:00 AM"
//       required: true,
//     },

//     // startTime: {
//     //   type: Number, // minutes from midnight (example: 6:00 = 360)
//     //   required: true
//     // },

//     // endTime: {
//     //   type: Number, // example: 8:00 = 480
//     //   required: true
//     // },



//     duration: {
//       type: Number, // hours
//       required: true,
//     },

//     courtType: {
//       type: String, // 5v5 / 7v7
//       required: true,
//     },

//     amount: {
//       type: Number,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["PENDING", "CONFIRMED", "CANCELLED"],
//       default: "PENDING",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["PENDING", "PAID", "FAILED"],
//       default: "PENDING",
//     },

    

//     // 🏏 Sport & Extras
//     sport: {
//       type: String,
//       enum: ["Football", "Cricket"],
//     },

//     umpire: {
//       type: Boolean,
//       default: false,
//     },

//     scorecard: {
//       type: Boolean,
//       default: false,
//     },

//     // 👤 Customer details
//     customer: {
//       name: String,
//       email: String,
//       phone: String,
//     },

//     // 💵 Final payable amount
//     finalAmount: {
//       type: Number,
//     },



//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Booking", bookingSchema);


// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       //required: true,
//       required: false,
//     },

    

//     date: {
//       type: String, // "2026-01-24"
//       required: true,
//     },

//     slot: {
//       type: String, // "10:00 AM - 11:00 AM"
//       required: true,
//     },

//     duration: {
//       type: Number, // hours
//       required: true,
//     },

//     courtType: {
//       type: String, // 5v5 / 7v7
//       required: true,
//     },

//     amount: {
//       type: Number,
//       required: true,
//     },

//     // 🔐 BOOKING STATUS (UPDATED)
//     status: {
//       type: String,
//       enum: ["LOCKED", "CONFIRMED", "CANCELLED"],
//       default: "LOCKED",
//     },

//     // 💳 PAYMENT STATUS
//     paymentStatus: {
//       type: String,
//       enum: ["PENDING", "PAID", "FAILED"],
//       default: "PENDING",
//     },

//     // ⏳ SLOT LOCK EXPIRY (NEW)
//     lockExpiresAt: {
//       type: Date,
//       //required: true,
//       // JUST TEMPRORY CHANGE 
//       default: null,
//     },

//     // 🏏 Sport & Extras
//     sport: {
//       type: String,
//       enum: ["Football", "Cricket"],
//     },

//     umpire: {
//       type: Boolean,
//       default: false,
//     },

//     scorecard: {
//       type: Boolean,
//       default: false,
//     },

//     // 👤 Customer details
//     customer: {
//       name: String,
//       email: String,
//       phone: String,
//     },

//     // 💵 Final payable amount
//     finalAmount: {
//       type: Number,
//     },

//     // TICKET GENERATION
//     ticketPath: {
//       type: String
//     },

//   },
//   { timestamps: true }
// );


// module.exports = mongoose.model("Booking", bookingSchema);











const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //required: true,
      required: false,
    },

    

    date: {
      type: String, // "2026-01-24"
      required: true,
    },

    slot: {
      type: String, // "10:00 AM - 11:00 AM"
      required: true,
    },

    duration: {
      type: Number, // hours
      required: true,
    },

    courtType: {
      type: String, // 5v5 / 7v7
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // 🔐 BOOKING STATUS (UPDATED)
    status: {
      type: String,
      enum: ["LOCKED", "CONFIRMED", "CANCELLED"],
      default: "LOCKED",
    },

    // 💳 PAYMENT STATUS
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    // ⏳ SLOT LOCK EXPIRY (NEW)
    lockExpiresAt: {
      type: Date,
      //required: true,
      // JUST TEMPRORY CHANGE 
      default: null,
    },

    // 🏏 Sport & Extras
    sport: {
      type: String,
      enum: ["Football", "Cricket"],
    },

    umpire: {
      type: Boolean,
      default: false,
    },

    scorecard: {
      type: Boolean,
      default: false,
    },

    // 👤 Customer details
    customer: {
      name: String,
      email: String,
      phone: String,
    },

    // 💵 Final payable amount
    finalAmount: {
      type: Number,
    },

    // TICKET GENERATION
    ticketPath: {
      type: String
    },

    paidAmount:{
      type:Number,
    },

    bookingType: {
      type: String,
      enum: ["ONLINE", "OFFLINE", "BLOCK"],
      required: true,
    },

    // CHECKED-IN 
    checkedIn: {
      type: Boolean,
      default: false,
    },
    entryTime: {
      type: Date,
      default: null,
    }
    
  },
  { timestamps: true }
);


module.exports = mongoose.model("Booking", bookingSchema);

