# Guide de Déploiement - Open Library App

## 🚀 Option 1 : Vercel (Recommandé)

### Étapes :

1. **Créer un compte Vercel**
   - Allez sur https://vercel.com
   - Cliquez sur "Sign Up"
   - Connectez-vous avec GitHub, GitLab ou email

2. **Installer Vercel CLI (optionnel)**
   ```bash
   npm install -g vercel
   ```

3. **Déployer depuis le terminal**
   ```bash
   vercel
   ```
   - Suivez les instructions
   - Votre app sera en ligne en quelques secondes !

4. **OU Déployer depuis l'interface web**
   - Allez sur https://vercel.com/new
   - Importez votre projet depuis GitHub
   - Vercel détectera automatiquement Angular
   - Cliquez sur "Deploy"

### URL de votre app :
Vous recevrez une URL comme : `https://votre-app.vercel.app`

---

## 🌐 Option 2 : Netlify

### Étapes :

1. **Créer un compte Netlify**
   - Allez sur https://netlify.com
   - Cliquez sur "Sign Up"

2. **Déployer par drag & drop**
   - Compilez votre app : `npm run build`
   - Allez sur https://app.netlify.com/drop
   - Glissez le dossier `dist/library/browser` dans la zone

3. **OU Déployer depuis GitHub**
   - Connectez votre repo GitHub
   - Netlify détectera automatiquement la configuration
   - Cliquez sur "Deploy"

### URL de votre app :
Vous recevrez une URL comme : `https://votre-app.netlify.app`

---

## 📦 Option 3 : GitHub Pages

### Étapes :

1. **Installer le package Angular pour GitHub Pages**
   ```bash
   npm install -g angular-cli-ghpages
   ```

2. **Build et déployer**
   ```bash
   ng build --configuration production --base-href /library/
   npx angular-cli-ghpages --dir=dist/library/browser
   ```

### URL de votre app :
`https://votre-username.github.io/library/`

---

## 🔧 Avant de déployer

Assurez-vous que votre app compile sans erreur :
```bash
npm run build
```

Si tout fonctionne, vous êtes prêt à déployer ! 🎉

---

## 💡 Conseils

- **Vercel** : Le plus rapide et simple, déploiement automatique à chaque push
- **Netlify** : Très simple aussi, interface intuitive
- **GitHub Pages** : Gratuit mais nécessite un repo GitHub public

Choisissez celui qui vous convient le mieux !
