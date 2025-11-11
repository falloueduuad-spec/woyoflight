WoyoFlight - React + Tailwind + Capacitor starter
===============================================

Ce projet contient:
- React app (create-react-app compatible)
- Tailwind CSS configuré
- Composant principal: src/WoyoFlightMVP.jsx
- Capacitor config prêt (init via script) pour package Android: com.woyofal.flight

Instructions rapides:

1) Installer les dépendances
   npm install

2) Démarrer en dev
   npm start
   -> ouvrez http://localhost:3000

3) Initialiser Capacitor (crée capacitor.config.json et ajoute native folders)
   npm run cap:init

4) Installer la plateforme Android (nécessite Android Studio + JDK)
   npx cap add android

5) Build web + copy + ouvrir Android Studio
   npm run build
   npx cap copy
   npx cap open android

Remarques:
- Android build doit être fait sur une machine avec Android Studio installé.
- Après 'npx cap add android' un dossier 'android' sera créé: ouvrez-le avec Android Studio pour générer l'APK.

Bonne continuation — dis-moi si tu veux que je crée aussi le projet Android natif (je peux t'indiquer la commande, mais il est préférable de le générer localement avec Capacitor).
