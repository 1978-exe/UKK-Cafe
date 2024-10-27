---

# Sistem Kasir - Database Schema

Proyek ini adalah implementasi sistem kasir sederhana yang memungkinkan pengguna untuk mengelola transaksi, pesanan, item menu, meja, dan data pengguna. Sistem ini didasarkan pada skema database yang terdiri dari beberapa model inti dengan relasi yang terdefinisi.

## Model-Model Utama

### 1. User
Model ini menyimpan data pengguna, termasuk kasir, manajer, dan admin.

- **id** (Int): Primary key, ID unik untuk setiap pengguna.
- **name** (String): Nama pengguna.
- **email** (String): Email pengguna, harus unik.
- **password** (String): Kata sandi pengguna.
- **role** (Enum: `Role`): Peran pengguna dalam sistem (ADMIN, KASIR, atau MANAJER).

**Relasi**:  
- Satu pengguna (kasir) dapat memiliki banyak transaksi.

### 2. Transaction
Model ini menyimpan informasi transaksi pelanggan, termasuk total, status pembayaran, dan item yang dipesan.

- **id** (Int): Primary key, ID unik untuk setiap transaksi.
- **customerName** (String): Nama pelanggan yang terlibat dalam transaksi.
- **tableNumber** (Int): Nomor meja yang digunakan oleh pelanggan.
- **totalAmount** (Float): Total nominal dari pesanan.
- **cashierId** (Int): ID kasir yang menangani transaksi.
- **status** (Enum: `TransactionStatus`): Status transaksi (PAID atau UNPAID).
- **createdAt** (DateTime): Tanggal dan waktu transaksi dibuat.

**Relasi**:  
- Setiap transaksi berhubungan dengan satu kasir (`User`).
- Setiap transaksi dapat mencakup beberapa item pesanan (`OrderItem`).
- Setiap transaksi berhubungan dengan satu meja (`Table`).

### 3. OrderItem
Model ini menyimpan data item yang dipesan dalam setiap transaksi, seperti jumlah dan ID item menu.

- **id** (Int): Primary key, ID unik untuk setiap item pesanan.
- **menuItemId** (Int): ID item menu yang dipesan.
- **transactionId** (Int): ID transaksi terkait.
- **quantity** (Int): Jumlah item menu yang dipesan.

**Relasi**:  
- Setiap item pesanan terhubung ke satu transaksi (`Transaction`).
- Setiap item pesanan terkait dengan satu item menu (`MenuItem`).

### 4. MenuItem
Model ini menyimpan data item menu yang tersedia, seperti harga, kategori, dan ketersediaan.

- **id** (Int): Primary key, ID unik untuk setiap item menu.
- **name** (String): Nama item menu.
- **price** (Float): Harga per item.
- **category** (Enum: `Category`): Kategori item menu (MAKANAN atau MINUMAN).
- **available** (Boolean): Status ketersediaan item (default: true).
- **image** (String): URL atau path ke gambar item.

**Relasi**:  
- Setiap item menu dapat dipesan di beberapa item pesanan (`OrderItem`).

### 5. Table
Model ini menyimpan data meja di kafe atau restoran, termasuk nomor dan ketersediaannya.

- **id** (Int): Primary key, ID unik untuk setiap meja.
- **number** (Int): Nomor meja, harus unik.
- **isAvailable** (Boolean): Status ketersediaan meja.

**Relasi**:  
- Setiap meja dapat memiliki beberapa transaksi (`Transaction`).

## Enum

### Role
Enum ini mendefinisikan peran pengguna dalam sistem:
- **ADMIN**
- **KASIR**
- **MANAJER**

### Category
Enum ini mendefinisikan kategori item menu:
- **MAKANAN**
- **MINUMAN**

### TransactionStatus
Enum ini mendefinisikan status pembayaran transaksi:
- **PAID**
- **UNPAID**

## Relasi Antar Model

- **User ↔ Transaction**: Satu pengguna (kasir) dapat menangani beberapa transaksi.
- **Transaction ↔ Table**: Satu transaksi terkait dengan satu meja.
- **Transaction ↔ OrderItem**: Satu transaksi dapat mencakup banyak item pesanan.
- **OrderItem ↔ MenuItem**: Satu item pesanan terkait dengan satu item menu.

---

## Instalasi

1. **Clone Repository**  
   `git clone <URL Repository>`

2. **Instal Dependensi**  
   `npm install`

3. **Konfigurasi Environment**  
   Atur file `.env` dengan URL database Anda:

   ```plaintext
   DATABASE_URL="mysql://user:password@localhost:3306/database_name"
   ```

4. **Generate Prisma Client**  
   `npx prisma generate`

5. **Migrasi Database**  
   `npx prisma migrate dev --name init`

## Menjalankan Aplikasi

Gunakan perintah berikut untuk menjalankan server:

```bash
npm start
```

## API Utama

- **POST /transaction**: Membuat transaksi baru.
- **GET /transactions**: Mengambil daftar semua transaksi.
- **PUT /transaction/:id**: Memperbarui transaksi yang sudah ada.
- **DELETE /transaction/:id**: Menghapus transaksi berdasarkan ID.

---
