# Fonctionnalité Canvas et Coordonnées des Salles

## Description

Cette fonctionnalité permet de positionner visuellement les salles sur les plans d'étages en utilisant des canvas HTML5. Les coordonnées sont sauvegardées en base de données et affichées dans les modals de recherche.

## Fonctionnalités

### 1. Création de Salle avec Positionnement
- **Page** : `CreateSalle.cshtml`
- **Fonctionnalité** : 
  - Affichage du plan de l'étage sélectionné dans un canvas
  - Clic sur le canvas pour positionner la salle
  - Sauvegarde des coordonnées en base de données
  - Zoom et déplacement du plan avec la souris

### 2. Affichage des Points dans SearchRoom
- **Page** : `SearchRoom.cshtml`
- **Fonctionnalité** :
  - Modal avec canvas affichant le plan de l'étage
  - Point rouge indiquant la position de la salle
  - Coordonnées récupérées depuis la base de données

## Structure de la Base de Données

### Nouvelles Colonnes dans la Table `Salles`
```sql
ALTER TABLE Salles ADD COLUMN CoordonneeX FLOAT NULL;
ALTER TABLE Salles ADD COLUMN CoordonneeY FLOAT NULL;
```

### Migration
- **Fichier** : `Infrastructure/Migrations/20250617000000_AddSalleCoordinates.cs`
- **Commande** : `dotnet ef database update`

## Fichiers Modifiés

### Backend
1. **Domain/Salle/Salle.cs**
   - Ajout des propriétés `CoordonneeX` et `CoordonneeY`

2. **Web/Controllers/EtagesController.cs**
   - Modification de la méthode `CreateSalle` pour accepter les coordonnées

3. **Infrastructure/Migrations/**
   - Nouvelle migration pour ajouter les colonnes de coordonnées

### Frontend
1. **Web/wwwroot/js/canvas.js**
   - Gestion du canvas pour la création de salle
   - Zoom, déplacement, clics et calcul des coordonnées

2. **Web/wwwroot/js/searchRoomModals.js**
   - Gestion des modals avec canvas pour l'affichage des points

3. **Web/Views/Etages/CreateSalle.cshtml**
   - Ajout du conteneur canvas avec instructions

4. **Web/Views/Etages/SearchRoom.cshtml**
   - Remplacement des images par des canvas dans les modals

5. **Web/wwwroot/css/**
   - Styles pour les canvas et conteneurs

## Utilisation

### Création d'une Salle
1. Remplir les informations de base (nom, numéro, étage)
2. Sélectionner un étage dans le dropdown
3. Le plan de l'étage s'affiche dans le canvas
4. Cliquer sur le plan pour positionner la salle (point rouge)
5. Remplir les autres informations et soumettre

### Consultation d'une Salle
1. Aller sur la page SearchRoom
2. Cliquer sur une salle pour ouvrir le modal
3. Le plan de l'étage s'affiche avec un point rouge à la position de la salle

## Fonctionnalités Techniques

### Canvas Interactif
- **Zoom** : Molette de souris
- **Déplacement** : Clic et glisser
- **Positionnement** : Clic simple pour placer un point
- **Coordonnées** : Calcul automatique des coordonnées relatives à l'image

### Gestion des Erreurs
- Vérification de la validité des coordonnées
- Messages d'erreur pour les images non trouvées
- Fallback pour les salles sans coordonnées

## Notes de Développement

### Coordonnées
- Les coordonnées sont stockées en pixels relatifs à l'image
- Format : `double?` pour permettre des valeurs nulles
- Conversion automatique lors de l'affichage

### Performance
- Chargement asynchrone des images
- Canvas redimensionnés selon la taille de l'image
- Gestion optimisée des événements de souris

### Compatibilité
- Fonctionne avec tous les navigateurs modernes
- Responsive design pour mobile
- Fallback pour les navigateurs sans support canvas 