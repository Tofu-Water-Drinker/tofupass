const linkClass = 'text-[#6BBF59] dark:text-[#7DD668] hover:text-[#4A9F3F] underline underline-offset-2 font-bold transition-colors';
const gitClass = 'text-[#6BBF59] dark:text-[#7DD668] underline underline-offset-2 font-bold';

const githubSite = `<a href="https://github.com/Tofu-Water-Drinker/tofupass" target="_blank" rel="noopener noreferrer" class="${gitClass}">GitHub</a>`;
const githubApi = `<a href="https://github.com/Tofu-Water-Drinker/tofupass-api" target="_blank" rel="noopener noreferrer" class="${gitClass}">API server</a>`;

const supportLink = (label) => `<br /><a href="https://ko-fi.com/tofupass" target="_blank" rel="noopener noreferrer" class="faq-support-link">${label}</a>`;
const passphraseLink = (href, label) => `<a href="${href}" class="${linkClass}">${label}</a>`;
const privacyLink = (href, label) => `<a href="${href}" class="${linkClass}">${label}</a>`;
const apiLink = (href, label) => `<a href="${href}" class="${linkClass}">${label}</a>`;

const section = (label, labelClass, dividerColor, items) => ({
  label,
  labelClass,
  dividerColor,
  items,
});

