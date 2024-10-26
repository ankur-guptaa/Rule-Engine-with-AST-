import express from "express";
import mongoose from "mongoose";
import dotevn from "dotenv";
import cors from "cors";
import axios from "axios";
import createRule from "./controllers/create_rule.js";
import combineRules from "./controllers/combine_rules.js";
import evaluateRule from "./controllers/evaluate_rule.js";
import ruleList from "./controllers/rule_list.js";

const app = express();
app.use(express.json());

dotevn.config();
app.use(cors({ origin: process.env.CLIENTURL }));
mongoose.connect(process.env.CONNECTMONGODB);

setInterval(async () => {
  const act = await axios.get("https://rule-engine-with-ast-zgt4.onrender.com/active");
  console.log(act.data);
}, 660000);

app.post("/create_rule", createRule);
app.post("/combine_rules", combineRules);
app.post("/evaluate_rule", evaluateRule);
app.get("/rule_list", ruleList);
app.get("/active", (req, res) => { res.send("Acitvated") });

app.listen(process.env.PORT, () => {
  console.log("Server is listening on " + process.env.PORT + ".");
});
