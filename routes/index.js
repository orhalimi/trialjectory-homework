import express from "express";
import endpoints from "../endpoints";

const router = express.Router();
router.get("/quote", endpoints.getQuote);

export default router;
