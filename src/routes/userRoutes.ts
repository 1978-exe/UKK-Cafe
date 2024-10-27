import { Router } from 'express';
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
} from '../controllers/userController'; // Import fungsi dari controller
import {
    verifyAddUser,
    verifyEditUser,
    verifyAuthentication,
} from '../middlewares/verifyUser'; // Import middleware validasi
import { verifyToken } from '../middlewares/authorization'; // Import middleware autentikasi dan otorisasi

const router = Router();

// Rute untuk mendapatkan semua pengguna
router.get('/', getUsers);

// Rute untuk membuat pengguna baru
router.post('/', verifyToken(['ADMIN']), verifyAddUser, createUser);

// Rute untuk memperbarui pengguna yang ada (hanya dapat diakses oleh ADMIN)
router.put('/:id', verifyToken(['ADMIN']), verifyEditUser, updateUser);

// Rute untuk menghapus pengguna (hanya dapat diakses oleh ADMIN)
router.delete('/:id', verifyToken(['ADMIN']), deleteUser);

// Rute untuk login pengguna (semua pengguna dapat mengakses)
router.post('/login', verifyAuthentication, loginUser);

export default router;
