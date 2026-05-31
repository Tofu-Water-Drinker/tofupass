window.tofupassStudentTestLocale = {
  "dateLocale": "fr",
  "text": {
    "passedSummary": "{passé} de {total} passé",
    "progress": "{current} de {total}",
    "notTaken": "Non pris",
    "passInstruction": "Passez avec {nécessaire} de {total} correct.",
    "startQuiz": "Démarrer Quiz",
    "retakeQuiz": "Reprendre le quiz",
    "moduleKickerOf": "{kicker} de {total}",
    "questionTitle": "{titre} : Question {numéro}",
    "next": "Suivant",
    "seeScore": "Voir score",
    "correctPrefix": "C'est exact.",
    "reviewPrefix": "Regardez celui-ci.",
    "passed": "Décédé",
    "retakeNeeded": "Reprise nécessaire",
    "passedMessage": "Beau travail. Ce quiz est terminé. Continuez jusqu'à ce que les six soient passés.",
    "retakeMessage": "Ce quiz a besoin de 85 % ou plus. Passez en revue les articles manqués, puis reprenez-les.",
    "gotIt": "Compris.",
    "review": "Révision",
    "yourAnswer": "Votre réponse: {réponse}",
    "bestAnswer": "Meilleure réponse : {réponse}",
    "studentName": "Nom de l'étudiant",
    "unlocked": "Débloqué",
    "passedBadge": "{passé} / {total} passé",
    "overallGrade": "Niveau général : {grade}%",
    "overallGradeBlank": "Catégorie générale :",
    "date": "Date: {date}",
    "dateBlank": "Date: --",
    "incomplete": "Incomplète"
  },
  "modules": [
    {
      "id": "password-basics",
      "title": "Bases du mot de passe",
      "shortTitle": "Données de base",
      "kicker": "Quiz 1",
      "description": "Choisissez des mots de passe plus forts en comprenant la longueur, le hasard et les motifs évidents.",
      "questions": [
        {
          "scenario": "Vous faites un mot de passe pour un nouveau compte scolaire.",
          "question": "Quel mot de passe est le choix le plus sûr?",
          "options": [
            "école2026",
            "Mon nom!123",
            "RiverMisoCloud!42",
            "mot de passe mais long"
          ],
          "answer": 2,
          "explanation": "Un mot de passe plus sûr est long, unique et non basé sur des mots personnels ou scolaires évidents."
        },
        {
          "scenario": "Un site Web nécessite un numéro et un symbole.",
          "question": "Quel modèle de mot de passe est le plus fort?",
          "options": [
            "Soccer !1",
            "Printemps 2026 !",
            "MisoRiverOrbit!74",
            "Mon école mascotte #5"
          ],
          "answer": 2,
          "explanation": "Les mots lisibles au hasard plus un symbole et un nombre sont plus difficiles à deviner que les modèles d'école ou de saison communs."
        },
        {
          "scenario": "Vous avez besoin de quelque chose de plus facile à taper à la main.",
          "question": "Quelle habitude aide le plus ?",
          "options": [
            "Utilisez un court mot et un anniversaire",
            "Utilisez des mots lisibles au hasard et gardez-les uniques",
            "Utilisez votre nom d'animal avec 123",
            "Réutiliser celui que vous connaissez déjà"
          ],
          "answer": 1,
          "explanation": "Les mots aléatoires lisibles peuvent être utilisables et forts, surtout lorsque chaque compte obtient son propre mot de passe."
        },
        {
          "scenario": "Un mot de passe contient votre nom, votre équipe ou votre anniversaire.",
          "question": "Pourquoi est-ce risqué ?",
          "options": [
            "C'est trop dur de se souvenir",
            "Les attaquants peuvent deviner des modèles personnels",
            "Il casse toujours les sites Web",
            "Seulement pour les enseignants"
          ],
          "answer": 1,
          "explanation": "Les noms, les équipes, les anniversaires et les mots d'école sont plus faciles à deviner pour les gens et les outils de saisie de mots de passe."
        },
        {
          "scenario": "Un ami dit \"P@ssw0rd!\" est fort parce qu'il a des symboles.",
          "question": "Quel est le problème ?",
          "options": [
            "C'est trop long",
            "Il n'a pas de lettres minuscules",
            "C'est un schéma courant d'attaquants savent",
            "Les symboles affaiblissent les mots de passe"
          ],
          "answer": 2,
          "explanation": "Les substitutions courantes comme @ pour a et 0 pour o sont des trucs bien connus, pas de vrais hasards."
        },
        {
          "scenario": "Vous comparez deux mots de passe.",
          "question": "Qu'est-ce qui aide plus que de rendre un mot de passe court bizarre?",
          "options": [
            "Plus longtemps.",
            "Supprimer tous les espaces",
            "Utilisation de vos initiales",
            "Changer une lettre en un nombre"
          ],
          "answer": 0,
          "explanation": "La longueur est puissante. Un mot de passe aléatoire plus long est généralement plus fort qu'un mot de passe court avec des changements prévisibles."
        },
        {
          "scenario": "Vous avez généré un mot de passe et ne l'aimez pas.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Modifier dans une phrase préférée",
            "Générer un autre aléatoire",
            "Ajoutez votre anniversaire à la fin",
            "Utilisez le même sur un autre site"
          ],
          "answer": 1,
          "explanation": "Si un mot de passe généré ne fonctionne pas pour vous, créez un nouveau mot de passe au lieu de le transformer en modèle personnel."
        }
      ]
    },
    {
      "id": "reuse-managers",
      "title": "Réutilisation et gestionnaires",
      "shortTitle": "Réutilisation",
      "kicker": "Quiz 2",
      "description": "Découvrez pourquoi chaque compte a besoin de son propre mot de passe et comment les gestionnaires de mots de passe aident.",
      "questions": [
        {
          "scenario": "Vous utilisez le même mot de passe pour un jeu, un email scolaire et un site d'achat.",
          "question": "Pourquoi est-ce risqué ?",
          "options": [
            "Il rend le mot de passe trop long",
            "Une brèche peut déverrouiller les trois comptes",
            "Les sites Web peuvent voir chaque mot de passe que vous utilisez",
            "Ce n'est important que pour les adultes"
          ],
          "answer": 1,
          "explanation": "Si un site fuit un mot de passe réutilisé, les attaquants l'essayent automatiquement sur d'autres sites."
        },
        {
          "scenario": "Un gestionnaire de mots de passe est à votre disposition.",
          "question": "Pourquoi ?",
          "options": [
            "Se souvenir de mots de passe uniques en toute sécurité",
            "Faire de chaque mot de passe le même",
            "Partage public des mots de passe de classe",
            "Interdire l'authentification à deux facteurs"
          ],
          "answer": 0,
          "explanation": "Un gestionnaire de mots de passe vous aide à garder des mots de passe forts et uniques sans les mémoriser tous."
        },
        {
          "scenario": "Vous utilisez un gestionnaire de mots de passe.",
          "question": "Quel devrait être votre mot de passe maître?",
          "options": [
            "Court et facile",
            "La même chose que votre mot de passe",
            "Longue, unique et privée",
            "Votre numéro de déjeuner"
          ],
          "answer": 2,
          "explanation": "Le mot de passe maître protège le gestionnaire, donc il devrait être long, unique et jamais partagé."
        },
        {
          "scenario": "Vous ne pouvez pas utiliser un gestionnaire de mots de passe pour un compte scolaire.",
          "question": "Quelle est la prochaine meilleure habitude?",
          "options": [
            "Réutiliser un mot de passe familier",
            "Utilisez un mot de passe généré unique que vous pouvez saisir",
            "Utilisez votre nom d'utilisateur comme mot de passe",
            "Écrivez-le dans un doc de classe publique"
          ],
          "answer": 1,
          "explanation": "Même sans gestionnaire, le mot de passe devrait être unique et généré plutôt que réutilisé."
        },
        {
          "scenario": "Un ami veut enregistrer votre connexion dans son navigateur pour vous.",
          "question": "Qu'est-ce que tu devrais dire ?",
          "options": [
            "Oui, s'ils promettent de ne pas regarder",
            "Non, mes mots de passe restent dans mon compte ou mon manager",
            "Seulement pour les sites scolaires",
            "Seulement s'ils le suppriment la semaine prochaine"
          ],
          "answer": 1,
          "explanation": "Enregistrer votre mot de passe dans un autre navigateur donne accès à son appareil à votre compte."
        },
        {
          "scenario": "Vous avez des dizaines de comptes.",
          "question": "Quel est le plan réaliste le plus sûr?",
          "options": [
            "Un mot de passe pour tout",
            "Quelques mots de passe tournés autour",
            "Mots de passe uniques enregistrés dans un gestionnaire",
            "Mot de passe basé sur les noms de compte"
          ],
          "answer": 2,
          "explanation": "Les mots de passe uniques limitent les dommages. Un manager rend cela réaliste pour la vie quotidienne."
        },
        {
          "scenario": "Un site vous indique que votre mot de passe est apparu dans une brèche.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Modifier seulement ce mot de passe si c'était unique",
            "Ignore-le si tu t'en souviens encore.",
            "Affichez le mot de passe pour demander aux amis",
            "Réutiliser avec un symbole de plus"
          ],
          "answer": 0,
          "explanation": "Si le mot de passe était unique, modifier ce compte pourrait suffire. Si elle a été réutilisée, changez chaque compte qui l'a utilisée."
        }
      ]
    },
    {
      "id": "phishing",
      "title": "Phishing et liens",
      "shortTitle": "Phishing",
      "kicker": "Quiz 3",
      "description": "Pratiquez la détection de messages urgents, de fausses pages de connexion et de liens suspects.",
      "questions": [
        {
          "scenario": "Vous obtenez un message qui indique que votre compte sera supprimé à moins que vous vous connectiez maintenant.",
          "question": "Quel est le prochain mouvement le plus sûr?",
          "options": [
            "Cliquez sur le lien rapidement",
            "Répondre avec votre nom d'utilisateur",
            "Ouvrir le site de l'école à partir d'un signet ou dactylographié",
            "Transmettre à tout le monde"
          ],
          "answer": 2,
          "explanation": "Les messages de connexion urgents sont un trick de phishing classique. Allez sur le vrai site vous-même."
        },
        {
          "scenario": "Un lien dit school-login.example.com mais le vrai site de l'école utilise votreschool.edu.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Connectez-vous parce que ça dit école",
            "Vérifiez avec un professeur ou ouvrez le site réel vous-même",
            "Essayez d'abord votre ancien mot de passe",
            "Partagez-le dans le chat de classe"
          ],
          "answer": 1,
          "explanation": "Les adresses semblables sont suspectes. Utilisez le site connu ou demandez à un adulte de confiance."
        },
        {
          "scenario": "Un email dit que vous avez gagné un prix et demande votre mot de passe de l'école.",
          "question": "Quel est le plus grand signal d'avertissement?",
          "options": [
            "Il mentionne un prix",
            "Il demande votre mot de passe",
            "Il est arrivé le matin.",
            "Elle a une photo."
          ],
          "answer": 1,
          "explanation": "Les personnes et les sites légitimes ne devraient pas vous demander d'envoyer votre mot de passe dans un message."
        },
        {
          "scenario": "Une page de connexion semble presque normale mais a des erreurs d'orthographe et une adresse web étrange.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Saisissez seulement votre nom d'utilisateur",
            "Fermez-le et allez sur le site réel autrement",
            "Essayez d'abord un faux mot de passe",
            "Rafraîchir jusqu'à ce qu'il semble mieux"
          ],
          "answer": 1,
          "explanation": "Une adresse étrange plus des détails brouillés est une raison suffisante pour arrêter et utiliser un chemin de confiance."
        },
        {
          "scenario": "Un camarade de classe envoie un lien de fichier et dit \"ouvre ça maintenant\".",
          "question": "Qu'est-ce qu'une réponse plus sûre?",
          "options": [
            "Demandez ce qu'il est avant d'ouvrir",
            "Téléchargez-le immédiatement",
            "Saisissez votre mot de passe si demandé",
            "Transmettre à plus de gens"
          ],
          "answer": 0,
          "explanation": "Des liens et des fichiers inattendus méritent un contrôle rapide, même lorsqu'ils viennent de quelqu'un que vous connaissez."
        },
        {
          "scenario": "Un pop-up dit que votre ordinateur est infecté et vous demande d'appeler un numéro.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Appelez le numéro",
            "Donner un accès à distance",
            "Fermez-le et dites à un adulte de confiance ou IT",
            "Payer pour supprimer l'avertissement"
          ],
          "answer": 2,
          "explanation": "Les pop-ups de l'épouvante essaient de vous précipiter. Arrêtez, fermez-le si possible, et obtenez l'aide d'une personne de confiance."
        },
        {
          "scenario": "Vous avez cliqué sur un lien suspect mais n'avez pas saisi de mot de passe.",
          "question": "Que devrais-tu faire ensuite ?",
          "options": [
            "Fais comme si rien ne s'était passé.",
            "Dites à un professeur ou à un adulte de confiance",
            "Envoyer à des amis pour tester",
            "Saisissez votre mot de passe pour voir ce qui se passe"
          ],
          "answer": 1,
          "explanation": "Signaler tôt aide à empêcher une arnaque de se propager, même si vous n'avez rien tapé."
        }
      ]
    },
    {
      "id": "mfa-recovery",
      "title": "MFA et récupération",
      "shortTitle": "MFA",
      "kicker": "Quiz 4",
      "description": "Protégez les codes de vérification, les invites à pousser, les codes de sauvegarde et les options de récupération.",
      "questions": [
        {
          "scenario": "Un site offre une authentification à deux facteurs.",
          "question": "Que fait l'authentification à deux facteurs?",
          "options": [
            "Il remplace votre mot de passe",
            "Il vous fait changer les mots de passe tous les jours",
            "Cela ajoute une autre preuve que c'est vraiment toi",
            "Il stocke votre mot de passe pour les amis"
          ],
          "answer": 2,
          "explanation": "L'authentification à deux facteurs ajoute un autre calque, comme un code ou une invitation, après le mot de passe."
        },
        {
          "scenario": "Un écran de connexion demande un code à partir de votre app authentificateur.",
          "question": "Qui devrait avoir ce code ?",
          "options": [
            "Seulement toi",
            "Toute personne de soutien technique qui demande",
            "Un ami qui aide à faire ses devoirs",
            "Une boîte de chat site web"
          ],
          "answer": 0,
          "explanation": "Un code à deux facteurs est un secret. Le personnel de soutien réel ne devrait pas avoir besoin que vous le lisiez."
        },
        {
          "scenario": "Votre téléphone vous demande d'approuver une connexion que vous n'avez pas commencé.",
          "question": "Qu'est-ce que tu devrais taper ?",
          "options": [
            "Approuver",
            "Refuser ou rejeter",
            "Approuver si vous êtes occupé",
            "Approuver, puis le changer plus tard"
          ],
          "answer": 1,
          "explanation": "Les instructions de MFA inattendues peuvent signifier que quelqu'un a votre mot de passe. Refusez la demande et demandez de l'aide."
        },
        {
          "scenario": "Un message de chat de jeu demande un code de connexion à six chiffres pour \"vérifier votre compte.\"",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Envoie-le s'ils semblent officiels",
            "Ne jamais partager le code",
            "Envoyer après avoir changé votre mot de passe",
            "Demandez-leur de promettre que c'est sûr"
          ],
          "answer": 1,
          "explanation": "Les codes de connexion sont privés. Partager un peut laisser quelqu'un dans votre compte."
        },
        {
          "scenario": "Vous recevez des codes de récupération de sauvegarde.",
          "question": "Où devraient-ils aller ?",
          "options": [
            "Dans un endroit privé sûr",
            "Dans un dossier de classe publique",
            "Dans votre profil social",
            "Sur une note collante sur un ordinateur partagé"
          ],
          "answer": 0,
          "explanation": "Les codes de récupération peuvent débloquer des comptes, donc ils ont besoin de stockage privé."
        },
        {
          "scenario": "Vous perdez l'accès à votre téléphone utilisé pour MFA.",
          "question": "Quelle est la meilleure prochaine étape?",
          "options": [
            "Créer un nouveau compte immédiatement",
            "Demandez à un enseignant, un tuteur ou un soutien officiel pour obtenir de l'aide au rétablissement",
            "Devinez les codes de sauvegarde en ligne",
            "Utilisez un numéro de téléphone d'ami secrètement"
          ],
          "answer": 1,
          "explanation": "Le recouvrement de compte devrait passer par des adultes de confiance ou des canaux de soutien officiels."
        },
        {
          "scenario": "Quelqu'un dit qu'ils sont IT et demande votre code MFA.",
          "question": "Tu te souviens de quoi ?",
          "options": [
            "Un véritable support peut avoir besoin du code",
            "Les codes MFA prouvent l'identité et doivent rester privés",
            "Les codes sont sûrs après 30 secondes",
            "C'est bon s'ils connaissent ton nom"
          ],
          "answer": 1,
          "explanation": "Les codes MFA sont puissants parce qu'ils prouvent leur identité. Ne les partagez pas avec les appelants ou les messages de chat."
        }
      ]
    },
    {
      "id": "shared-devices",
      "title": "Appareils partagés",
      "shortTitle": "Dispositifs",
      "kicker": "Quiz 5",
      "description": "Restez en sécurité sur les ordinateurs de classe, les appareils empruntés, le Wi-Fi public et les navigateurs partagés.",
      "questions": [
        {
          "scenario": "Vous êtes sur un ordinateur de classe partagé.",
          "question": "Que devez-vous faire avant de partir ?",
          "options": [
            "Fermez le couvercle ou le moniteur",
            "Se déconnecter de vos comptes",
            "Laisser les onglets ouverts pour la classe suivante",
            "Enregistrer votre mot de passe dans le navigateur"
          ],
          "answer": 1,
          "explanation": "Logging out empêche la personne suivante d'ouvrir vos comptes à partir de la même session de navigateur."
        },
        {
          "scenario": "Un navigateur sur un ordinateur partagé demande à enregistrer votre mot de passe.",
          "question": "Que devriez-vous choisir ?",
          "options": [
            "Enregistrer",
            "Jamais ou pas maintenant",
            "Économisez seulement pour l'école",
            "Enregistrer si la classe est presque terminée"
          ],
          "answer": 1,
          "explanation": "Les navigateurs partagés ne devraient pas stocker vos mots de passe personnels."
        },
        {
          "scenario": "Vous avez emprunté un ordinateur portable d'un ami pour vérifier l'email.",
          "question": "Que devriez - vous éviter?",
          "options": [
            "En route après",
            "Utilisation d'une fenêtre privée si disponible",
            "Enregistrer votre mot de passe dans leur navigateur",
            "Ouvrir le site vous-même"
          ],
          "answer": 2,
          "explanation": "Enregistrer des mots de passe sur un autre appareil peut laisser votre compte accessible après que vous l'avez retourné."
        },
        {
          "scenario": "Tu trouves quelqu'un d'autre qui s'est connecté sur un ordinateur de classe.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Lire leurs messages",
            "Postez quelque chose de drôle",
            "Enregistrez-les et dites à un professeur",
            "Changer leur mot de passe"
          ],
          "answer": 2,
          "explanation": "Respecter leur vie privée, se déconnecter s'il y a lieu et faire savoir à un adulte de confiance."
        },
        {
          "scenario": "Une page de connexion Wi-Fi publique demande votre mot de passe scolaire.",
          "question": "Qu'est-ce qui est le plus sûr?",
          "options": [
            "Entrez-le parce que le Wi-Fi en a besoin",
            "Vérifiez auprès d'un adulte de confiance ou utilisez les instructions du réseau scolaire officiel",
            "Essayez votre mot de passe deux fois",
            "Utiliser un mot de passe ami"
          ],
          "answer": 1,
          "explanation": "Ne mettez pas les références scolaires dans les pages Wi-Fi aléatoires sans confirmer qu'elles sont officielles."
        },
        {
          "scenario": "Vous téléchargez une extension de navigateur promettant la monnaie de jeu gratuit.",
          "question": "Quel est le problème?",
          "options": [
            "Les extensions peuvent parfois lire ou modifier les données du navigateur",
            "Les prolongations sont toujours approuvées par l'école",
            "Extensions de jeux améliorer la sécurité",
            "Ça ne compte que pour les téléphones."
          ],
          "answer": 0,
          "explanation": "Les extensions peuvent avoir un accès puissant. Installez seulement des outils de confiance approuvés."
        },
        {
          "scenario": "Vous avez fini d'utiliser une application web sur un appareil partagé.",
          "question": "Quelle action est la plus complète?",
          "options": [
            "Fermez l'onglet seulement",
            "Se déconnecter, puis fermer l'onglet",
            "Baissez la luminosité",
            "Laisser le navigateur ouvert"
          ],
          "answer": 1,
          "explanation": "La fermeture d'un onglet peut ne pas terminer la session. C'est une habitude plus sûre."
        }
      ]
    },
    {
      "id": "incident-response",
      "title": "Quand les choses tournent mal",
      "shortTitle": "Réponse",
      "kicker": "Quiz 6",
      "description": "Savoir quand changer un mot de passe, signaler une activité suspecte et demander de l'aide.",
      "questions": [
        {
          "scenario": "Vous pensez que quelqu'un d'autre connaît votre mot de passe.",
          "question": "Que devriez-vous faire d'abord ?",
          "options": [
            "Ignorez-le sauf si quelque chose de mal arrive",
            "Changez-le et dites à un adulte ou un enseignant de confiance",
            "Poster un avertissement en ligne",
            "Utilisez le même mot de passe avec un numéro supplémentaire"
          ],
          "answer": 1,
          "explanation": "Changer le mot de passe, puis obtenir de l'aide. Si le compte est important, quelqu'un peut avoir besoin de vérifier l'activité."
        },
        {
          "scenario": "Vous voyez des messages envoyés depuis votre compte que vous n'avez pas écrits.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Supprimez-les tranquillement.",
            "Modifier votre mot de passe et le signaler",
            "Envoyer d'autres messages expliquant",
            "Donnez le compte à un ami"
          ],
          "answer": 1,
          "explanation": "Une activité inattendue peut signifier que le compte est compromis. Changez le mot de passe et signalez-le rapidement."
        },
        {
          "scenario": "Vous avez accidentellement partagé votre mot de passe dans un chat.",
          "question": "Quelle est la réponse la plus sûre?",
          "options": [
            "Change tout de suite.",
            "J'espère que personne ne l'a remarqué.",
            "Demandez aux gens de ne pas l'utiliser",
            "Supprimer le message la semaine prochaine"
          ],
          "answer": 0,
          "explanation": "Une fois qu'un mot de passe est partagé, traitez-le comme n'étant plus privé et changez-le."
        },
        {
          "scenario": "Un site dit que votre mot de passe est faible.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Ajouter 1 à la fin",
            "Créer un nouveau mot de passe unique",
            "Ignorez-le si vous aimez le mot de passe",
            "Utilisez votre nom d'école avec un symbole"
          ],
          "answer": 1,
          "explanation": "Un avertissement est un bon moment pour remplacer le mot de passe par quelque chose de plus fort et unique."
        },
        {
          "scenario": "Vous recevez un email sur une connexion depuis un endroit que vous ne reconnaissez pas.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Utilisez le lien e-mail pour vous connecter",
            "Ouvrez le site vous-même, vérifiez l'activité et changez le mot de passe si nécessaire",
            "Transmettre l'email à des amis",
            "Répondre avec votre mot de passe"
          ],
          "answer": 1,
          "explanation": "Utilisez un chemin de confiance pour vérifier le compte. N'utilisez pas de liens à partir de messages suspects."
        },
        {
          "scenario": "Un ami dit qu'ils ont été piratés et demande votre mot de passe pour tester quelque chose.",
          "question": "Que devriez-vous faire ?",
          "options": [
            "Partager pour aider",
            "Ne le partagez pas et encouragez-les à obtenir de l'aide fiable",
            "Utiliser un ancien mot de passe",
            "Partager seulement en personne"
          ],
          "answer": 1,
          "explanation": "Aider un ami ne devrait pas nécessiter le partage de votre mot de passe. Encourager le rétablissement grâce à un soutien fiable."
        },
        {
          "scenario": "Vous ne savez pas si quelque chose est sûr.",
          "question": "Quelle est une bonne règle ?",
          "options": [
            "Demandez avant de saisir des informations privées",
            "Cliquez plus vite avant qu'il expire",
            "Essayez votre mot de passe et voyez",
            "Partager avec les camarades de classe d'abord"
          ],
          "answer": 0,
          "explanation": "Pauser et demander à un adulte ou à un enseignant de confiance est une forte habitude de sécurité."
        }
      ]
    }
  ]
};
