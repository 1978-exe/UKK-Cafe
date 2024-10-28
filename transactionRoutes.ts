import { Router } from 'express';
import {
    getAllTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    printReceipt
} from '../controllers/transactionController'; // Import fungsi dari controller
import {
    verifyAddTransaction,
    verifyEditTransaction,
} from '../middlewares/verifyTransaction'; // Import middleware validasi
import { verifyToken } from '../middlewares/authorization'; // Import middleware autentikasi dan otorisasi

const router = Router();
// Rute cetak nota
router.get('/:id/receipt', printReceipt);

// Rute untuk mendapatkan semua transaksi (dapat diakses oleh ADMIN, MANAJER, dan KASIR)
router.get('/', verifyToken(['ADMIN', 'MANAJER', 'KASIR']), getAllTransactions);

// Rute untuk membuat transaksi baru (dapat diakses oleh ADMIN, MANAJER, dan KASIR)
router.post('/', verifyToken(['ADMIN', 'MANAJER', 'KASIR']), verifyAddTransaction, createTransaction);

// Rute untuk memperbarui transaksi yang ada (hanya dapat diakses oleh ADMIN dan MANAJER)
router.put('/:id', verifyToken(['ADMIN', 'MANAJER']), verifyEditTransaction, updateTransaction);

// Rute untuk menghapus transaksi (hanya dapat diakses oleh ADMIN dan MANAJER)
router.delete('/:id', verifyToken(['ADMIN', 'MANAJER']), deleteTransaction);

export default router;
