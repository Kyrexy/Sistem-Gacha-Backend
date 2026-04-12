module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema(
      {
        name: { type: String, required: true },
        quota: { type: Number, required: true },
        remainingQuota: { type: Number, required: true },
      },
      { timestamps: true }
    )
  );
