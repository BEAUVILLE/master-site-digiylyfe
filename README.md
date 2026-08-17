# MASTER SITE DIGIYLYFE · V1 — moule universel de site

Un seul squelette technique. Chaque pro = **une copie du dossier + un `client.json` + ses photos**.
Aucune base de données, aucune connexion, aucun cockpit, aucun moteur.

## Les fichiers

| Fichier | Rôle | Change par pro ? |
|---|---|---|
| `index.html` | Ossature des 9 blocs | **Non** — jamais |
| `styles.css` | Style de marque + accent sectoriel | **Non** — jamais |
| `app.js` | Lit `client.json` et remplit tout | **Non** — jamais |
| `manifest.json` | Secours PWA (app le personnalise) | **Non** |
| `client.json` | **Les données du pro** | **Oui — le seul** |
| `photos/` | Les images du pro | **Oui** |

## Dupliquer un pro (chaîne MOULE → publication)

1. **Copier** le dossier entier → `sites/nom-du-pro/`.
2. **Remplacer `client.json`** : identité, contacts, services, preuves.
3. **Déposer les photos** dans `photos/` (mêmes noms que dans le JSON).
4. **Contrôle** (ton verrou humain) : on relit, on valide.
5. **Publication** : push GitHub Pages / Hostinger. Terminé.

## `client.json` en bref

- Tout champ texte accepte **une chaîne** (`"Plombier"`) **ou** un objet multilingue
  (`{ "fr": "Plombier", "en": "Plumber" }`). Non traduit ⇒ repli automatique sur le FR.
- `meta.sector` choisit l'**accent couleur** (plombier, commerce, beaute, resto, hotel,
  chauffeur, location, consultant…). `meta.accent` force une couleur précise si besoin.
- Un bloc vide (services `[]`, pas de galerie…) **disparaît** tout seul. Pas de trou.

## Les 8 langues

FR par défaut, + EN ES PT IT DE NL AR (RTL arabe géré). Le **chrome** (boutons, titres de
section) est traduit dans `app.js` ; le **contenu du pro** suit `client.json`.
Même moteur d'esprit que LOC / l'accueil — cohérent inter-modules.

## Mettre en ligne / prévisualiser

Le site **lit `client.json` via fetch** → il doit être **servi** (pas ouvert en `file://`).
C'est déjà ton workflow (GitHub Pages / Hostinger). Pour tester en local :

```bash
python3 -m http.server 8000    # puis http://localhost:8000
```

## Une limite à connaître (honnête)

L'aperçu de partage **personnalisé** (photo + nom du pro dans WhatsApp/Facebook) exige que
les balises OG soient dans le HTML **au moment où le robot lit la page** — or les robots
n'exécutent pas le JavaScript. En V1, le partage affiche donc l'**aperçu DIGIYLYFE
générique** (propre et brandé). Pour un aperçu par pro, deux options plus tard :
- laisser le petit bloc `<head>` OG varier par pro (≈ 3 lignes en plus de `client.json`), ou
- un mini-générateur qui écrit ces 3 lignes automatiquement.
À trancher quand tu voudras — hors périmètre V1.

## Brancher sur le modèle de données unifié (plus tard)

`client.json` est pensé pour devenir le **3ᵉ lecteur** de
`MODELE-DONNEES-MASTER-DIGIYLYFE-V1-UNIFIE` (carte + fiche + site, saisie une fois).
Il suffira d'aligner les noms de champs sur ceux du modèle pour que le même source
alimente les trois, sans recâbler `app.js`.

---
🦅♾️ Contact direct · Paiement direct · 0 % de commission
