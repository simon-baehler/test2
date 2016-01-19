---
title: "Test2"
---

## Introduction
Dans ce 2eme projet j'avais à reéaliser une application parmis quatre proposées :

Sujet 1: Développer une application AngularJS pour afficher du contenu obtenu via l'API StackExchange

   * étudier l'API offerte par StackExchange (https://api.stackexchange.com/docs)
   * choisir et spécifier la fonctionnalité, en étant créatif et original
   * intégrer une visualisation de données dans votre UI (choisissez une librairie de visualisation à votre convenance)
   * soigner la présentation (IHM)
   * déployer l'application sur heroku
   * écrire un rapport pour expliquer comment l'application a été réalisée
   * publier l'ensemble dans un repo GitHub 

Sujet 2: Développer une application AngularJS pour afficher du contenu obtenu via l'API GitHub

   * étudier l'API offerte par GitHub
   * choisir et spécifier la fonctionnalité, en étant créatif et original
   * intégrer une visualisation de données dans votre UI (choisissez une librairie de visualisation à votre convenance)
   * soigner la présentation (IHM)
   * déployer l'application sur heroku
   * écrire un rapport pour expliquer comment l'application a été réalisée
   * publier l'ensemble dans un repo GitHub 

Sujet 3: Développer une application AngularJS pour afficher du contenu obtenu via l'API CrunchBase

   * étudier l'API offerte par CrunchBase
   * choisir et spécifier la fonctionnalité, en étant créatif et original
   * intégrer une visualisation de données dans votre UI (choisissez une librairie de visualisation à votre convenance)
   * soigner la présentation (IHM)
   * déployer l'application sur heroku
   * écrire un rapport pour expliquer comment l'application a été réalisée
   * publier l'ensemble dans un repo GitHub 

Sujet 4: Développer une application AngularJS pour illustrer le fonctionnement du mécanisme CORS

   * étudier le mécanisme de sécurité CORS et le comparer avec JSON-P
   * comprendre son importance pour les fournisseurs d'APIs REST
   * trouver le moyen d'illustrer son fonctionnement (hint: vous aurez intérêt à avoir 2 applications sur heroku)
   * réaliser l'application avec AngularJS, en soignant la présentation
   * déployer les composants de l'application de démo sur heroku
   * écrire un rapport pour expliquer CORS en vos propres termes et expliquer comment vous avez implémenté la démonstration (utiliser votre code pour illustrer vos explications sur CORS).
   * publier l'ensemble dans un repo GitHub 

J'ai choisi le sujet No 2, car ce dernier disposait d'une bonne documentation et me semblait le plus réalisable en vue de mes connaissances

## Outil et languages
Pour la réalisation de se projet nous avions comme outil de base
* AngularJS
* Express
* Chart
* UI-Router
Les languages utilisés sont :
* Javascript
* CSS
* HTML

##Realisation
Pour la réalisation de ce projet j'ai dans un permier temps fait la page d'accueil avec la parte root de l'appication (partie que ne change pas), a savoir la bar de menu
en haut avec une textbox de recherche ou sera introduit le nom d'utilisateur GitHub. Cet menu est controlé par le controller navbarcrtl, ce controlleur permet de nous envoyer vers la page user/:username , ou username est le nom tapé dans la textbox, dans le cas ou l'utilisateur n'a pas été trouvé un message d'erreur s'affiche.

###Page /user/:username
Cette page régupère les informations d'un utilisateur GitHub comme ces organisations, Followers, Following, Repos. Les informations sur les repos de l'utilisateur sont donnés dans le tableau du bas. ce tableau contient le nom d repo, le nom du propriaitaire avec un lien menant à /user/:username ou username est le propriaitaire,
un lien vers /user/:username/repo/:repo etant la page detailé du repos et un lien vers le git. Cette page a pour controller user. 

Trois requete vers l'api GitHub
	https://api.github.com/users/:username
	Pour recuperer les informations de l'utilisateur tel que son avatar
	https://api.github.com/users/:username/subscriptions
	Pour recuperer les repos de l'utilisateur (suivi ou propriaitaire)
	https://api.github.com/users/:username/orgs
	Pour recuperer les informations des organisations dont l'utilisateur fait parti

### /user/:username/repo/:repo
Cette page offre la possibilité d'avoir une vue graphique des informations d'un repo d'un utilisateur, telle que le nombre de commit de chaque contributeur et le nombre
de ligne de chaque language utilisé.

##Source et documentation
GitHub API : https://developer.github.com/v3/
tuto : http://code.notsoclever.cc/simple-github-api-webapp-angularjs-style/
