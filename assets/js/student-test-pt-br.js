window.tofupassStudentTestLocale = {
  "dateLocale": "pt-BR",
  "text": {
    "passedSummary": "{passado} de {total} passado",
    "progress": "{corrente} de {total}",
    "notTaken": "Não tomado",
    "passInstruction": "Passe com {necessário} de {total} correcto.",
    "startQuiz": "Iniciar o Questionário",
    "retakeQuiz": "Questionário de repetição",
    "moduleKickerOf": "{kicker} de {total}",
    "questionTitle": "{título}: Pergunta {número}",
    "next": "Próxima",
    "seeScore": "Ver Pontuação",
    "correctPrefix": "Correcto.",
    "reviewPrefix": "Reveja esta.",
    "passed": "Passado",
    "retakeNeeded": "Retomar necessário",
    "passedMessage": "Bom trabalho. Este teste está completo. Continue até que todos os seis sejam passados.",
    "retakeMessage": "Este questionário precisa de 85% ou mais. Reveja os itens perdidos e depois retome-os.",
    "gotIt": "Entendido.",
    "review": "Revisão",
    "yourAnswer": "Sua resposta: {resposta}",
    "bestAnswer": "Melhor resposta: {resposta}",
    "studentName": "Nome do estudante",
    "unlocked": "Desbloqueado",
    "passedBadge": "{passado} / {total} passado",
    "overallGrade": "Grau geral: {grau}%",
    "overallGradeBlank": "Grau geral: --",
    "date": "Data: {Data}",
    "dateBlank": "Data: --",
    "incomplete": "Incompleto"
  },
  "modules": [
    {
      "id": "password-basics",
      "title": "Básico da Senha",
      "shortTitle": "Básico",
      "kicker": "Questionário 1",
      "description": "Escolha senhas mais fortes através da compreensão do comprimento, aleatoriedade e padrões óbvios.",
      "questions": [
        {
          "scenario": "Você está fazendo uma senha para uma nova conta escolar.",
          "question": "Qual é a palavra-passe mais segura?",
          "options": [
            "escola2026",
            "Meu nome!123",
            "RioMisoCloud!42",
            "senha- mas- longa"
          ],
          "answer": 2,
          "explanation": "Uma senha mais segura é longa, única e não baseada em palavras pessoais ou escolares óbvias."
        },
        {
          "scenario": "Um site requer um número e um símbolo.",
          "question": "Qual padrão de senha é mais forte?",
          "options": [
            "Futebol!",
            "Primavera2026!",
            "MisoRiverOrbit!74",
            "MySchoolMascote# 5"
          ],
          "answer": 2,
          "explanation": "Palavras legíveis aleatórias mais um símbolo e um número são mais difíceis de adivinhar do que padrões comuns de escola ou temporada."
        },
        {
          "scenario": "Precisas de algo mais fácil de escrever à mão.",
          "question": "Que hábito ajuda mais?",
          "options": [
            "Use uma palavra curta e um aniversário",
            "Use palavras legíveis aleatórias e mantenha-a única",
            "Use o seu nome de estimação com 123",
            "Reutilizar o que já conhece"
          ],
          "answer": 1,
          "explanation": "Palavras aleatórias legíveis podem ser utilizáveis e fortes, especialmente quando cada conta recebe sua própria senha."
        },
        {
          "scenario": "Uma senha tem o seu nome, equipa ou aniversário.",
          "question": "Porque é que isso é arriscado?",
          "options": [
            "É muito difícil de lembrar.",
            "Os atacantes podem adivinhar padrões pessoais",
            "Ele sempre quebra sites",
            "Só importa para os professores."
          ],
          "answer": 1,
          "explanation": "Nomes, equipes, aniversários e palavras escolares são mais fáceis de adivinhar para as pessoas e ferramentas de quebra de senhas."
        },
        {
          "scenario": "Um amigo diz que \"P@ssw0rd!\" é forte porque tem símbolos.",
          "question": "Qual é o problema?",
          "options": [
            "É muito longo.",
            "Não tem letras minúsculas",
            "É um padrão comum que os atacantes sabem",
            "Símbolos enfraquecem as senhas"
          ],
          "answer": 2,
          "explanation": "Substituições comuns como @ para a e 0 para o são truques bem conhecidos, não aleatoriedade real."
        },
        {
          "scenario": "Você está comparando duas senhas.",
          "question": "O que normalmente ajuda mais do que fazer uma senha curta estranha?",
          "options": [
            "Tornando-o mais longo",
            "Removendo todos os espaços",
            "Usando suas iniciais",
            "Mudando uma letra para um número"
          ],
          "answer": 0,
          "explanation": "O comprimento é poderoso. Uma senha aleatória mais longa é geralmente mais forte do que uma senha curta com alterações previsíveis."
        },
        {
          "scenario": "Você gerou uma senha e não gostou.",
          "question": "O que deves fazer?",
          "options": [
            "Edite- o em uma frase favorita",
            "Gerar outro aleatório",
            "Adicione seu aniversário ao fim",
            "Use o mesmo de outro site"
          ],
          "answer": 1,
          "explanation": "Se uma senha gerada não funcionar para você, gere uma nova em vez de transformá-la em um padrão pessoal."
        }
      ]
    },
    {
      "id": "reuse-managers",
      "title": "Reutilizar e Gestores",
      "shortTitle": "Reutilizar",
      "kicker": "Questionário 2",
      "description": "Saiba por que cada conta precisa de sua própria senha e como os gerenciadores de senhas ajudam.",
      "questions": [
        {
          "scenario": "Você usa a mesma senha para um jogo, e-mail escolar e um site de compras.",
          "question": "Porque é que isso é arriscado?",
          "options": [
            "Torna a senha demasiado longa",
            "Uma violação pode desbloquear todas as três contas",
            "Sites podem ver cada senha que você usa",
            "Só importa para adultos."
          ],
          "answer": 1,
          "explanation": "Se um site vaza uma senha reutilizada, os atacantes experimentam automaticamente em outros sites."
        },
        {
          "scenario": "Um gerenciador de senhas está disponível para você.",
          "question": "Para quê?",
          "options": [
            "Recordando senhas únicas com segurança",
            "Tornar todas as senhas iguais",
            "Compartilhar senhas de classe publicamente",
            "Desligando a autenticação de dois fatores"
          ],
          "answer": 0,
          "explanation": "Um gerenciador de senhas ajuda você a manter senhas fortes e únicas sem memorizar todas elas."
        },
        {
          "scenario": "Você está usando um gerenciador de senhas.",
          "question": "Qual deve ser a sua senha principal?",
          "options": [
            "Curto e fácil",
            "O mesmo que a sua senha da escola",
            "Longo, único e privado",
            "O teu número de almoço."
          ],
          "answer": 2,
          "explanation": "A senha mestre protege o gerente, então deve ser longa, única e nunca compartilhada."
        },
        {
          "scenario": "Você não pode usar um gerenciador de senhas para uma conta escolar.",
          "question": "Qual é o próximo melhor hábito?",
          "options": [
            "Reutilizar uma senha familiar",
            "Use uma senha única gerada que você pode digitar",
            "Use seu nome de usuário como senha",
            "Escreva-o num documento de classe pública"
          ],
          "answer": 1,
          "explanation": "Mesmo sem um gerenciador, a senha ainda deve ser única e gerada em vez de reutilizada."
        },
        {
          "scenario": "Um amigo quer salvar seu login no navegador deles para você.",
          "question": "O que deves dizer?",
          "options": [
            "Sim, se prometerem não olhar.",
            "Não, minhas senhas ficam na minha conta ou gerente",
            "Apenas para sites escolares",
            "Só se o apagarem na próxima semana."
          ],
          "answer": 1,
          "explanation": "Salvar sua senha no navegador de outra pessoa dá acesso ao dispositivo para sua conta."
        },
        {
          "scenario": "Tens dezenas de contas.",
          "question": "Qual é o plano realista mais seguro?",
          "options": [
            "Uma senha para tudo",
            "Algumas senhas giradas ao redor",
            "Senhas únicas gravadas num gestor",
            "Senhas baseadas nos nomes das contas"
          ],
          "answer": 2,
          "explanation": "Senhas únicas limitam danos. Um gerente torna isso realista para a vida cotidiana."
        },
        {
          "scenario": "Um site diz que sua senha apareceu em uma violação.",
          "question": "O que deves fazer?",
          "options": [
            "Alterar apenas essa senha se ela fosse única",
            "Ignore se ainda se lembrar",
            "Publique a senha para perguntar aos amigos",
            "Reutilizá- lo com mais um símbolo"
          ],
          "answer": 0,
          "explanation": "Se a senha era única, mudar essa conta pode ser suficiente. Se foi reutilizado, mude cada conta que o usou."
        }
      ]
    },
    {
      "id": "phishing",
      "title": "Phishing e Links",
      "shortTitle": "Phishing",
      "kicker": "Questionário 3",
      "description": "Pratique a localização de mensagens urgentes, páginas falsas de entrada e links suspeitos.",
      "questions": [
        {
          "scenario": "Recebe uma mensagem que diz que a sua conta será apagada a menos que entre agora.",
          "question": "Qual é o próximo passo mais seguro?",
          "options": [
            "Clique no link rapidamente",
            "Responder com o teu nome de utilizador",
            "Abra o site da escola a partir de um marcador ou endereço digitado",
            "Encaminhá-lo para todos"
          ],
          "answer": 2,
          "explanation": "Mensagens de login urgentes são um truque de phishing clássico. Vai tu ao verdadeiro site."
        },
        {
          "scenario": "Um link diz school-login.example.com, mas o site real da escola usa yourschool.edu.",
          "question": "O que deves fazer?",
          "options": [
            "Assine porque diz escola.",
            "Verifique com um professor ou abra o site real você mesmo",
            "Experimente sua senha antiga primeiro",
            "Partilhe- o na conversa de classe"
          ],
          "answer": 1,
          "explanation": "Endereços parecidos são suspeitos. Use o site real conhecido ou pergunte a um adulto confiável."
        },
        {
          "scenario": "Um email diz que você ganhou um prêmio e pede sua senha da escola.",
          "question": "Qual é o maior sinal de aviso?",
          "options": [
            "Menciona um prémio",
            "Ele pede sua senha",
            "Chegou de manhã.",
            "Tem uma fotografia"
          ],
          "answer": 1,
          "explanation": "Pessoas e sites legítimos não devem pedir que você envie sua senha em uma mensagem."
        },
        {
          "scenario": "Uma página de login parece quase normal, mas tem erros ortográficos e um endereço web estranho.",
          "question": "O que deves fazer?",
          "options": [
            "Indique apenas o seu nome de utilizador",
            "Feche-o e vá para o site real outra maneira",
            "Tente uma senha falsa primeiro",
            "Actualizar até ficar melhor"
          ],
          "answer": 1,
          "explanation": "Um endereço estranho mais detalhes desleixados é razão suficiente para parar e usar um caminho confiável."
        },
        {
          "scenario": "Um colega de classe envia um link de arquivo e diz \"abra isso agora\".",
          "question": "O que é uma resposta mais segura?",
          "options": [
            "Pergunte o que é antes de abrir",
            "Baixe-o imediatamente",
            "Digite sua senha, se solicitado",
            "Encaminhá-lo para mais pessoas"
          ],
          "answer": 0,
          "explanation": "Links e arquivos inesperados merecem uma verificação rápida, mesmo quando eles vêm de alguém que você conhece."
        },
        {
          "scenario": "Um pop-up diz que seu computador está infectado e pede que você ligue para um número.",
          "question": "O que deves fazer?",
          "options": [
            "Chamar o número",
            "Dar acesso remoto",
            "Feche-o e diga a um adulto de confiança ou TI",
            "Pague para remover o aviso"
          ],
          "answer": 2,
          "explanation": "Os pop-ups assustados tentam apressar-te. Pare, feche-o se possível, e obtenha ajuda de uma pessoa de confiança."
        },
        {
          "scenario": "Você clicou em um link suspeito, mas não digitou uma senha.",
          "question": "O que deves fazer a seguir?",
          "options": [
            "Finge que nada aconteceu.",
            "Diga a um professor ou adulto de confiança",
            "Enviar aos amigos para testar",
            "Digite sua senha para ver o que acontece"
          ],
          "answer": 1,
          "explanation": "Relatar cedo ajuda a impedir que um golpe se espalhe, mesmo que você não digite nada."
        }
      ]
    },
    {
      "id": "mfa-recovery",
      "title": "AMF e recuperação",
      "shortTitle": "MFA",
      "kicker": "Questionário 4",
      "description": "Proteja códigos de verificação, push prompts, códigos de backup e opções de recuperação.",
      "questions": [
        {
          "scenario": "Um site oferece autenticação de dois fatores.",
          "question": "O que faz a autenticação de dois fatores?",
          "options": [
            "Substitui a sua senha",
            "Faz-te mudar as senhas todos os dias",
            "Ele acrescenta outra prova de que é realmente você",
            "Armazena sua senha para amigos"
          ],
          "answer": 2,
          "explanation": "A autenticação de dois fatores adiciona outra camada, como um código ou prompt, após a senha."
        },
        {
          "scenario": "Uma tela de login pede um código do seu aplicativo autenticador.",
          "question": "Quem deve obter esse código?",
          "options": [
            "Só tu.",
            "Qualquer um do suporte técnico que pergunte",
            "Um amigo que ajuda com os trabalhos de casa",
            "Uma caixa de chat do site"
          ],
          "answer": 0,
          "explanation": "Um código de dois fatores é um segredo. A equipe de apoio real não deve precisar que você leia para eles."
        },
        {
          "scenario": "Seu telefone pede que você aprove um login que você não começou.",
          "question": "O que deve tocar?",
          "options": [
            "Aprovar",
            "Negar ou rejeitar",
            "Aprovar se estiver ocupado",
            "Aprovar e depois mudar."
          ],
          "answer": 1,
          "explanation": "Prompts MFA inesperados podem significar que alguém tem sua senha. Nega o pedido e pede ajuda."
        },
        {
          "scenario": "Uma mensagem de chat de jogo pede um código de login de seis dígitos para \"verificar sua conta\".",
          "question": "O que deves fazer?",
          "options": [
            "Envia-o se parecerem oficiais.",
            "Nunca partilhe o código",
            "Enviar depois de alterar a sua senha",
            "Pede-lhes que prometam que é seguro."
          ],
          "answer": 1,
          "explanation": "Os códigos de login são privados. Partilhar uma pessoa pode deixar alguém entrar na sua conta."
        },
        {
          "scenario": "Você recebe códigos de recuperação de backup.",
          "question": "Para onde devem ir?",
          "options": [
            "Num lugar seguro e privado",
            "Numa pasta de classe pública",
            "No seu perfil social",
            "Numa nota pegajosa num computador partilhado"
          ],
          "answer": 0,
          "explanation": "Códigos de recuperação podem desbloquear contas, então eles precisam de armazenamento privado."
        },
        {
          "scenario": "Você perde o acesso ao telefone usado para MFA.",
          "question": "Qual é o melhor próximo passo?",
          "options": [
            "Criar uma nova conta imediatamente",
            "Peça a um professor, tutor ou suporte oficial para ajuda de recuperação",
            "Adivinhar códigos de backup online",
            "Use o número de telefone de um amigo secretamente"
          ],
          "answer": 1,
          "explanation": "Recuperação de conta deve passar por adultos confiáveis ou canais de suporte oficiais."
        },
        {
          "scenario": "Alguém diz que são TI e pede o seu código MFA.",
          "question": "De que te deves lembrar?",
          "options": [
            "Suporte real pode precisar do código",
            "Códigos MFA provam identidade e devem permanecer privados",
            "Os códigos são seguros após 30 segundos",
            "Não faz mal se souberem o teu nome."
          ],
          "answer": 1,
          "explanation": "Os códigos MFA são poderosos porque provam identidade. Não as partilhe com chamadas ou mensagens de chat."
        }
      ]
    },
    {
      "id": "shared-devices",
      "title": "Dispositivos Compartilhados",
      "shortTitle": "Dispositivos",
      "kicker": "Questionário 5",
      "description": "Mantenha-se seguro em computadores de sala de aula, dispositivos emprestados, Wi-Fi público e navegadores compartilhados.",
      "questions": [
        {
          "scenario": "Está num computador de sala de aula partilhada.",
          "question": "O que deve fazer antes de partir?",
          "options": [
            "Feche a tampa ou o monitor",
            "Sair de suas contas",
            "Deixar as abas abertas para a próxima aula",
            "Salve sua senha no navegador"
          ],
          "answer": 1,
          "explanation": "Sair impede que a próxima pessoa abra suas contas da mesma sessão do navegador."
        },
        {
          "scenario": "Um navegador em um computador compartilhado pede para salvar sua senha.",
          "question": "O que você deve escolher?",
          "options": [
            "Gravar",
            "Nunca ou não agora",
            "Salvar apenas para a escola",
            "Salvar se a classe está quase no fim"
          ],
          "answer": 1,
          "explanation": "Navegadores compartilhados não devem armazenar suas senhas pessoais."
        },
        {
          "scenario": "Você pegou emprestado o laptop de um amigo para verificar o email.",
          "question": "O que deve evitar?",
          "options": [
            "Sair depois",
            "Usar uma janela privada, se disponível",
            "Salvando sua senha em seu navegador",
            "Abrindo o site real você mesmo"
          ],
          "answer": 2,
          "explanation": "Salvar senhas no dispositivo de outra pessoa pode deixar sua conta acessível depois de devolvê-la."
        },
        {
          "scenario": "Encontras outra pessoa que ainda se inscreve num computador de sala de aula.",
          "question": "O que deves fazer?",
          "options": [
            "Leia suas mensagens",
            "Publicar algo engraçado",
            "Registre-os e diga a um professor",
            "Alterar sua senha"
          ],
          "answer": 2,
          "explanation": "Respeite sua privacidade, saia se apropriado e avise um adulto confiável."
        },
        {
          "scenario": "Uma página pública de login Wi-Fi pede sua senha da escola.",
          "question": "O que é mais seguro?",
          "options": [
            "Digite-o porque o Wi-Fi precisa dele",
            "Verifique com um adulto confiável ou use as instruções oficiais da rede escolar",
            "Tente sua senha duas vezes",
            "Use a senha de um amigo"
          ],
          "answer": 1,
          "explanation": "Não coloque credenciais escolares em páginas Wi-Fi aleatórias sem confirmar que são oficiais."
        },
        {
          "scenario": "Você baixar uma extensão do navegador prometendo moeda de jogo livre.",
          "question": "Qual é a preocupação?",
          "options": [
            "Extensões podem às vezes ler ou alterar dados do navegador",
            "As extensões são sempre aprovadas pela escola",
            "Extensões de jogo melhorar a segurança",
            "Só importa nos telefones."
          ],
          "answer": 0,
          "explanation": "Extensões podem ter acesso poderoso. Apenas instale ferramentas aprovadas e confiáveis."
        },
        {
          "scenario": "Você terminou de usar uma aplicação web em um dispositivo compartilhado.",
          "question": "Qual ação é mais completa?",
          "options": [
            "Fechar apenas a página",
            "Sair e fechar a página",
            "Baixa o brilho",
            "Deixar o navegador aberto"
          ],
          "answer": 1,
          "explanation": "Fechar uma aba não pode terminar a sessão. Sair é o hábito mais seguro."
        }
      ]
    },
    {
      "id": "incident-response",
      "title": "Quando as coisas dão errado",
      "shortTitle": "Resposta",
      "kicker": "Questionário 6",
      "description": "Saiba quando alterar uma senha, relatar atividade suspeita e pedir ajuda.",
      "questions": [
        {
          "scenario": "Achas que outra pessoa pode saber a tua senha.",
          "question": "O que deves fazer primeiro?",
          "options": [
            "Ignora-o a menos que algo de mau aconteça.",
            "Mude-o e diga a um adulto de confiança ou professor",
            "Publicar um aviso online",
            "Usar a mesma senha com um número extra"
          ],
          "answer": 1,
          "explanation": "Muda a senha e pede ajuda. Se a conta é importante, alguém pode precisar verificar a atividade."
        },
        {
          "scenario": "Você vê mensagens enviadas de sua conta que você não escreveu.",
          "question": "O que deves fazer?",
          "options": [
            "Apaguem-nos em silêncio.",
            "Altere sua senha e relate-a",
            "Enviar mais mensagens explicando",
            "Dar a conta a um amigo"
          ],
          "answer": 1,
          "explanation": "Atividade inesperada pode significar que a conta está comprometida. Mude a senha e relate-a rapidamente."
        },
        {
          "scenario": "Você acidentalmente compartilhou sua senha em uma conversa.",
          "question": "Qual é a resposta mais segura?",
          "options": [
            "Mude imediatamente.",
            "Espero que ninguém tenha reparado.",
            "Pedir às pessoas para não usá-lo",
            "Apagar a mensagem na próxima semana"
          ],
          "answer": 0,
          "explanation": "Uma vez que uma senha é compartilhada, tratá-la como não mais privada e alterá-la."
        },
        {
          "scenario": "Um site diz que sua senha é fraca.",
          "question": "O que deves fazer?",
          "options": [
            "Adicionar 1 ao fim",
            "Criar uma nova senha única forte",
            "Ignorar se gostou da senha",
            "Use seu nome de escola com um símbolo"
          ],
          "answer": 1,
          "explanation": "Um aviso é uma boa hora para substituir a senha por algo mais forte e único."
        },
        {
          "scenario": "Você recebe um e-mail sobre um login de um lugar que você não reconhece.",
          "question": "O que deves fazer?",
          "options": [
            "Usar o link de e- mail para entrar",
            "Abra você mesmo o site real, verifique a atividade e altere a senha se necessário",
            "Encaminhar o e-mail para amigos",
            "Responder com sua senha"
          ],
          "answer": 1,
          "explanation": "Use um caminho confiável para verificar a conta. Não use links de mensagens suspeitas."
        },
        {
          "scenario": "Um amigo diz que foram hackeados e pede a tua senha para testar algo.",
          "question": "O que deves fazer?",
          "options": [
            "Compartilhe-o para ajudar",
            "Não compartilhe e encoraje - os a obter ajuda confiável",
            "Usar uma senha antiga",
            "Compartilhe-o apenas pessoalmente"
          ],
          "answer": 1,
          "explanation": "Ajudar um amigo não deve exigir compartilhar sua senha. Incentivar a recuperação através de suporte confiável."
        },
        {
          "scenario": "Você não tem certeza se algo é seguro.",
          "question": "Qual é uma boa regra?",
          "options": [
            "Perguntar antes de introduzir informações privadas",
            "Clique mais rápido antes de expirar",
            "Tente sua senha e veja",
            "Compartilhe-o com colegas de classe primeiro"
          ],
          "answer": 0,
          "explanation": "Pausar e perguntar a um adulto ou professor confiável é um forte hábito de segurança."
        }
      ]
    }
  ]
};
