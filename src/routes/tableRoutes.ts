import { Router } from 'express';
import {
    getTables,
    createTable,
    updateTable,
    deleteTable,
} from '../controllers/tableController'; // Import fungsi dari controller
import {
    verifyAddTable,
    verifyUpdateTable,
} from '../middlewares/verifyTable'; // Import middleware validasi

const router = Router();

// Rute untuk mendapatkan semua tabel
router.get('/', getTables);

// Rute untuk membuat tabel baru dengan validasi
router.post('/', verifyAddTable, createTable);

// Rute untuk memperbarui tabel yang ada dengan validasi
router.put('/:id', verifyUpdateTable, updateTable);

// Rute untuk menghapus tabel
router.delete('/:id', deleteTable);

export default router;
