import React from "react";
import { GoHomeFill } from "react-icons/go";
import { MdElectricBolt } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-5/6 h-5/6 max-w-4xl mx-auto px-6 py-12 text-neutral-800 dark:text-neutral-100 transition-colors duration-200">

      <h1 className="text-4xl font-bold text-blue-500 mb-4">Bienvenue sur SmartPower Hub ⚡</h1>
      <p className="text-lg mb-8 text-neutral-700 dark:text-neutral-300">
        Cette plateforme vous permet de gérer, surveiller et analyser vos appareils électroniques de manière intelligente. Voici un aperçu rapide des options disponibles !
      </p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Navigation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col items-center text-center">
            <GoHomeFill size={36} className="text-blue-400 mb-2" />
            <p><strong>Accueil</strong><br />Page d’introduction et guide de l’application</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MdElectricBolt size={36} className="text-yellow-500 mb-2" />
            <p><strong>Appareils</strong><br />Consulter, modifier et supprimer les appareils enregistrés</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaPlus size={32} className="text-green-500 mb-2" />
            <p><strong>Ajouter</strong><br />Enregistrer un nouvel appareil avec ses données techniques</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">Fonctionnalités principales</h2>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300">
          <li>🧠 Visualiser les données énergétiques (quotidien, mensuel, annuel, veille)</li>
          <li>⚙️ Mettre à jour les propriétés d’un appareil (catégorie, label, consommation, etc.)</li>
          <li>➕ Ajouter un appareil avec ses spécifications techniques</li>
          <li>🗑️ Supprimer les appareils inutilisés ou obsolètes</li>
          <li>🔎 Rechercher et filtrer les appareils facilement</li>
          <li>🌙 Basculer entre les modes clair et sombre</li>
        </ul>
      </div>

      <div className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Développé par <strong>Ahmed-Fateh Guezzane</strong><br />
        Contact : <a href="mailto:1174009@bdeb.qc.ca" className="underline hover:text-blue-400">1174009@bdeb.qc.ca</a>
      </div>
    </div>
  );
};

export default Home;
