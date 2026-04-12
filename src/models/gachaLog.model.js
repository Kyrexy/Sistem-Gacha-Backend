module.exports = (db) =>
  db.model(
    'GachaLog',
    db.Schema(
      {
        userId: { type: String, required: true },
        userName: { type: String, required: true },
        isWin: { type: Boolean, default: false },
        prize: { type: db.Schema.Types.ObjectId, ref: 'Prize', default: null },
        prizeName: { type: String, default: null },
        gachaDate: { type: Date, default: Date.now },
      },
      { timestamps: true }
    )
  );
