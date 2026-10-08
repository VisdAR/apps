# Dictionnaire contextuel — contenu distant

L’application reste utilisable hors ligne avec son dictionnaire intégré. Quand une connexion est disponible, elle consulte le manifeste public sur GitHub Pages et télécharge uniquement un document JSON signé par son empreinte SHA-256.

- `content-vN.json` contient des fiches contextuelles optionnelles et la rotation des mots recommandés.
- `manifest.json` fixe la version, l’URL HTTPS, la taille et l’empreinte SHA-256 du document actif.
- Une mise à jour invalide ou indisponible est ignorée ; la dernière copie valide reste en cache privé sur l’appareil.
- Aucun code exécutable n’est téléchargé.

Pour publier une nouvelle révision, créer `content-vN.json`, augmenter `version`, puis exécuter `node tools/prepare-remote-content.cjs` avant de copier les fichiers vers `apps/dico-data/`.
