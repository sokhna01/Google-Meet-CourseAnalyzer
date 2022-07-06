 const router = require("express").Router();
 const { getSeanceById, addSeance, getAllSeance } = require("../service/seance.service");
 
 router
   .get("/seance", async (req, res) => {
     //obtenir tous une seance (get all  seance) 
     res.send(await getAllSeance());
   })
   .get("/seance/:id", async (req, res) => {
     //obtenir une seance par identifiant
     const seance = await getSeanceById(req.params.id);
     res.send(seance);
   })
   .post("/seance", async (req, res) => {
     //méthode post pour ajouter une seance
     const { conference_id, startDate, endDate, hasScreenShared } = req.body;
     let result = await addSeance({ conference_id, startDate, endDate, hasScreenShared });
     res.send(result);
   });
 
 module.exports = { router };
