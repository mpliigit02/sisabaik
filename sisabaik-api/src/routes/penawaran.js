
import { Router } from "express";
import * as controller from "../controllers/penawaran.js";
import {
  wajibLogin,
  wajibPeran,
  wajibPenyediaTerverifikasi,
} from "../middleware/auth.js";

const router = Router();

const penyedia = [
  wajibLogin,
  wajibPeran("penyedia"),
  wajibPenyediaTerverifikasi,
];

router.get("/", controller.daftar);
router.get("/milik-saya", ...penyedia, controller.milikSaya);
router.get("/:id", controller.detail);
router.post("/", ...penyedia, controller.buat);
router.put("/:id", ...penyedia, controller.ubah);
router.delete("/:id", ...penyedia, controller.hapus);

export default router;
