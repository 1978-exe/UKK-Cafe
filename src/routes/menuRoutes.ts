import { Router } from 'express';
import {
    getMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} from '../controllers/menuController'; // Import fungsi dari controller
import {
    verifyAddFood,
    verifyEditFood,
} from '../middlewares/verifyMenu'; // Import middleware validasi
import { verifyToken} from '../middlewares/authorization'; // Import middleware autentikasi dan otorisasi
import uploadFile from '../middlewares/uploadImageOfFood';
const router = Router();
// Rute untuk mendapatkan semua item menu (dapat diakses oleh semua pengguna yang terautentikasi)
router.get('/', getMenuItems);

// Rute untuk membuat item menu baru (hanya dapat diakses oleh ADMIN, MANAJER, dan KASIR)
router.post('/', verifyToken(['ADMIN', 'MANAJER', 'KASIR']), uploadFile.single('image'), verifyAddFood, createMenuItem);

// Rute untuk memperbarui item menu yang ada (hanya dapat diakses oleh ADMIN dan MANAJER)
router.put('/:id', verifyToken(['ADMIN', 'MANAJER']), uploadFile.single('image'), verifyEditFood, updateMenuItem);

// Rute untuk menghapus item menu (hanya dapat diakses oleh ADMIN dan MANAJER)
router.delete('/:id', verifyToken(['ADMIN', 'MANAJER']), deleteMenuItem);

export default router;
