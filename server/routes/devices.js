const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// Ici, cest notre route get pour recuperer la liste des devices se trouvant dans la bd
router.get("/", async (req,res) =>{
    const devices = await Device.find();
    res.json({devices});
});

// Ici, cest notre route pour recuperer un Device avec son Id
router.get("/:id", async(req,res) => {
    const device = await Device.findOne({id: req.params.id});
    if(!device) 
        return res.status(404).json({error:"Device not found"});
    res.json(device);
});

// Ici, cest notre route pour l'envoi du formulaire 
router.post("/", async (req, res) => {
    try {

      // On recupere le nom et brand du formulaire
      const { name, brand } = req.body;
  
      // On verifie qu'un produit avec cette combinaison n'existe pas deja
      // J'ai decide d'aller avec cette methode de validation car il se pourrait que deux produit du meme nom mais differentes marques existent
      const duplicate = await Device.findOne({ name, brand });
      if (duplicate) {
        return res.status(409).json({ error: "Device with same name and brand already exists" });
      }
  
      // Ici on recupe le id du dernier device de la collection 
      const lastDevice = await Device.findOne({ id: /^Device_\d+$/ }).sort({ id: -1 });
  
      // On initialise le next id avec "Device_001" au cas ou la collection soit vite et ensuite on test le dernier id et on incremente de 1 pour le nouveau Device
      let nextId = "Device_001"; // valeur par défaut
      if (lastDevice && lastDevice.id) {
        const lastNum = parseInt(lastDevice.id.split("_")[1], 10);
        const nextNum = (lastNum + 1).toString().padStart(3, "0");
        nextId = `Device_${nextNum}`;
      }
  
      // On cree le nouveau Device avec les information du form et le nouvel id et on sauvegarde dans le document avec .save()
      const newDevice = new Device({ ...req.body, id: nextId });
      await newDevice.save();
  
      // On renvoi le nouveau Device 
      res.status(201).json(newDevice);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Ici, cest notre route pour mettre a jour un Device
router.put("/:id", async(req,res) => {

  //  ici le new=true nous permet de retourner le Device APRES qu'il soit mis a jour et non apres
    const device = await Device.findOneAndUpdate({id: req.params.id}, req.body, {new: true,});
    if(!device)
        return res.status(404).json({error: "Device not found"});
    res.json(device);
});

// Ici, cest notre route pour effacer a jour un Device
router.delete("/:id", async(req,res) => {
    const device = await Device.findOneAndDelete({id: req.params.id});
    if(!device)
        return res.status(404).json({error: "Device not found"});
    res.json({ message: "Device deleted" });
});

module.exports = router;
