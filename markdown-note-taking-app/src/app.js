import express from "express"; 
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";


import notesRoutes from "./notes/notesRoute.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());

//Middleware
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/notes", notesRoutes);


app.use((req, res) => {
    res.status(404).send("Not Found");
})

export default app;
