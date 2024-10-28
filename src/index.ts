import express from "express"
import path from "path"
import cors from "cors"
import userRoutes from "./routes/userRoutes"
import menuRoutes from "./routes/menuRoutes"
import transactionRoutes from "./routes/transactionRoutes"
import tableRoutes from "./routes/tableRoutes"
const app = express()
const PORT: number = 8000
app.use(express.json());

app.use(cors())

app.use('/user', userRoutes)
app.use(`/transaction`, transactionRoutes)
app.use(`/table` , tableRoutes)
app.use(`/menu`,menuRoutes)
app.listen(PORT, () => console.log(`Server jalan di ${PORT}`))