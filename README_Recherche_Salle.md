# Fonctionnalité de Recherche de Salle

## Description

La fonctionnalité de recherche de salle a été améliorée pour être insensible à la casse (majuscules/minuscules).

## Fonctionnalité

### Recherche Insensible à la Casse
- **Numéro de salle** : Tapez le numéro (ex: "111", "111", "111")
- **Nom de salle** : Tapez le nom (ex: "Salle Reunion", "SALLE REUNION", "salle reunion")
- **Résultat** : Affichage du modal de la salle correspondante

## Utilisation

### Interface
- **Champ de recherche** : Saisissez le numéro ou le nom de la salle
- **Bouton de recherche** : Cliquez sur l'icône de loupe pour lancer la recherche
- **Bouton Reset** : Remet tous les filtres à zéro et affiche toutes les salles

## Exemples d'Utilisation

### Recherche par Numéro
```
Saisie : "111" ou "111" ou "111"
Résultat : Modal de la salle 111 s'affiche
```

### Recherche par Nom
```
Saisie : "Salle Reunion" ou "SALLE REUNION" ou "salle reunion"
Résultat : Modal de la salle correspondante s'affiche
```

## Fichiers Modifiés

- `Web/wwwroot/js/searchSalleModals.js` : Logique de recherche insensible à la casse

## Compatibilité

- Compatible avec tous les navigateurs modernes
- Fonctionne sur mobile et desktop
- Intégré avec le système de filtres existant
- Compatible avec le système de favoris 