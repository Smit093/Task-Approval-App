// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },

    description: {
      type: String,
      required: true,
      minlength: 10,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: null,
    },

    isLocked: {
      type: Boolean,
      default: false, // true once approved or rejected
    },
  },
  { timestamps: true }
);

// Guard: prevent editing after locked
taskSchema.pre("save", function () {
  console.log("Pre-save hook called");
  console.log("isModified(status):", this.isModified("status"));
  console.log("status:", this.status);
  try {
    if (this.isModified("status")) {
      if (this.status === "approved" || this.status === "rejected") {
        this.isLocked = true;
      }
    }
  } catch (err) {
    console.error("Error in pre-save hook:", err);
  }
});


// Indexes for faster queries
taskSchema.index({ createdBy: 1, status: 1 });
taskSchema.index({ status: 1 });

export default mongoose.model("Task", taskSchema);
