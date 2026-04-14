module.exports = (db) =>
  db.model(
    'Prize',
    db.Schema({
      name: { type: String, required: true },
      Kuota: { type: Number, required: true },
      sisaKuota: { type: Number, required: true },
    })
  );
