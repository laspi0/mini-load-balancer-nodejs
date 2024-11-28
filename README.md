# Mini Load Balancer Node.js

Ce projet implémente un **Load Balancer** simple en utilisant **Node.js**. Le load balancer répartit les requêtes HTTP entre plusieurs serveurs backend afin d'équilibrer la charge du trafic et améliorer les performances du système.

## Fonctionnalités

- **Répartition de la charge** : Distribution équitable des requêtes entre plusieurs serveurs backend.
- **Surveillance de la santé des serveurs** : Vérification régulière de l'état des serveurs backend avec un **health check**.
- **Serveur principal** : Le load balancer écoute sur un port (par défaut `3000`) et redirige les requêtes HTTP aux serveurs backend disponibles.
- **Serveurs backend** : Serveurs de traitement des requêtes disponibles sur des ports distincts.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure) : [Télécharger Node.js](https://nodejs.org/)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/laspi0/mini-load-balancer-nodejs.git
   cd mini-load-balancer-nodejs
