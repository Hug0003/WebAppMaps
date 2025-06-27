# WebAppMaps - Application de Gestion des Salles et Plans d'Étages

## Pour toute l'équipe

Merci beaucoup pour ce mois passé avec vous et bonne continuation !
A bientôt j'espère 😁

Je vous laisse vous approprier l'application et la modifier comme vous le souhaitez pour la rendre la plus utile possible !
J'ai essayé de faire au mieux, même si je pense que ça va vous faire un peu rire mon code, à cause des noms des variables ou aux erreurs dans le code ;)

Vous avez les plans des étages en PNG (wwwroot/assets/PlansEtages), j'ai oublié de les mettre avant de rendre l'ordinateur. Et je vous laisserai aussi prendre des photos des salles et remplir leurs informations respectives

## Id et psw pour créer

Id = admin
psw admin
A changer dans create.js

## J'ai repéré une erreur à la fin 

lorsqu'on met beaucoup de salles et qu'on souhaite en mettre une en favorie, il y en a une autre qui se met en favorie aussi, je n'ai pas eu le temps de voir pourquoi.


## 📋 Description

WebAppMaps est une application web ASP.NET Core permettant de gérer et visualiser les salles d'un bâtiment avec leurs plans d'étages. L'application offre une interface intuitive pour rechercher, filtrer et localiser les salles sur des plans interactifs.

## 🏗️ Architecture

Le projet suit une architecture en couches avec les composants suivants :

### Structure du Projet
```
WebAppMaps/
├── Domain/                 # Couche domaine (entités et logique métier)
├── Infrastructure/         # Couche infrastructure (base de données)
└── Web/                   # Couche présentation (interface utilisateur)
```

### Technologies Utilisées
- **.NET 9.0** - Framework principal
- **ASP.NET Core MVC** - Architecture web
- **Entity Framework Core** - ORM pour la persistance des données
- **SQL Server** - Base de données
- **Bootstrap** - Framework CSS
- **JavaScript** - Interactivité côté client

## 🎯 Fonctionnalités Principales

### Gestion des Salles
- **Recherche de salles** par nom ou numéro
- **Filtrage avancé** par étage, type de salle et attributs spécifiques
- **Tri dynamique** par nom, numéro, type ou étage
- **Système de favoris** pour marquer les salles importantes

### Types de Salles Supportés
1. **Salles de Réunion**
   - Écran de projection
   - Caméra
   - Tableau blanc
   - Système audio
   - Nombre de places et tables

2. **Salles de Pause**
   - Micro-ondes
   - Frigo
   - Évier
   - Distributeur automatique
   - Nombre de places et tables

3. **Salles Bubble**
   - Prises électriques
   - Nombre de places et tables

### Visualisation Interactive
- **Plans d'étages** avec localisation des salles
- **Coordonnées X/Y** pour positionner les salles sur les plans
- **Images des salles** pour une identification visuelle
- **Interface responsive** adaptée à tous les écrans

### Administration
- **Création d'étages** avec upload de plans
- **Création de salles** avec attributs spécifiques
- **Gestion des images** pour les salles et plans

## 🚀 Installation et Configuration

### Prérequis
- .NET 9.0 SDK
- SQL Server (local ou distant)
- Visual Studio 2022 ou VS Code

### Étapes d'Installation

1. **Cloner le repository**
   ```bash
   git clone [URL_DU_REPO]
   cd WebAppMaps
   ```

2. **Configurer la base de données**
   - Modifier la chaîne de connexion dans `Web/appsettings.json`
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=WebAppMaps;Trusted_Connection=true;TrustServerCertificate=true;"
     }
   }
   ```

3. **Installer les dépendances**
   ```bash
   dotnet restore
   ```

4. **Appliquer les migrations**
   ```bash
   cd Web
   dotnet ef database update
   ```

5. **Lancer l'application**
   ```bash
   dotnet run
   ```

L'application sera accessible à l'adresse : `https://localhost:5001`

## 📁 Structure des Fichiers

### Domain/
- **Entity/** - Classe de base pour toutes les entités
- **Salle/** - Modèles de salles (Salle, SalleReunion, SallePause, SalleBubble)
- **Etage/** - Modèle d'étage
- **Repository/** - Interfaces de repository

### Infrastructure/
- **Repository/** - Implémentation des repositories
- **Migrations/** - Migrations Entity Framework
- **WebAppMapsContext.cs** - Contexte de base de données

### Web/
- **Controllers/** - Contrôleurs MVC
- **Views/** - Vues Razor
- **ViewModels/** - Modèles de vue
- **wwwroot/** - Fichiers statiques (CSS, JS, images)

## 🎨 Interface Utilisateur

### Page Principale (SearchSalle)
- Barre de recherche pour trouver des salles
- Filtres par étage, type et attributs
- Liste des salles avec images et informations
- Système de tri dynamique
- Bouton de réinitialisation des filtres

### Fonctionnalités Interactives
- **Recherche en temps réel** des salles
- **Filtrage multi-critères** avec combinaison d'options
- **Affichage modal** des détails de salle
- **Marquage des favoris** avec étoiles
- **Visualisation des plans** d'étages

## 🔧 Configuration Avancée

### Personnalisation des Images
- Les images des salles sont stockées dans `wwwroot/assets/Salles/`
- Les plans d'étages sont stockés dans `wwwroot/assets/PlansEtages/`
- Format recommandé : PNG, JPG (max 5MB)

### Ajout de Nouveaux Types de Salles
1. Créer une nouvelle classe dans `Domain/Salle/`
2. Hériter de la classe `Salle`
3. Ajouter les propriétés spécifiques
4. Mettre à jour le `SalleManager` pour la création
5. Créer une migration pour la base de données

## 🐛 Dépannage

### Problèmes Courants

**Erreur de connexion à la base de données**
- Vérifier la chaîne de connexion dans `appsettings.json`
- S'assurer que SQL Server est démarré
- Vérifier les permissions d'accès

**Images non affichées**
- Vérifier que les dossiers `assets/Salles/` et `assets/PlansEtages/` existent
- S'assurer que les permissions de lecture sont correctes

**Erreurs de migration**
- Supprimer la base de données existante
- Relancer `dotnet ef database update`

## 📝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence [à définir].

## 👥 Équipe

- **Développeur Principal** : [Nom]
- **Architecture** : Clean Architecture avec ASP.NET Core
- **Base de données** : SQL Server avec Entity Framework Core

## 🔄 Versions

- **Version actuelle** : 1.0.0
- **Dernière mise à jour** : [Date]
- **Compatibilité** : .NET 9.0+

---

Pour toute question ou support, veuillez ouvrir une issue sur le repository GitHub. 