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
    "userName":"Giorno Giovanna",
    "userId":"12345678"
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

---

### 2. `GET /api/gacha/history/:userId` — Riwayat Gacha User

Menampilkan histori semua gacha yang pernah dilakukan oleh user beserta hadiah yang dimenangkan

**Contoh Request:**

```
GET api/gacha/history/userId
```

**Response:**

```json
{
	"status": "success",
	"data": {
		"userId": "12345678",
		"totalGacha": 5,
		"history": [
			{
				"gachaDate": "2026-04-17T15:20:49.393Z",
				"statusMenang": false,
				"prize": null
			},
			{
				"gachaDate": "2026-04-17T15:20:45.381Z",
				"statusMenang": false,
				"prize": null
			},
			{
				"gachaDate": "2026-04-17T15:20:40.433Z",
				"statusMenang": true,
				"prize": "Voucher Rp100.000"
			},
			{
				"gachaDate": "2026-04-17T15:20:36.892Z",
				"statusMenang": false,
				"prize": null
			},
			{
				"gachaDate": "2026-04-17T15:19:54.950Z",
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
GET /api/gacha/prizes/prizes
```

**Response:**

```json
{{
	"status": "success",
	"data": [
		{
			"_id": "69e0457f8c3e232efe3fcb28",
			"name": "Emas 10 gram",
			"Kuota": 1,
			"sisaKuota": 1,
			"__v": 0
		},
		{
			"_id": "69e0457f8c3e232efe3fcb29",
			"name": "Smartphone X",
			"Kuota": 5,
			"sisaKuota": 5,
			"__v": 0
		},
		{
			"_id": "69e0457f8c3e232efe3fcb2a",
			"name": "Smartwatch Y",
			"Kuota": 10,
			"sisaKuota": 10,
			"__v": 0
		},
		{
			"_id": "69e0457f8c3e232efe3fcb2b",
			"name": "Voucher Rp100.000",
			"Kuota": 100,
			"sisaKuota": 100,
			"__v": 0
		},
		{
			"_id": "69e0457f8c3e232efe3fcb2c",
			"name": "Pulsa Rp50.000",
			"Kuota": 500,
			"sisaKuota": 500,
			"__v": 0
		}
	]
}
```

---

### 4. `GET /api/gacha/winners/prizeId` — Daftar Pemenang Per Hadiah

Menampilkan daftar user yang berhasil memenangkan hadiah sesuai id hadiah yang dimasukkan,nama user disamarkan

**Contoh Request:**

```
GET /api/gacha/winners/prizeId
```

**Response:**

```json
{
	"status": "success",
	"data": [
		{
			"_id": "69e252d413e6f844a84a8685",
			"userId": "123456789",
			"userName": "G****o G******a",
			"statusMenang": true,
			"prize": "69e0457f8c3e232efe3fcb2a",
			"prizeName": "Smartwatch Y",
			"gachaDate": "2026-04-17T15:33:40.683Z",
			"__v": 0
		}
	]
}
```

---
