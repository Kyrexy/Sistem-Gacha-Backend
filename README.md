# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Tugas-EndpointGacha-535250142

## API Endpoint

### 1. `POST /api/gacha` — Lakukan Gacha

Endpoint utama untuk melakukan satu kali gacha. User hanya bisa melakukan gacha maksimal **5 kali per hari**

**Contoh Request:**

```json
{
  "userId": "user123",
  "userName": "Jane Doe"
}
```

**Response Sukses (Menang):**

```json
{
  "status": "success",
  "data": {
    "statusMenang": true,
    "message": "Selamat! Kamu memenangkan Pulsa Rp50.000!",
    "prize": "Pulsa Rp50.000",
    "gachaCount": 2,
    "remainingToday": 3
  }
}
```

**Response Sukses (Tidak Menang):**

```json
{
  "status": "success",
  "data": {
    "statusMenang": false,
    "message": "Maaf, kamu tidak memenangkan hadiah. Coba lagi!",
    "prize": null,
    "gachaCount": 1,
    "remainingToday": 4
  }
}
```

**Response Error (Melewati Batas Harian):**

```json
{
  "status": "error",
  "message": "Batas maksimal gacha hari ini (5 kali) telah tercapai."
}
```

HTTP Status: `429 Too Many Requests`

---

### 2. `GET /api/gacha/history/:userId` — Riwayat Gacha User

Menampilkan histori semua gacha yang pernah dilakukan oleh user beserta hadiah yang dimenangkan

**Contoh Request:**

```
GET /api/gacha/history/user123
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "userId": "user123",
    "totalGacha": 3,
    "history": [
      {
        "gachaDate": "2025-04-12T08:30:00.000Z",
        "statusMenang": true,
        "prize": "Pulsa Rp50.000"
      },
      {
        "gachaDate": "2025-04-12T08:25:00.000Z",
        "statusMenang": false,
        "prize": null
      },
      {
        "gachaDate": "2025-04-11T10:00:00.000Z",
        "statusMenang": false,
        "prize": null
      }
    ]
  }
}
```

---

### 3. `GET /api/gacha/prizes` — Daftar Hadiah & Sisa Kuota

Menampilkan daftar semua hadiah beserta kuota pemenang yang tersisa untuk setiap hadiah.

**Contoh Request:**

```
GET /api/gacha/prizes
```

**Response:**

```json
{
  "status": "success",
  "data": [
    {
      "name": "Emas 10 gram",
      "Kuota": 1,
      "sisaKuota": 1,
      "claimed": 0
    },
    {
      "name": "Smartphone X",
      "Kuota": 5,
      "sisaKuota": 4,
      "claimed": 1
    },
    {
      "name": "Smartwatch Y",
      "Kuota": 10,
      "sisaKuota": 10,
      "claimed": 0
    },
    {
      "name": "Voucher Rp100.000",
      "Kuota": 100,
      "sisaKuota": 98,
      "claimed": 2
    },
    {
      "name": "Pulsa Rp50.000",
      "Kuota": 500,
      "sisaKuota": 495,
      "claimed": 5
    }
  ]
}
```

---

### 4. `GET /api/gacha/winners/:prizeName` — Daftar Pemenang Per Hadiah

Menampilkan daftar user yang berhasil memenangkan hadiah sesuai id hadiah yang dimasukkan,nama user disamarkan

- Pola 1: `J*** Doe` (huruf pertama + bintang, nama akhir utuh)
- Pola 2: `J*** D*e` (huruf pertama & terakhir tiap kata tetap, tengah disamarkan)

**Contoh Request:**

```
GET /api/gacha/winners/Pulsa%20Rp50.000
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "prize": "Pulsa Rp50.000",
    "totalWinners": 2,
    "Kuota": 500,
    "winners": [
      {
        "userName": "J*** Doe",
        "gachaDate": "2025-04-12T08:30:00.000Z"
      },
      {
        "userName": "J*** D*e",
        "gachaDate": "2025-04-11T15:20:00.000Z"
      }
    ]
  }
}
```

**Response Error (Hadiah tidak ditemukan):**

```json
{
  "status": "error",
  "message": "Hadiah tidak ditemukan."
}
```

---