module.exports = {
  en: {
    heading: 'About',
    tagline: 'Everything you might want to know.',
    sections: [
      section('About TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'What is TofuPass?',
          answer: ['A privacy-first password generator for human handoff moments. It makes readable passwords that are easier to say, type, teach, reset, print, or share temporarily. It is not a password manager and does not store, sync, autofill, or remember passwords.'],
        },
        {
          question: 'Why is it called TofuPass?',
          answer: ['My handle is "TofuWater," so "TofuPass" was the obvious choice. The fact that it sounds like "Tough Pass" was a happy accident I now claim was intentional.'],
        },
        {
          question: 'Who built this?',
          answer: ['Me - Matthew, a.k.a. TofuWater. Service Desk Technician by day, cybersecurity tinkerer by night. I built TofuPass because password resets, device logins, and support calls often need something safer than a reused word but kinder than random character soup.'],
        },
        {
          question: 'Is it free? How do you make money?',
          answer: [`Free to use. No ads, no premium tier, no analytics, and no data to sell. TofuPass is a small passion project I run at a happy loss. If you want to toss a few dollars toward hosting, stickers, caffeine, or Miso's snack fund, there's a Ko-Fi link below. No pressure, no nags, and no features locked behind it.${supportLink('Support TofuPass on Ko-Fi')}`],
        },
        {
          question: 'Is TofuPass open source?',
          answer: [
            `Yes - both halves of it. The site's HTML, CSS, and JavaScript are on ${githubSite}, and the backend ${githubApi} that powers <code>/api/*</code> is public too. Both are under the <strong>GNU GPL v3</strong>, so you can audit exactly what runs in your browser <em>and</em> what happens on the server, fork either one, and modify it - as long as your fork stays open-source under the same license. The frontend's curated word lists are kept private to keep password outputs less predictable, but the generation logic - including the use of <code>crypto.getRandomValues()</code> - is fully visible.`,
            `The <strong>TofuPass</strong> name and the Miso mascot (tofu, alert, and excited artwork) are <strong>all rights reserved</strong> and not covered by the GPL. You're welcome to fork the code - just bring your own branding and mascot when you publish.`,
          ],
        },
      ]),
      section('How it works', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'How does password generation work?',
          answer: ['TofuPass combines curated word lists with numbers and symbols using <code>crypto.getRandomValues()</code> for browser randomness. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 words + symbol + number. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 words + symbol + number. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 words + symbol + number.'],
        },
        {
          question: 'How secure are the passwords?',
          answer: [`Soft is easiest to type and best for low-risk, temporary, or throwaway uses. Firm is the recommended default for most human-readable handoff situations. Extra Firm is the stronger choice for longer-lived or more important credentials when the site accepts the length. For long lowercase secrets, use the dedicated ${passphraseLink('/passphrases/', 'Passphrases')} page.`],
        },
        {
          question: 'Why words instead of random characters?',
          answer: ['<code>DancingKoalaRiver!73</code> is far easier to read over the phone, type into a TV keyboard, or hand to a student than <code>j2#Xp9$k</code>, while still meeting the capital, symbol, and number rules many forms demand.'],
        },
      ]),
      section('Security & Privacy', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'Is generating passwords online safe?',
          answer: ['For the main web generator, yes. Passwords are generated locally in your browser and are not sent to TofuPass servers. The page keeps generating after it has loaded, even without a connection. The public API is different: it generates server-side and returns a password in the response.'],
        },
        {
          question: 'Does TofuPass track anything?',
          answer: [`No analytics, no advertising cookies, no tracking pixels, and no account system. Some pages load third-party assets such as fonts and front-end libraries, which the ${privacyLink('/privacy/', 'privacy policy')} explains.`],
        },
        {
          question: 'Should I use a password manager too?',
          answer: ['Yes. Use a real password manager for most passwords. Use TofuPass when a password needs to be read, typed, spoken, taught, printed, reset, or shared temporarily. Then store any long-term secret in your password manager.'],
        },
      ]),
      section('Technical', 'faq-label-yellow', null, [
        {
          question: 'What RNG does TofuPass use?',
          answer: ['The web generator uses the Web Crypto API\'s <code>crypto.getRandomValues()</code>, a cryptographically secure random number generator built into modern browsers. The API backend uses Node\'s cryptographic random functions server-side.'],
        },
        {
          question: 'Is there an API?',
          answer: [`Yes. Free, no auth required. <code>GET tofupass.com/api/password</code> for a single password, <code>GET tofupass.com/api/passphrase?count=4</code> for a passphrase. See the ${apiLink('/api/', 'API docs')} for details.`],
        },
        {
          question: 'How often should I change my passwords?',
          answer: ['Only when you think one has been compromised. NIST recommends against forced rotation - it encourages weak, predictable patterns. Use strong, unique passwords and change them when you need to, not on a schedule.'],
        },
      ]),
    ],
  },

  es: {
    heading: 'Acerca de',
    tagline: 'Todo lo que tal vez quieras saber.',
    sections: [
      section('Sobre TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: '¿Qué es TofuPass?',
          answer: ['Un generador de contraseñas centrado en la privacidad para esos momentos en los que una persona tiene que entregar una contraseña. Crea contraseñas legibles que son más fáciles de decir, escribir, enseñar, restablecer, imprimir o compartir temporalmente. No es un gestor de contraseñas y no guarda, sincroniza, autocompleta ni recuerda contraseñas.'],
        },
        {
          question: '¿Por qué se llama TofuPass?',
          answer: ['Mi nombre en línea es "TofuWater", así que "TofuPass" fue la opción obvia. Que suene como "Tough Pass" fue un accidente feliz que ahora digo que fue intencional.'],
        },
        {
          question: '¿Quién lo construyó?',
          answer: ['Yo: Matthew, también conocido como TofuWater. Técnico de Service Desk de día y curioso de ciberseguridad de noche. Construí TofuPass porque los restablecimientos, inicios de sesión en dispositivos y llamadas de soporte a menudo necesitan algo más seguro que una palabra reutilizada, pero más amable que una sopa de caracteres aleatorios.'],
        },
        {
          question: '¿Es gratis? ¿Cómo ganas dinero?',
          answer: [`Es gratis. Sin anuncios, sin plan premium, sin analítica y sin datos para vender. TofuPass es un proyecto personal que mantengo con gusto aunque cueste dinero. Si quieres aportar unos dólares para hosting, stickers, cafeína o el fondo de snacks de Miso, abajo hay un enlace de Ko-Fi. Sin presión, sin recordatorios molestos y sin funciones bloqueadas por apoyar.${supportLink('Apoya TofuPass en Ko-Fi')}`],
        },
        {
          question: '¿TofuPass es de código abierto?',
          answer: [
            `Sí, las dos partes. El HTML, CSS y JavaScript del sitio están en ${githubSite}, y el backend ${githubApi} que alimenta <code>/api/*</code> también es público. Ambos usan la licencia <strong>GNU GPL v3</strong>, así que puedes revisar exactamente qué se ejecuta en tu navegador <em>y</em> qué pasa en el servidor, hacer un fork y modificarlo, siempre que tu fork siga siendo de código abierto bajo la misma licencia. Las listas curadas de palabras del frontend se mantienen privadas para que las salidas sean menos predecibles, pero la lógica de generación, incluido <code>crypto.getRandomValues()</code>, es visible.`,
            `El nombre <strong>TofuPass</strong> y la mascota Miso (arte de tofu, alerta y emoción) tienen <strong>todos los derechos reservados</strong> y no están cubiertos por la GPL. Puedes hacer fork del código; solo usa tu propia marca y mascota si publicas tu versión.`,
          ],
        },
      ]),
      section('Cómo funciona', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: '¿Cómo funciona la generación de contraseñas?',
          answer: ['TofuPass combina listas curadas de palabras con números y símbolos usando <code>crypto.getRandomValues()</code> para la aleatoriedad del navegador. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 palabras + símbolo + número. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 palabras + símbolo + número. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 palabras + símbolo + número.'],
        },
        {
          question: '¿Qué tan seguras son las contraseñas?',
          answer: [`Soft es la más fácil de escribir y sirve mejor para usos de bajo riesgo, temporales o desechables. Firm es la opción recomendada para la mayoría de entregas legibles por humanos. Extra Firm es más fuerte para credenciales más importantes o de mayor duración cuando el sitio acepta la longitud. Para secretos largos en minúsculas, usa la página dedicada de ${passphraseLink('/es/passphrases/', 'frases de contraseña')}.`],
        },
        {
          question: '¿Por qué palabras en vez de caracteres aleatorios?',
          answer: ['<code>DancingKoalaRiver!73</code> es mucho más fácil de leer por teléfono, escribir en un teclado de TV o entregar a un estudiante que <code>j2#Xp9$k</code>, y aun así cumple las reglas de mayúscula, símbolo y número que piden muchos formularios.'],
        },
      ]),
      section('Seguridad y privacidad', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: '¿Es seguro generar contraseñas en línea?',
          answer: ['Para el generador web principal, sí. Las contraseñas se generan localmente en tu navegador y no se envían a los servidores de TofuPass. La página sigue generando después de cargar, incluso sin conexión. La API pública es diferente: genera del lado del servidor y devuelve una contraseña en la respuesta.'],
        },
        {
          question: '¿TofuPass rastrea algo?',
          answer: [`No hay analítica, cookies de publicidad, píxeles de seguimiento ni sistema de cuentas. Algunas páginas cargan recursos de terceros, como fuentes y librerías de frontend; eso se explica en la ${privacyLink('/es/privacy/', 'política de privacidad')}.`],
        },
        {
          question: '¿También debería usar un gestor de contraseñas?',
          answer: ['Sí. Usa un gestor de contraseñas real para la mayoría de tus contraseñas. Usa TofuPass cuando una contraseña tenga que leerse, escribirse, decirse, enseñarse, imprimirse, restablecerse o compartirse temporalmente. Después guarda cualquier secreto duradero en tu gestor.'],
        },
      ]),
      section('Técnico', 'faq-label-yellow', null, [
        {
          question: '¿Qué RNG usa TofuPass?',
          answer: ['El generador web usa la Web Crypto API, <code>crypto.getRandomValues()</code>, un generador criptográficamente seguro integrado en los navegadores modernos. El backend de la API usa funciones criptográficas aleatorias de Node del lado del servidor.'],
        },
        {
          question: '¿Hay una API?',
          answer: [`Sí. Es gratis y no requiere autenticación. <code>GET tofupass.com/api/password</code> para una contraseña individual, <code>GET tofupass.com/api/passphrase?count=4</code> para una frase de contraseña. Consulta la ${apiLink('/es/api/', 'documentación de la API')} para más detalles.`],
        },
        {
          question: '¿Cada cuánto debería cambiar mis contraseñas?',
          answer: ['Solo cuando creas que una se comprometió. NIST recomienda evitar la rotación forzada porque fomenta patrones débiles y predecibles. Usa contraseñas fuertes y únicas, y cámbialas cuando haga falta, no por calendario.'],
        },
      ]),
    ],
  },

  pt: {
    heading: 'Sobre',
    tagline: 'Tudo o que talvez você queira saber.',
    sections: [
      section('Sobre o TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'O que é o TofuPass?',
          answer: ['Um gerador de senhas com foco em privacidade para momentos em que uma pessoa precisa repassar uma senha. Ele cria senhas legíveis, mais fáceis de falar, digitar, ensinar, redefinir, imprimir ou compartilhar temporariamente. Não é um gerenciador de senhas e não armazena, sincroniza, autocompleta nem lembra senhas.'],
        },
        {
          question: 'Por que se chama TofuPass?',
          answer: ['Meu nome online é "TofuWater", então "TofuPass" foi a escolha óbvia. O fato de soar como "Tough Pass" foi um acidente feliz que agora eu digo que foi intencional.'],
        },
        {
          question: 'Quem criou isso?',
          answer: ['Eu: Matthew, também conhecido como TofuWater. Técnico de Service Desk durante o dia e curioso de cibersegurança à noite. Criei o TofuPass porque redefinições de senha, logins de dispositivos e chamadas de suporte muitas vezes precisam de algo mais seguro que uma palavra reutilizada, mas mais amigável que uma sopa de caracteres aleatórios.'],
        },
        {
          question: 'É grátis? Como você ganha dinheiro?',
          answer: [`É grátis para usar. Sem anúncios, sem plano premium, sem analytics e sem dados para vender. TofuPass é um pequeno projeto pessoal que mantenho felizmente no prejuízo. Se quiser contribuir com alguns dólares para hospedagem, adesivos, cafeína ou o fundo de lanches da Miso, há um link do Ko-Fi abaixo. Sem pressão, sem cobranças e sem recursos bloqueados por apoio.${supportLink('Apoie o TofuPass no Ko-Fi')}`],
        },
        {
          question: 'O TofuPass é open source?',
          answer: [
            `Sim, as duas partes. O HTML, CSS e JavaScript do site estão no ${githubSite}, e o backend ${githubApi} que alimenta <code>/api/*</code> também é público. Ambos estão sob a licença <strong>GNU GPL v3</strong>, então você pode auditar exatamente o que roda no navegador <em>e</em> o que acontece no servidor, fazer fork e modificar, desde que o fork continue open source sob a mesma licença. As listas curadas de palavras do frontend ficam privadas para manter as saídas menos previsíveis, mas a lógica de geração, incluindo <code>crypto.getRandomValues()</code>, é totalmente visível.`,
            `O nome <strong>TofuPass</strong> e a mascote Miso (arte de tofu, alerta e empolgação) têm <strong>todos os direitos reservados</strong> e não são cobertos pela GPL. Você pode fazer fork do código; só traga sua própria marca e mascote ao publicar.`,
          ],
        },
      ]),
      section('Como funciona', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'Como funciona a geração de senhas?',
          answer: ['TofuPass combina listas curadas de palavras com números e símbolos usando <code>crypto.getRandomValues()</code> para a aleatoriedade no navegador. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 palavras + símbolo + número. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 palavras + símbolo + número. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 palavras + símbolo + número.'],
        },
        {
          question: 'Quão seguras são as senhas?',
          answer: [`Soft é a mais fácil de digitar e funciona melhor para usos temporários, descartáveis ou de baixo risco. Firm é o padrão recomendado para a maioria das entregas legíveis por humanos. Extra Firm é a opção mais forte para credenciais mais importantes ou de vida mais longa quando o site aceita o tamanho. Para segredos longos em minúsculas, use a página dedicada de ${passphraseLink('/pt/passphrases/', 'frases-senha')}.`],
        },
        {
          question: 'Por que palavras em vez de caracteres aleatórios?',
          answer: ['<code>DancingKoalaRiver!73</code> é muito mais fácil de ler pelo telefone, digitar em um teclado de TV ou entregar a um estudante do que <code>j2#Xp9$k</code>, enquanto ainda atende às regras de maiúscula, símbolo e número que muitos formulários exigem.'],
        },
      ]),
      section('Segurança e privacidade', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'É seguro gerar senhas online?',
          answer: ['Para o gerador web principal, sim. As senhas são geradas localmente no navegador e não são enviadas aos servidores do TofuPass. A página continua gerando depois de carregada, mesmo sem conexão. A API pública é diferente: ela gera no servidor e devolve uma senha na resposta.'],
        },
        {
          question: 'O TofuPass rastreia alguma coisa?',
          answer: [`Sem analytics, sem cookies de publicidade, sem pixels de rastreamento e sem sistema de contas. Algumas páginas carregam recursos de terceiros, como fontes e bibliotecas de frontend; isso é explicado na ${privacyLink('/pt/privacy/', 'política de privacidade')}.`],
        },
        {
          question: 'Também devo usar um gerenciador de senhas?',
          answer: ['Sim. Use um gerenciador de senhas real para a maioria das senhas. Use o TofuPass quando uma senha precisar ser lida, digitada, falada, ensinada, impressa, redefinida ou compartilhada temporariamente. Depois salve qualquer segredo de longo prazo no seu gerenciador.'],
        },
      ]),
      section('Técnico', 'faq-label-yellow', null, [
        {
          question: 'Qual RNG o TofuPass usa?',
          answer: ['O gerador web usa a Web Crypto API, <code>crypto.getRandomValues()</code>, um gerador de números aleatórios criptograficamente seguro integrado aos navegadores modernos. O backend da API usa funções criptográficas aleatórias do Node no servidor.'],
        },
        {
          question: 'Existe uma API?',
          answer: [`Sim. Gratuita e sem autenticação. <code>GET tofupass.com/api/password</code> para uma senha individual, <code>GET tofupass.com/api/passphrase?count=4</code> para uma frase-senha. Veja a ${apiLink('/pt/api/', 'documentação da API')} para detalhes.`],
        },
        {
          question: 'Com que frequência devo trocar minhas senhas?',
          answer: ['Somente quando você achar que uma foi comprometida. O NIST recomenda evitar rotação forçada porque ela incentiva padrões fracos e previsíveis. Use senhas fortes e únicas, e troque quando precisar, não por agenda.'],
        },
      ]),
    ],
  },

  fr: {
    heading: 'À propos de',
    tagline: 'Tout ce que vous pourriez vouloir savoir.',
    sections: [
      section('À propos de TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'Qu’est-ce que TofuPass ?',
          answer: ['Un générateur de mots de passe axé sur la confidentialité pour les moments où un humain doit transmettre un secret. Il crée des mots de passe lisibles, plus faciles à dire, taper, enseigner, réinitialiser, imprimer ou partager temporairement. Ce n’est pas un gestionnaire de mots de passe et il ne stocke, synchronise, remplit automatiquement ni mémorise les mots de passe.'],
        },
        {
          question: 'Pourquoi ce nom, TofuPass ?',
          answer: ['Mon pseudo est "TofuWater", donc "TofuPass" était le choix évident. Le fait que cela sonne comme "Tough Pass" était un heureux hasard que je revendique maintenant comme intentionnel.'],
        },
        {
          question: 'Qui a construit ça ?',
          answer: ['Moi : Matthew, alias TofuWater. Technicien Service Desk le jour, bidouilleur cybersécurité la nuit. J’ai créé TofuPass parce que les réinitialisations, les connexions d’appareils et les appels de support ont souvent besoin de quelque chose de plus sûr qu’un mot réutilisé, mais plus humain qu’une soupe de caractères aléatoires.'],
        },
        {
          question: 'Est-ce gratuit ? Comment gagnez-vous de l’argent ?',
          answer: [`L’utilisation est gratuite. Pas de publicité, pas d’offre premium, pas d’analytics et aucune donnée à vendre. TofuPass est un petit projet passion que je maintiens joyeusement à perte. Si vous voulez donner quelques dollars pour l’hébergement, des autocollants, la caféine ou le fonds de snacks de Miso, un lien Ko-Fi est ci-dessous. Pas de pression, pas de relances et aucune fonctionnalité bloquée derrière un don.${supportLink('Soutenir TofuPass sur Ko-Fi')}`],
        },
        {
          question: 'TofuPass est-il open source ?',
          answer: [
            `Oui, les deux parties. Le HTML, le CSS et le JavaScript du site sont sur ${githubSite}, et le backend ${githubApi} qui alimente <code>/api/*</code> est public lui aussi. Les deux sont sous licence <strong>GNU GPL v3</strong>, vous pouvez donc auditer ce qui s’exécute dans votre navigateur <em>et</em> ce qui se passe sur le serveur, forker l’un ou l’autre et les modifier, tant que votre fork reste open source sous la même licence. Les listes de mots du frontend restent privées pour rendre les sorties moins prévisibles, mais la logique de génération, y compris <code>crypto.getRandomValues()</code>, est entièrement visible.`,
            `Le nom <strong>TofuPass</strong> et la mascotte Miso (illustrations tofu, alerte et enthousiaste) sont <strong>tous droits réservés</strong> et ne sont pas couverts par la GPL. Vous pouvez forker le code ; utilisez simplement votre propre marque et votre propre mascotte si vous publiez.`,
          ],
        },
      ]),
      section('Fonctionnement', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'Comment fonctionne la génération de mots de passe ?',
          answer: ['TofuPass combine des listes de mots sélectionnées avec des nombres et des symboles, en utilisant <code>crypto.getRandomValues()</code> pour l’aléatoire du navigateur. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 mots + symbole + nombre. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 mots + symbole + nombre. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 mots + symbole + nombre.'],
        },
        {
          question: 'Ces mots de passe sont-ils sûrs ?',
          answer: [`Soft est le plus facile à taper et convient aux usages temporaires, jetables ou à faible risque. Firm est le choix recommandé pour la plupart des transmissions lisibles par des humains. Extra Firm est plus fort pour des identifiants plus importants ou plus durables lorsque le site accepte la longueur. Pour de longs secrets en minuscules, utilisez la page dédiée aux ${passphraseLink('/fr/passphrases/', 'phrases de passe')}.`],
        },
        {
          question: 'Pourquoi des mots plutôt que des caractères aléatoires ?',
          answer: ['<code>DancingKoalaRiver!73</code> est bien plus facile à lire au téléphone, à taper sur un clavier de télévision ou à donner à un étudiant que <code>j2#Xp9$k</code>, tout en respectant les règles de majuscule, symbole et nombre demandées par de nombreux formulaires.'],
        },
      ]),
      section('Sécurité et confidentialité', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'Générer des mots de passe en ligne est-il sûr ?',
          answer: ['Pour le générateur web principal, oui. Les mots de passe sont générés localement dans votre navigateur et ne sont pas envoyés aux serveurs TofuPass. La page continue à générer après son chargement, même sans connexion. L’API publique est différente : elle génère côté serveur et renvoie un mot de passe dans la réponse.'],
        },
        {
          question: 'TofuPass suit-il quelque chose ?',
          answer: [`Pas d’analytics, pas de cookies publicitaires, pas de pixels de suivi et pas de système de compte. Certaines pages chargent des ressources tierces, comme des polices et des bibliothèques frontend ; la ${privacyLink('/fr/privacy/', 'politique de confidentialité')} l’explique.`],
        },
        {
          question: 'Dois-je aussi utiliser un gestionnaire de mots de passe ?',
          answer: ['Oui. Utilisez un vrai gestionnaire de mots de passe pour la plupart de vos mots de passe. Utilisez TofuPass lorsqu’un mot de passe doit être lu, tapé, prononcé, enseigné, imprimé, réinitialisé ou partagé temporairement. Ensuite, stockez tout secret durable dans votre gestionnaire.'],
        },
      ]),
      section('Technique', 'faq-label-yellow', null, [
        {
          question: 'Quel RNG TofuPass utilise-t-il ?',
          answer: ['Le générateur web utilise la Web Crypto API, <code>crypto.getRandomValues()</code>, un générateur aléatoire cryptographiquement sûr intégré aux navigateurs modernes. Le backend de l’API utilise les fonctions aléatoires cryptographiques de Node côté serveur.'],
        },
        {
          question: 'Y a-t-il une API ?',
          answer: [`Oui. Gratuite, sans authentification. <code>GET tofupass.com/api/password</code> pour un seul mot de passe, <code>GET tofupass.com/api/passphrase?count=4</code> pour une phrase de passe. Consultez la ${apiLink('/fr/api/', 'documentation de l’API')} pour les détails.`],
        },
        {
          question: 'À quelle fréquence dois-je changer mes mots de passe ?',
          answer: ['Seulement lorsque vous pensez qu’un mot de passe a été compromis. Le NIST déconseille la rotation forcée, car elle encourage des schémas faibles et prévisibles. Utilisez des mots de passe forts et uniques, et changez-les quand c’est nécessaire, pas selon un calendrier.'],
        },
      ]),
    ],
  },

  de: {
    heading: 'Über',
    tagline: 'Alles, was du vielleicht wissen möchtest.',
    sections: [
      section('Über TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'Was ist TofuPass?',
          answer: ['Ein datenschutzfreundlicher Passwortgenerator für Momente, in denen ein Mensch ein Passwort weitergeben muss. Er erstellt lesbare Passwörter, die sich leichter sagen, tippen, erklären, zurücksetzen, drucken oder vorübergehend teilen lassen. Er ist kein Passwortmanager und speichert, synchronisiert, füllt oder merkt sich keine Passwörter.'],
        },
        {
          question: 'Warum heißt es TofuPass?',
          answer: ['Mein Handle ist "TofuWater", also war "TofuPass" die naheliegende Wahl. Dass es wie "Tough Pass" klingt, war ein glücklicher Zufall, den ich inzwischen als Absicht ausgebe.'],
        },
        {
          question: 'Wer hat das gebaut?',
          answer: ['Ich: Matthew, auch bekannt als TofuWater. Tagsüber Service-Desk-Techniker, nachts Cybersicherheits-Tüftler. Ich habe TofuPass gebaut, weil Passwort-Resets, Geräte-Logins und Supportanrufe oft etwas Sichereres als ein wiederverwendetes Wort brauchen, aber etwas Freundlicheres als zufällige Zeichensuppe.'],
        },
        {
          question: 'Ist es kostenlos? Wie verdienst du Geld?',
          answer: [`Die Nutzung ist kostenlos. Keine Werbung, kein Premium-Tarif, keine Analysen und keine Daten zum Verkaufen. TofuPass ist ein kleines Herzensprojekt, das ich gerne mit Verlust betreibe. Wenn du ein paar Dollar für Hosting, Sticker, Koffein oder Misos Snackkasse geben möchtest, gibt es unten einen Ko-Fi-Link. Kein Druck, keine Nerverei und keine Funktionen hinter einer Bezahlschranke.${supportLink('TofuPass auf Ko-Fi unterstützen')}`],
        },
        {
          question: 'Ist TofuPass Open Source?',
          answer: [
            `Ja, beide Hälften. HTML, CSS und JavaScript der Website liegen auf ${githubSite}, und der Backend-${githubApi}, der <code>/api/*</code> betreibt, ist ebenfalls öffentlich. Beides steht unter der <strong>GNU GPL v3</strong>. Du kannst also prüfen, was in deinem Browser läuft <em>und</em> was auf dem Server passiert, forken und ändern, solange dein Fork unter derselben Lizenz open source bleibt. Die kuratierten Wortlisten des Frontends bleiben privat, damit Ausgaben weniger vorhersehbar sind, aber die Generierungslogik, einschließlich <code>crypto.getRandomValues()</code>, ist vollständig sichtbar.`,
            `Der Name <strong>TofuPass</strong> und das Miso-Maskottchen (Tofu-, Alarm- und Begeistert-Artwork) sind <strong>alle Rechte vorbehalten</strong> und nicht von der GPL abgedeckt. Du darfst den Code forken; bring beim Veröffentlichen bitte deine eigene Marke und dein eigenes Maskottchen mit.`,
          ],
        },
      ]),
      section('Wie es funktioniert', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'Wie funktioniert die Passwortgenerierung?',
          answer: ['TofuPass kombiniert kuratierte Wortlisten mit Zahlen und Symbolen und nutzt <code>crypto.getRandomValues()</code> für die Zufälligkeit im Browser. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 Wörter + Symbol + Zahl. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 Wörter + Symbol + Zahl. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 Wörter + Symbol + Zahl.'],
        },
        {
          question: 'Wie sicher sind die Passwörter?',
          answer: [`Soft ist am einfachsten zu tippen und eignet sich für risikoarme, temporäre oder Wegwerfzwecke. Firm ist die empfohlene Standardeinstellung für die meisten menschenlesbaren Übergaben. Extra Firm ist stärker für wichtigere oder länger gültige Zugangsdaten, wenn die Website die Länge akzeptiert. Für lange Kleinbuchstaben-Geheimnisse nutze die spezielle Seite für ${passphraseLink('/de/passphrases/', 'Passphrasen')}.`],
        },
        {
          question: 'Warum Wörter statt zufälliger Zeichen?',
          answer: ['<code>DancingKoalaRiver!73</code> lässt sich viel leichter am Telefon vorlesen, auf einer TV-Tastatur eingeben oder einem Schüler geben als <code>j2#Xp9$k</code>, erfüllt aber trotzdem die Regeln für Großbuchstaben, Symbol und Zahl, die viele Formulare verlangen.'],
        },
      ]),
      section('Sicherheit und Datenschutz', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'Ist das Generieren von Passwörtern online sicher?',
          answer: ['Für den normalen Webgenerator: ja. Passwörter werden lokal in deinem Browser erzeugt und nicht an TofuPass-Server gesendet. Die Seite kann nach dem Laden weiter generieren, auch ohne Verbindung. Die öffentliche API ist anders: Sie generiert serverseitig und gibt ein Passwort in der Antwort zurück.'],
        },
        {
          question: 'Trackt TofuPass irgendetwas?',
          answer: [`Keine Analysen, keine Werbe-Cookies, keine Tracking-Pixel und kein Kontosystem. Einige Seiten laden Drittanbieter-Ressourcen wie Schriftarten und Frontend-Bibliotheken; das erklärt die ${privacyLink('/de/privacy/', 'Datenschutzerklärung')}.`],
        },
        {
          question: 'Sollte ich auch einen Passwortmanager verwenden?',
          answer: ['Ja. Verwende für die meisten Passwörter einen echten Passwortmanager. Nutze TofuPass, wenn ein Passwort gelesen, getippt, gesprochen, erklärt, gedruckt, zurückgesetzt oder vorübergehend geteilt werden muss. Speichere jedes langfristige Geheimnis danach in deinem Passwortmanager.'],
        },
      ]),
      section('Technik', 'faq-label-yellow', null, [
        {
          question: 'Welchen RNG verwendet TofuPass?',
          answer: ['Der Webgenerator nutzt die Web Crypto API <code>crypto.getRandomValues()</code>, einen kryptografisch sicheren Zufallszahlengenerator in modernen Browsern. Das API-Backend nutzt serverseitig die kryptografischen Zufallsfunktionen von Node.'],
        },
        {
          question: 'Gibt es eine API?',
          answer: [`Ja. Kostenlos und ohne Authentifizierung. <code>GET tofupass.com/api/password</code> für ein einzelnes Passwort, <code>GET tofupass.com/api/passphrase?count=4</code> für eine Passphrase. Details stehen in der ${apiLink('/de/api/', 'API-Dokumentation')}.`],
        },
        {
          question: 'Wie oft sollte ich meine Passwörter ändern?',
          answer: ['Nur wenn du glaubst, dass eines kompromittiert wurde. NIST rät von erzwungener Rotation ab, weil sie schwache, vorhersehbare Muster fördert. Nutze starke, eindeutige Passwörter und ändere sie bei Bedarf, nicht nach Kalender.'],
        },
      ]),
    ],
  },

  ja: {
    heading: 'About',
    tagline: 'TofuPassについて知りたいことをまとめました。',
    sections: [
      section('TofuPassについて', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'TofuPassとは何ですか？',
          answer: ['TofuPassは、人がパスワードを渡す場面のための、プライバシー重視のパスワード生成ツールです。読み上げる、入力する、教える、リセットする、印刷する、一時的に共有するといった作業がしやすい、読みやすいパスワードを作ります。パスワードマネージャーではなく、保存、同期、自動入力、記憶はしません。'],
        },
        {
          question: 'なぜTofuPassという名前なのですか？',
          answer: ['私のハンドルネームが「TofuWater」なので、「TofuPass」は自然な名前でした。「Tough Pass」のように聞こえるのはうれしい偶然で、今では狙っていたことにしています。'],
        },
        {
          question: '誰が作りましたか？',
          answer: ['Matthew、別名TofuWaterです。昼はService Desk Technician、夜はサイバーセキュリティをいじっています。パスワードリセット、デバイスログイン、サポート通話では、使い回しの単語より安全で、ランダムな文字列より人にやさしいものが必要になることが多いので、TofuPassを作りました。'],
        },
        {
          question: '無料ですか？どうやって運営していますか？',
          answer: [`無料で使えます。広告、プレミアムプラン、分析、販売するデータはありません。TofuPassは、赤字でも楽しく続けている小さな個人プロジェクトです。ホスティング、ステッカー、カフェイン、Misoのおやつ代に数ドル投げたい場合は、下にKo-Fiリンクがあります。圧はありませんし、寄付しないと使えない機能もありません。${supportLink('Ko-FiでTofuPassを支援する')}`],
        },
        {
          question: 'TofuPassはオープンソースですか？',
          answer: [
            `はい、両方の部分が公開されています。サイトのHTML、CSS、JavaScriptは${githubSite}にあり、<code>/api/*</code>を動かすバックエンドの${githubApi}も公開されています。どちらも<strong>GNU GPL v3</strong>です。ブラウザで何が動くか<em>だけでなく</em>サーバーで何が起きるかも監査でき、同じライセンスでオープンソースを保つ限り、フォークして変更できます。フロントエンドの curated word list は出力を予測しにくくするため非公開ですが、<code>crypto.getRandomValues()</code>を含む生成ロジックは完全に見えます。`,
            `<strong>TofuPass</strong>の名前とMisoマスコット（tofu、alert、excitedのアート）は<strong>all rights reserved</strong>で、GPLの対象ではありません。コードのフォークは歓迎ですが、公開する場合は自分のブランドとマスコットを用意してください。`,
          ],
        },
      ]),
      section('仕組み', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'パスワード生成はどのように動きますか？',
          answer: ['TofuPassは、厳選した単語リストに数字と記号を組み合わせ、ブラウザの乱数として<code>crypto.getRandomValues()</code>を使います。<span class="text-[#FF7A7A] font-bold">Soft</span> = 2語 + 記号 + 数字。<span class="text-[#6BBF59] font-bold">Firm</span> = 3語 + 記号 + 数字。<span class="text-[#E6A800] font-bold">Extra Firm</span> = 4語 + 記号 + 数字。'],
        },
        {
          question: 'パスワードの強さはどのくらいですか？',
          answer: [`Softは入力しやすく、低リスク、一時的、使い捨ての用途に向いています。Firmは、人が読んで渡す多くの場面でおすすめの標準です。Extra Firmは、サイトが長さを受け入れる場合、より長く使う重要な資格情報向けの強い選択肢です。長い小文字の秘密には、専用の${passphraseLink('/ja/passphrases/', 'パスフレーズ')}ページを使ってください。`],
        },
        {
          question: 'なぜランダムな文字ではなく単語なのですか？',
          answer: ['<code>DancingKoalaRiver!73</code>は、<code>j2#Xp9$k</code>よりも電話で読み上げたり、テレビのキーボードで入力したり、学生に渡したりしやすいです。それでも、多くのフォームが求める大文字、記号、数字のルールを満たせます。'],
        },
      ]),
      section('セキュリティとプライバシー', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'オンラインでパスワードを生成しても安全ですか？',
          answer: ['メインのWeb生成ツールについては、はい。パスワードはブラウザ内でローカルに生成され、TofuPassのサーバーへ送信されません。ページを読み込んだ後は、接続がなくても生成できます。公開APIは別です。APIはサーバー側で生成し、レスポンスとしてパスワードを返します。'],
        },
        {
          question: 'TofuPassは何かを追跡しますか？',
          answer: [`分析、広告Cookie、トラッキングピクセル、アカウントシステムはありません。一部のページではフォントやフロントエンドライブラリなどの第三者アセットを読み込みます。詳しくは${privacyLink('/ja/privacy/', 'プライバシーポリシー')}で説明しています。`],
        },
        {
          question: 'パスワードマネージャーも使うべきですか？',
          answer: ['はい。ほとんどのパスワードには本物のパスワードマネージャーを使ってください。読み上げる、入力する、話す、教える、印刷する、リセットする、一時的に共有するといった場面でTofuPassを使い、長く使う秘密はパスワードマネージャーに保存してください。'],
        },
      ]),
      section('技術情報', 'faq-label-yellow', null, [
        {
          question: 'TofuPassはどのRNGを使いますか？',
          answer: ['Web生成ツールは、現代のブラウザに組み込まれた暗号学的に安全な乱数生成機能であるWeb Crypto APIの<code>crypto.getRandomValues()</code>を使います。APIバックエンドは、サーバー側でNodeの暗号学的乱数機能を使います。'],
        },
        {
          question: 'APIはありますか？',
          answer: [`はい。無料で、認証は不要です。単一のパスワードには<code>GET tofupass.com/api/password</code>、パスフレーズには<code>GET tofupass.com/api/passphrase?count=4</code>を使います。詳細は${apiLink('/ja/api/', 'APIドキュメント')}をご覧ください。`],
        },
        {
          question: 'どのくらいの頻度でパスワードを変えるべきですか？',
          answer: ['漏えいしたと思うときだけ変更してください。NISTは強制的な定期変更を推奨していません。弱く予測しやすいパターンを生みやすいからです。強く一意なパスワードを使い、スケジュールではなく必要なときに変更してください。'],
        },
      ]),
    ],
  },

  'zh-cn': {
    heading: '关于',
    tagline: '你可能想知道的内容都在这里。',
    sections: [
      section('关于 TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'TofuPass 是什么？',
          answer: ['TofuPass 是一个注重隐私的密码生成器，专门用于需要人工交接密码的场景。它生成更容易读、说、输入、教学、重置、打印或临时分享的可读密码。它不是密码管理器，不会存储、同步、自动填充或记住密码。'],
        },
        {
          question: '为什么叫 TofuPass？',
          answer: ['我的网名是“TofuWater”，所以“TofuPass”是很自然的选择。它听起来像“Tough Pass”这件事算是一个快乐的巧合，现在我就当它是有意设计的。'],
        },
        {
          question: '是谁做的？',
          answer: ['我，Matthew，也就是 TofuWater。白天做 Service Desk Technician，晚上折腾网络安全。我做 TofuPass，是因为密码重置、设备登录和支持电话经常需要比重复使用的单词更安全、又比随机字符汤更友好的东西。'],
        },
        {
          question: '免费吗？怎么赚钱？',
          answer: [`可以免费使用。没有广告、没有高级套餐、没有分析统计，也没有可出售的数据。TofuPass 是我开心地亏钱维护的小项目。如果你想为托管、贴纸、咖啡因或 Miso 的零食基金投几美元，下面有 Ko-Fi 链接。没有压力，没有催促，也没有靠捐助解锁的功能。${supportLink('在 Ko-Fi 支持 TofuPass')}`],
        },
        {
          question: 'TofuPass 是开源的吗？',
          answer: [
            `是的，两部分都是。网站的 HTML、CSS 和 JavaScript 在 ${githubSite} 上，驱动 <code>/api/*</code> 的后端 ${githubApi} 也是公开的。两者都使用 <strong>GNU GPL v3</strong>，所以你可以审计浏览器里实际运行的内容<em>以及</em>服务器上发生的事情，也可以 fork 和修改，只要你的 fork 继续按同一许可证开源。前端精选词表保持私有，以降低输出可预测性，但生成逻辑，包括 <code>crypto.getRandomValues()</code> 的使用，是完全可见的。`,
            `<strong>TofuPass</strong> 名称和 Miso 吉祥物（tofu、alert 和 excited 图像）<strong>保留所有权利</strong>，不属于 GPL 范围。欢迎 fork 代码；发布时请使用你自己的品牌和吉祥物。`,
          ],
        },
      ]),
      section('工作方式', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: '密码生成是怎么工作的？',
          answer: ['TofuPass 将精选词表与数字和符号组合，并使用 <code>crypto.getRandomValues()</code> 作为浏览器随机性来源。<span class="text-[#FF7A7A] font-bold">Soft</span> = 2 个词 + 符号 + 数字。<span class="text-[#6BBF59] font-bold">Firm</span> = 3 个词 + 符号 + 数字。<span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 个词 + 符号 + 数字。'],
        },
        {
          question: '这些密码有多安全？',
          answer: [`Soft 最容易输入，适合低风险、临时或一次性用途。Firm 是大多数人工交接场景的推荐默认选项。Extra Firm 更强，适合网站接受较长长度时的重要或长期凭据。对于长的小写秘密，请使用专门的${passphraseLink('/zh-cn/passphrases/', '密码短语')}页面。`],
        },
        {
          question: '为什么用单词而不是随机字符？',
          answer: ['<code>DancingKoalaRiver!73</code> 比 <code>j2#Xp9$k</code> 更容易通过电话读出来、在电视键盘上输入，或交给学生使用，同时仍然满足许多表单要求的大写字母、符号和数字规则。'],
        },
      ]),
      section('安全与隐私', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: '在线生成密码安全吗？',
          answer: ['对于主要的网页生成器，是安全的。密码在你的浏览器本地生成，不会发送到 TofuPass 服务器。页面加载后，即使没有网络连接也能继续生成。公开 API 不同：它在服务器端生成，并在响应中返回密码。'],
        },
        {
          question: 'TofuPass 会跟踪什么吗？',
          answer: [`没有分析统计、没有广告 Cookie、没有跟踪像素，也没有账户系统。有些页面会加载第三方资源，例如字体和前端库；${privacyLink('/zh-cn/privacy/', '隐私政策')}中有说明。`],
        },
        {
          question: '我还应该使用密码管理器吗？',
          answer: ['应该。大多数密码都应该使用真正的密码管理器。只有当密码需要被读取、输入、口头传达、教学、打印、重置或临时分享时，才使用 TofuPass。长期使用的秘密随后应保存到密码管理器中。'],
        },
      ]),
      section('技术', 'faq-label-yellow', null, [
        {
          question: 'TofuPass 使用什么 RNG？',
          answer: ['网页生成器使用 Web Crypto API 的 <code>crypto.getRandomValues()</code>，这是现代浏览器内置的加密安全随机数生成器。API 后端在服务器端使用 Node 的加密随机函数。'],
        },
        {
          question: '有 API 吗？',
          answer: [`有。免费，无需认证。使用 <code>GET tofupass.com/api/password</code> 获取单个密码，使用 <code>GET tofupass.com/api/passphrase?count=4</code> 获取密码短语。详情请查看${apiLink('/zh-cn/api/', 'API 文档')}。`],
        },
        {
          question: '我应该多久更换一次密码？',
          answer: ['只有在你认为密码已被泄露时才需要更换。NIST 不建议强制定期轮换，因为这会鼓励弱且可预测的模式。使用强且唯一的密码，并在需要时更换，而不是按日程更换。'],
        },
      ]),
    ],
  },

  ar: {
    heading: 'حول',
    tagline: 'كل ما قد ترغب في معرفته.',
    sections: [
      section('حول TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'ما هو TofuPass؟',
          answer: ['TofuPass هو مولد كلمات مرور يركز على الخصوصية للحظات التي يحتاج فيها شخص إلى تسليم كلمة مرور. ينشئ كلمات مرور قابلة للقراءة وأسهل في النطق والكتابة والتعليم وإعادة التعيين والطباعة أو المشاركة مؤقتا. ليس مدير كلمات مرور، ولا يخزن أو يزامن أو يملأ تلقائيا أو يتذكر كلمات المرور.'],
        },
        {
          question: 'لماذا اسمه TofuPass؟',
          answer: ['اسمي على الإنترنت هو "TofuWater"، لذلك كان "TofuPass" اختيارا واضحا. وكونه يشبه في النطق "Tough Pass" كان مصادفة سعيدة أدعي الآن أنها كانت مقصودة.'],
        },
        {
          question: 'من الذي بناه؟',
          answer: ['أنا: Matthew، المعروف أيضا باسم TofuWater. فني Service Desk في النهار ومهتم بالأمن السيبراني في الليل. بنيت TofuPass لأن عمليات إعادة تعيين كلمات المرور وتسجيلات دخول الأجهزة ومكالمات الدعم تحتاج غالبا إلى شيء أكثر أمانا من كلمة معاد استخدامها، وألطف من خليط عشوائي من الرموز.'],
        },
        {
          question: 'هل هو مجاني؟ كيف تربح المال؟',
          answer: [`الاستخدام مجاني. لا إعلانات، ولا فئة مدفوعة، ولا تحليلات، ولا بيانات للبيع. TofuPass مشروع صغير أعمل عليه بحب حتى لو كان على حسابي. إذا أردت المساهمة ببضعة دولارات للاستضافة أو الملصقات أو الكافيين أو صندوق وجبات Miso، فهناك رابط Ko-Fi أدناه. لا ضغط، ولا تذكيرات مزعجة، ولا ميزات مقفلة خلف الدعم.${supportLink('ادعم TofuPass على Ko-Fi')}`],
        },
        {
          question: 'هل TofuPass مفتوح المصدر؟',
          answer: [
            `نعم، كلا الجزأين. HTML وCSS وJavaScript الخاصة بالموقع موجودة على ${githubSite}، كما أن ${githubApi} الخلفي الذي يشغل <code>/api/*</code> عام أيضا. كلاهما تحت رخصة <strong>GNU GPL v3</strong>، لذلك يمكنك تدقيق ما يعمل في متصفحك <em>و</em> ما يحدث على الخادم، وعمل fork والتعديل، ما دام fork الخاص بك يبقى مفتوح المصدر تحت الرخصة نفسها. قوائم الكلمات المختارة في الواجهة تبقى خاصة لتقليل قابلية توقع المخرجات، لكن منطق التوليد، بما في ذلك <code>crypto.getRandomValues()</code>، ظاهر بالكامل.`,
            `اسم <strong>TofuPass</strong> وتميمة Miso (رسومات tofu وalert وexcited) <strong>جميع الحقوق محفوظة</strong> وليست مشمولة برخصة GPL. يمكنك عمل fork للكود؛ فقط استخدم علامتك وتميمتك الخاصة عند النشر.`,
          ],
        },
      ]),
      section('كيف يعمل', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'كيف يعمل توليد كلمات المرور؟',
          answer: ['يجمع TofuPass قوائم كلمات مختارة مع أرقام ورموز باستخدام <code>crypto.getRandomValues()</code> للعشوائية في المتصفح. <span class="text-[#FF7A7A] font-bold">Soft</span> = كلمتان + رمز + رقم. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 كلمات + رمز + رقم. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 كلمات + رمز + رقم.'],
        },
        {
          question: 'ما مدى أمان كلمات المرور؟',
          answer: [`Soft هي الأسهل في الكتابة والأفضل للاستخدامات منخفضة المخاطر أو المؤقتة أو التي يمكن التخلص منها. Firm هي الخيار الافتراضي الموصى به لمعظم حالات التسليم المقروءة للبشر. Extra Firm أقوى للبيانات الأكثر أهمية أو الأطول عمرا عندما يقبل الموقع الطول. للأسرار الطويلة بالأحرف الصغيرة، استخدم صفحة ${passphraseLink('/ar/passphrases/', 'عبارات المرور')} المخصصة.`],
        },
        {
          question: 'لماذا كلمات بدلا من رموز عشوائية؟',
          answer: ['<code>DancingKoalaRiver!73</code> أسهل بكثير في قراءتها عبر الهاتف أو كتابتها على لوحة مفاتيح تلفاز أو تسليمها لطالب من <code>j2#Xp9$k</code>، ومع ذلك تظل تلبي قواعد الحرف الكبير والرمز والرقم التي تطلبها نماذج كثيرة.'],
        },
      ]),
      section('الأمان والخصوصية', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'هل توليد كلمات المرور عبر الإنترنت آمن؟',
          answer: ['بالنسبة للمولد الرئيسي على الويب، نعم. يتم توليد كلمات المرور محليا في متصفحك ولا ترسل إلى خوادم TofuPass. تستمر الصفحة في التوليد بعد تحميلها حتى دون اتصال. واجهة API العامة مختلفة: فهي تولد على الخادم وتعيد كلمة مرور في الاستجابة.'],
        },
        {
          question: 'هل يتتبع TofuPass أي شيء؟',
          answer: [`لا تحليلات، ولا ملفات تعريف ارتباط إعلانية، ولا بكسلات تتبع، ولا نظام حسابات. بعض الصفحات تحمل أصولا من أطراف ثالثة مثل الخطوط ومكتبات الواجهة؛ تشرح ${privacyLink('/ar/privacy/', 'سياسة الخصوصية')} ذلك.`],
        },
        {
          question: 'هل يجب أن أستخدم مدير كلمات مرور أيضا؟',
          answer: ['نعم. استخدم مدير كلمات مرور حقيقيا لمعظم كلمات المرور. استخدم TofuPass عندما يجب قراءة كلمة مرور أو كتابتها أو قولها أو تعليمها أو طباعتها أو إعادة تعيينها أو مشاركتها مؤقتا. بعد ذلك، خزّن أي سر طويل الأمد في مدير كلمات المرور.'],
        },
      ]),
      section('تقني', 'faq-label-yellow', null, [
        {
          question: 'ما نوع RNG الذي يستخدمه TofuPass؟',
          answer: ['يستخدم مولد الويب Web Crypto API عبر <code>crypto.getRandomValues()</code>، وهو مولد أرقام عشوائية آمن تشفيريا وموجود في المتصفحات الحديثة. يستخدم backend الخاص بالـ API وظائف Node العشوائية التشفيرية على الخادم.'],
        },
        {
          question: 'هل توجد API؟',
          answer: [`نعم. مجانية ولا تحتاج إلى مصادقة. استخدم <code>GET tofupass.com/api/password</code> لكلمة مرور واحدة، و<code>GET tofupass.com/api/passphrase?count=4</code> لعبارة مرور. راجع ${apiLink('/ar/api/', 'وثائق API')} للتفاصيل.`],
        },
        {
          question: 'كم مرة يجب أن أغير كلماتي المرورية؟',
          answer: ['فقط عندما تعتقد أن إحداها تم اختراقها. توصي NIST بعدم فرض التغيير الدوري لأنه يشجع أنماطا ضعيفة ويمكن توقعها. استخدم كلمات مرور قوية وفريدة، وغيّرها عند الحاجة لا حسب جدول ثابت.'],
        },
      ]),
    ],
  },

  id: {
    heading: 'Tentang',
    tagline: 'Semua hal yang mungkin ingin kamu tahu.',
    sections: [
      section('Tentang TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'Apa itu TofuPass?',
          answer: ['TofuPass adalah pembuat kata sandi yang mengutamakan privasi untuk momen ketika manusia harus menyerahkan kata sandi. Ia membuat kata sandi yang mudah dibaca, diucapkan, diketik, diajarkan, direset, dicetak, atau dibagikan sementara. Ini bukan pengelola kata sandi dan tidak menyimpan, menyinkronkan, mengisi otomatis, atau mengingat kata sandi.'],
        },
        {
          question: 'Kenapa namanya TofuPass?',
          answer: ['Nama online saya "TofuWater", jadi "TofuPass" terasa paling jelas. Fakta bahwa bunyinya mirip "Tough Pass" adalah kebetulan menyenangkan yang sekarang saya klaim sebagai disengaja.'],
        },
        {
          question: 'Siapa yang membuat ini?',
          answer: ['Saya: Matthew, alias TofuWater. Siang hari teknisi Service Desk, malam hari pengutak-atik keamanan siber. Saya membuat TofuPass karena reset kata sandi, login perangkat, dan panggilan dukungan sering membutuhkan sesuatu yang lebih aman daripada kata yang dipakai ulang, tetapi lebih ramah daripada campuran karakter acak.'],
        },
        {
          question: 'Gratis? Bagaimana kamu menghasilkan uang?',
          answer: [`Gratis digunakan. Tidak ada iklan, tidak ada paket premium, tidak ada analytics, dan tidak ada data untuk dijual. TofuPass adalah proyek kecil yang saya jalankan dengan senang hati meski rugi. Kalau kamu ingin menyumbang beberapa dolar untuk hosting, stiker, kafein, atau dana camilan Miso, ada tautan Ko-Fi di bawah. Tidak ada tekanan, tidak ada gangguan, dan tidak ada fitur yang dikunci di balik dukungan.${supportLink('Dukung TofuPass di Ko-Fi')}`],
        },
        {
          question: 'Apakah TofuPass open source?',
          answer: [
            `Ya, kedua bagiannya. HTML, CSS, dan JavaScript situs ada di ${githubSite}, dan backend ${githubApi} yang menjalankan <code>/api/*</code> juga publik. Keduanya berada di bawah <strong>GNU GPL v3</strong>, jadi kamu bisa mengaudit apa yang berjalan di browser <em>dan</em> apa yang terjadi di server, melakukan fork, dan memodifikasinya, selama fork tetap open source dengan lisensi yang sama. Daftar kata pilihan frontend tetap privat agar output kata sandi tidak terlalu mudah diprediksi, tetapi logika generasi, termasuk penggunaan <code>crypto.getRandomValues()</code>, terlihat sepenuhnya.`,
            `Nama <strong>TofuPass</strong> dan maskot Miso (karya tofu, alert, dan excited) <strong>all rights reserved</strong> dan tidak dicakup GPL. Kamu boleh melakukan fork kode; gunakan branding dan maskot sendiri saat menerbitkan.`,
          ],
        },
      ]),
      section('Cara kerja', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'Bagaimana pembuatan kata sandi bekerja?',
          answer: ['TofuPass menggabungkan daftar kata pilihan dengan angka dan simbol menggunakan <code>crypto.getRandomValues()</code> untuk keacakan di browser. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 kata + simbol + angka. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 kata + simbol + angka. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 kata + simbol + angka.'],
        },
        {
          question: 'Seberapa aman kata sandinya?',
          answer: [`Soft paling mudah diketik dan cocok untuk penggunaan rendah risiko, sementara, atau sekali pakai. Firm adalah default yang direkomendasikan untuk sebagian besar situasi serah-terima yang harus dibaca manusia. Extra Firm lebih kuat untuk kredensial yang lebih penting atau lebih lama dipakai ketika situs menerima panjangnya. Untuk rahasia panjang huruf kecil, gunakan halaman ${passphraseLink('/id/passphrases/', 'frasa sandi')} khusus.`],
        },
        {
          question: 'Kenapa kata, bukan karakter acak?',
          answer: ['<code>DancingKoalaRiver!73</code> jauh lebih mudah dibacakan lewat telepon, diketik di keyboard TV, atau diberikan kepada siswa daripada <code>j2#Xp9$k</code>, tetapi tetap memenuhi aturan huruf besar, simbol, dan angka yang diminta banyak formulir.'],
        },
      ]),
      section('Keamanan & Privasi', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'Apakah aman membuat kata sandi online?',
          answer: ['Untuk generator web utama, ya. Kata sandi dibuat secara lokal di browser dan tidak dikirim ke server TofuPass. Halaman tetap bisa membuat kata sandi setelah dimuat, bahkan tanpa koneksi. API publik berbeda: ia membuat di sisi server dan mengembalikan kata sandi dalam respons.'],
        },
        {
          question: 'Apakah TofuPass melacak sesuatu?',
          answer: [`Tidak ada analytics, tidak ada cookie iklan, tidak ada piksel pelacak, dan tidak ada sistem akun. Beberapa halaman memuat aset pihak ketiga seperti font dan library frontend; hal itu dijelaskan di ${privacyLink('/id/privacy/', 'kebijakan privasi')}.`],
        },
        {
          question: 'Haruskah saya memakai pengelola kata sandi juga?',
          answer: ['Ya. Gunakan pengelola kata sandi sungguhan untuk sebagian besar kata sandi. Gunakan TofuPass ketika kata sandi perlu dibaca, diketik, diucapkan, diajarkan, dicetak, direset, atau dibagikan sementara. Setelah itu simpan rahasia jangka panjang di pengelola kata sandi.'],
        },
      ]),
      section('Teknis', 'faq-label-yellow', null, [
        {
          question: 'RNG apa yang digunakan TofuPass?',
          answer: ['Generator web menggunakan Web Crypto API <code>crypto.getRandomValues()</code>, generator angka acak yang aman secara kriptografis dan tersedia di browser modern. Backend API menggunakan fungsi acak kriptografis Node di sisi server.'],
        },
        {
          question: 'Apakah ada API?',
          answer: [`Ya. Gratis, tanpa auth. <code>GET tofupass.com/api/password</code> untuk satu kata sandi, <code>GET tofupass.com/api/passphrase?count=4</code> untuk frasa sandi. Lihat ${apiLink('/id/api/', 'dokumentasi API')} untuk detail.`],
        },
        {
          question: 'Seberapa sering saya harus mengganti kata sandi?',
          answer: ['Hanya ketika kamu merasa salah satunya telah disusupi. NIST tidak merekomendasikan rotasi paksa karena mendorong pola yang lemah dan mudah ditebak. Gunakan kata sandi yang kuat dan unik, lalu ganti saat perlu, bukan berdasarkan jadwal.'],
        },
      ]),
    ],
  },

  hi: {
    heading: 'के बारे में',
    tagline: 'जो बातें आप जानना चाहें, वे सब यहां हैं।',
    sections: [
      section('TofuPass के बारे में', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'TofuPass क्या है?',
          answer: ['TofuPass privacy-first password generator है, खासकर उन moments के लिए जब किसी इंसान को password hand off करना होता है। यह readable passwords बनाता है जिन्हें बोलना, type करना, सिखाना, reset करना, print करना या temporarily share करना आसान होता है। यह password manager नहीं है और passwords को store, sync, autofill या remember नहीं करता।'],
        },
        {
          question: 'इसे TofuPass क्यों कहा जाता है?',
          answer: ['मेरा handle "TofuWater" है, इसलिए "TofuPass" obvious choice था। यह "Tough Pass" जैसा सुनाई देता है, यह एक happy accident था जिसे अब मैं intentional मानता हूं।'],
        },
        {
          question: 'इसे किसने बनाया?',
          answer: ['मैंने: Matthew, यानी TofuWater। दिन में Service Desk Technician, रात में cybersecurity tinkerer। मैंने TofuPass इसलिए बनाया क्योंकि password resets, device logins और support calls में अक्सर reused word से ज्यादा सुरक्षित, लेकिन random character soup से ज्यादा friendly चीज चाहिए होती है।'],
        },
        {
          question: 'क्या यह free है? आप पैसे कैसे कमाते हैं?',
          answer: [`Use करने के लिए free है। कोई ads नहीं, कोई premium tier नहीं, कोई analytics नहीं, और बेचने के लिए कोई data नहीं। TofuPass एक छोटा passion project है जिसे मैं खुशी से loss पर चलाता हूं। अगर आप hosting, stickers, caffeine या Miso के snack fund के लिए कुछ dollars देना चाहें, तो नीचे Ko-Fi link है। कोई pressure नहीं, कोई nags नहीं, और कोई features support के पीछे locked नहीं हैं।${supportLink('Ko-Fi पर TofuPass को support करें')}`],
        },
        {
          question: 'क्या TofuPass open source है?',
          answer: [
            `हां, दोनों हिस्से। Site का HTML, CSS और JavaScript ${githubSite} पर है, और <code>/api/*</code> चलाने वाला backend ${githubApi} भी public है। दोनों <strong>GNU GPL v3</strong> के तहत हैं, इसलिए आप browser में क्या चलता है <em>और</em> server पर क्या होता है, दोनों audit कर सकते हैं, fork कर सकते हैं और modify कर सकते हैं, जब तक आपका fork उसी license के तहत open source रहता है। Frontend की curated word lists private रहती हैं ताकि password outputs कम predictable रहें, लेकिन generation logic, including <code>crypto.getRandomValues()</code>, पूरी तरह visible है।`,
            `<strong>TofuPass</strong> नाम और Miso mascot (tofu, alert और excited artwork) <strong>all rights reserved</strong> हैं और GPL में covered नहीं हैं। Code fork कर सकते हैं; publish करते समय अपनी branding और mascot लाएं।`,
          ],
        },
      ]),
      section('यह कैसे काम करता है', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'Password generation कैसे काम करती है?',
          answer: ['TofuPass curated word lists को numbers और symbols के साथ combine करता है और browser randomness के लिए <code>crypto.getRandomValues()</code> use करता है। <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 words + symbol + number। <span class="text-[#6BBF59] font-bold">Firm</span> = 3 words + symbol + number। <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 words + symbol + number।'],
        },
        {
          question: 'Passwords कितने secure हैं?',
          answer: [`Soft type करने में सबसे आसान है और low-risk, temporary या throwaway uses के लिए best है। Firm ज्यादातर human-readable handoff situations के लिए recommended default है। Extra Firm लंबी अवधि या ज्यादा important credentials के लिए stronger choice है, जब site length accept करे। लंबे lowercase secrets के लिए dedicated ${passphraseLink('/hi/passphrases/', 'passphrases')} page use करें।`],
        },
        {
          question: 'Random characters की जगह words क्यों?',
          answer: ['<code>DancingKoalaRiver!73</code> को phone पर पढ़ना, TV keyboard में type करना या student को देना <code>j2#Xp9$k</code> से बहुत आसान है, फिर भी यह capital, symbol और number वाली rules को meet करता है जो कई forms मांगते हैं।'],
        },
      ]),
      section('Security और Privacy', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'Online passwords generate करना safe है?',
          answer: ['Main web generator के लिए, हां। Passwords आपके browser में locally generate होते हैं और TofuPass servers को भेजे नहीं जाते। Page load होने के बाद connection न होने पर भी generate करता रहता है। Public API अलग है: वह server-side generate करती है और response में password लौटाती है।'],
        },
        {
          question: 'क्या TofuPass कुछ track करता है?',
          answer: [`No analytics, no advertising cookies, no tracking pixels, और no account system। कुछ pages fonts और frontend libraries जैसे third-party assets load करते हैं; इसे ${privacyLink('/hi/privacy/', 'privacy policy')} explain करती है।`],
        },
        {
          question: 'क्या मुझे password manager भी use करना चाहिए?',
          answer: ['हां। ज्यादातर passwords के लिए real password manager use करें। TofuPass तब use करें जब password को read, type, speak, teach, print, reset या temporarily share करना हो। फिर किसी भी long-term secret को अपने password manager में store करें।'],
        },
      ]),
      section('Technical', 'faq-label-yellow', null, [
        {
          question: 'TofuPass कौन सा RNG use करता है?',
          answer: ['Web generator Web Crypto API के <code>crypto.getRandomValues()</code> का use करता है, जो modern browsers में built-in cryptographically secure random number generator है। API backend server-side Node की cryptographic random functions use करता है।'],
        },
        {
          question: 'क्या API है?',
          answer: [`हां। Free है, auth required नहीं। Single password के लिए <code>GET tofupass.com/api/password</code>, passphrase के लिए <code>GET tofupass.com/api/passphrase?count=4</code>। Details के लिए ${apiLink('/hi/api/', 'API docs')} देखें।`],
        },
        {
          question: 'मुझे passwords कितनी बार बदलने चाहिए?',
          answer: ['सिर्फ तब जब आपको लगे कि कोई password compromised हुआ है। NIST forced rotation के खिलाफ recommend करता है क्योंकि इससे weak, predictable patterns encourage होते हैं। Strong, unique passwords use करें और schedule पर नहीं, जरूरत पड़ने पर बदलें।'],
        },
      ]),
    ],
  },

  ru: {
    heading: 'О',
    tagline: 'Все, что вы можете захотеть узнать.',
    sections: [
      section('О TofuPass', 'faq-label-green', 'text-[#9B6DD7]/15', [
        {
          question: 'Что такое TofuPass?',
          answer: ['TofuPass — это генератор паролей с упором на приватность для ситуаций, где человек должен передать пароль другому человеку. Он создает читаемые пароли, которые проще произнести, набрать, объяснить, сбросить, распечатать или временно передать. Это не менеджер паролей: он не хранит, не синхронизирует, не автозаполняет и не запоминает пароли.'],
        },
        {
          question: 'Почему он называется TofuPass?',
          answer: ['Мой ник — "TofuWater", поэтому "TofuPass" был очевидным выбором. То, что это звучит как "Tough Pass", было счастливой случайностью, которую я теперь выдаю за задумку.'],
        },
        {
          question: 'Кто это сделал?',
          answer: ['Я: Matthew, он же TofuWater. Днем — Service Desk Technician, ночью — любитель кибербезопасности. Я создал TofuPass, потому что сбросы паролей, входы на устройства и звонки поддержки часто требуют чего-то безопаснее повторно используемого слова, но человечнее случайной каши из символов.'],
        },
        {
          question: 'Это бесплатно? Как вы зарабатываете?',
          answer: [`Пользоваться можно бесплатно. Нет рекламы, премиум-тарифа, аналитики и данных на продажу. TofuPass — небольшой личный проект, который я с радостью веду в минус. Если хотите кинуть несколько долларов на хостинг, стикеры, кофеин или фонд перекусов Miso, ниже есть ссылка Ko-Fi. Без давления, без напоминаний и без функций, закрытых за поддержкой.${supportLink('Поддержать TofuPass на Ko-Fi')}`],
        },
        {
          question: 'TofuPass с открытым исходным кодом?',
          answer: [
            `Да, обе части. HTML, CSS и JavaScript сайта находятся на ${githubSite}, а backend ${githubApi}, который обслуживает <code>/api/*</code>, тоже публичный. Оба проекта под лицензией <strong>GNU GPL v3</strong>, поэтому вы можете проверить, что именно работает в браузере <em>и</em> что происходит на сервере, сделать fork и изменить код, пока ваш fork остается open source под той же лицензией. Подобранные списки слов фронтенда остаются приватными, чтобы результаты были менее предсказуемыми, но логика генерации, включая <code>crypto.getRandomValues()</code>, полностью видна.`,
            `Название <strong>TofuPass</strong> и маскот Miso (иллюстрации tofu, alert и excited) имеют статус <strong>all rights reserved</strong> и не покрываются GPL. Код можно форкать; при публикации используйте собственный бренд и маскота.`,
          ],
        },
      ]),
      section('Как это работает', 'faq-label-purple', 'text-[#5B9FD6]/15', [
        {
          question: 'Как работает генерация паролей?',
          answer: ['TofuPass объединяет подобранные списки слов с цифрами и символами, используя <code>crypto.getRandomValues()</code> для случайности в браузере. <span class="text-[#FF7A7A] font-bold">Soft</span> = 2 слова + символ + число. <span class="text-[#6BBF59] font-bold">Firm</span> = 3 слова + символ + число. <span class="text-[#E6A800] font-bold">Extra Firm</span> = 4 слова + символ + число.'],
        },
        {
          question: 'Насколько безопасны пароли?',
          answer: [`Soft проще всего вводить, он лучше подходит для низкого риска, временного или одноразового использования. Firm — рекомендуемый вариант по умолчанию для большинства ситуаций, где пароль передается человеку. Extra Firm сильнее для более важных или долго живущих учетных данных, если сайт принимает такую длину. Для длинных секретов в нижнем регистре используйте отдельную страницу ${passphraseLink('/ru/passphrases/', 'парольных фраз')}.`],
        },
        {
          question: 'Почему слова вместо случайных символов?',
          answer: ['<code>DancingKoalaRiver!73</code> гораздо проще прочитать по телефону, набрать на клавиатуре телевизора или передать студенту, чем <code>j2#Xp9$k</code>, и при этом он все еще соответствует правилам про заглавную букву, символ и число, которые требуют многие формы.'],
        },
      ]),
      section('Безопасность и приватность', 'faq-label-pink', 'text-[#E6A800]/15', [
        {
          question: 'Безопасно ли генерировать пароли онлайн?',
          answer: ['Для основного веб-генератора — да. Пароли генерируются локально в браузере и не отправляются на серверы TofuPass. После загрузки страница продолжает генерировать даже без соединения. Публичная API работает иначе: она генерирует на сервере и возвращает пароль в ответе.'],
        },
        {
          question: 'TofuPass что-нибудь отслеживает?',
          answer: [`Нет аналитики, рекламных cookies, пикселей отслеживания и системы аккаунтов. Некоторые страницы загружают сторонние ресурсы, например шрифты и frontend-библиотеки; это объясняет ${privacyLink('/ru/privacy/', 'политика конфиденциальности')}.`],
        },
        {
          question: 'Стоит ли использовать менеджер паролей?',
          answer: ['Да. Для большинства паролей используйте настоящий менеджер паролей. TofuPass нужен, когда пароль нужно прочитать, набрать, произнести, объяснить, распечатать, сбросить или временно передать. После этого сохраните любой долгосрочный секрет в менеджере паролей.'],
        },
      ]),
      section('Техническое', 'faq-label-yellow', null, [
        {
          question: 'Какой RNG использует TofuPass?',
          answer: ['Веб-генератор использует Web Crypto API <code>crypto.getRandomValues()</code> — криптографически безопасный генератор случайных чисел, встроенный в современные браузеры. Backend API использует серверные криптографические функции случайности Node.'],
        },
        {
          question: 'Есть ли API?',
          answer: [`Да. Бесплатная, без авторизации. <code>GET tofupass.com/api/password</code> для одного пароля, <code>GET tofupass.com/api/passphrase?count=4</code> для парольной фразы. Подробности в ${apiLink('/ru/api/', 'документации API')}.`],
        },
        {
          question: 'Как часто нужно менять пароли?',
          answer: ['Только если вы думаете, что пароль был скомпрометирован. NIST не рекомендует принудительную ротацию: она поощряет слабые и предсказуемые шаблоны. Используйте сильные уникальные пароли и меняйте их при необходимости, а не по расписанию.'],
        },
      ]),
    ],
  },
};
