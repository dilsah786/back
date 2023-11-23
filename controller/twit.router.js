const express = require("express");
const { TwitModel } = require("../db");

const twitController = express.Router();

twitController.get("/", async (req, res) => {

    const category = req.query.category;
   
    const userId = req.body.userId;

    console.log(category)

    let twits = [];

    if(category==="development"){
         twits = await TwitModel.find({ category: "development" });
    }else if(category==="education"){
         twits = await TwitModel.find({ category: "education" });
    }else if(category==="fun"){
         twits = await TwitModel.find({ category: "fun" });
    }else if(category==="sports"){
         twits = await TwitModel.find({ category: "sports" });
    } else{
        twits = await TwitModel.find({ userId: userId });
    }


 

  res.json({ twits: twits });
});

twitController.post("/create", async (req, res) => {
  const { title, body, category, userId } = req.body;
  const newTwit = await TwitModel.create({ title, body, category, userId });
  return res.json({ status: "Twits Created ", newTwit: newTwit });
});

twitController.patch("/edit/:id", async (req, res) => {
  const { title, body, category, userId } = req.body;
  const updateBody = {
    title: title,
    body: body,
    category: category,
    userId: userId,
  };
  const id = req.params.id;
  console.log(id);

  try {
    const newTwit = await TwitModel.findOneAndUpdate(
      { _id: id, userId: userId },
      { updateBody }
    );

    if (newTwit) {
      return res.json({ status: "Twits updated ", newTwit: newTwit });
    } else {
      return res.json({ status: "Not Updated" });
    }
  } catch (err) {
    console.log(err);
  }
});




twitController.delete("/delete/:id", async (req, res) => {
    const {userId } = req.body;
    const id = req.params.id;
    try {
        const newTwit = await TwitModel.findOneAndDelete(
          { _id: id, userId: userId }
        );
        if (newTwit) {
          return res.json({ status: "Twits Deleted ", newTwit: newTwit });
        } else {
          return res.json({ status: "Not Deleted" });
        }
      } catch (err) {
        console.log(err);
      }
});

module.exports = { twitController };

