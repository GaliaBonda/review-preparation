import { Schema, model, models } from "mongoose";

const GitInstallationIdSchema = new Schema({
  gitInstallationId: {
    type: String,
    required: [true, "Installation id is required"],
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const GitInstallationId = models.Question || model("Question", GitInstallationIdSchema);

export default GitInstallationId;
