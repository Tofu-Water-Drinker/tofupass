window.tofupassStudentTestLocale = {
  "dateLocale": "es-MX",
  "text": {
    "passedSummary": "{passed} of {total} passed",
    "progress": "{current} de {total}",
    "notTaken": "No tomada",
    "passInstruction": "Paso con {necesitado} fuera de {total} correcto.",
    "startQuiz": "Empieza Quiz",
    "retakeQuiz": "Retoma a Quiz",
    "moduleKickerOf": "{kicker} de {total}",
    "questionTitle": "Pregunta {número}",
    "next": "Siguiente",
    "seeScore": "Ver puntuación",
    "correctPrefix": "Correcto.",
    "reviewPrefix": "Revise este.",
    "passed": "Pasado",
    "retakeNeeded": "Retoma necesaria",
    "passedMessage": "Buen trabajo. Esta prueba está completa. Sigue hasta que pasen los seis.",
    "retakeMessage": "Este examen necesita un 85% o más. Revise los artículos perdidos, luego vuelva a tomarlo.",
    "gotIt": "Lo tengo",
    "review": "Examen",
    "yourAnswer": "Tu respuesta:",
    "bestAnswer": "La mejor respuesta:",
    "studentName": "Nombre del estudiante",
    "unlocked": "Desbloqueado",
    "passedBadge": "{passed} / {total} aprobado",
    "overallGrade": "Categoría general: {grado}%",
    "overallGradeBlank": "Categoría general:",
    "date": "Fecha: {fecha}",
    "dateBlank": "Fecha:",
    "incomplete": "Incompleto"
  },
  "modules": [
    {
      "id": "password-basics",
      "title": "Bases de contraseña",
      "shortTitle": "Básicos",
      "kicker": "Quiz 1",
      "description": "Elija contraseñas más fuertes por entender longitud, aleatoriedad y patrones obvios.",
      "questions": [
        {
          "scenario": "Estás haciendo una contraseña para una nueva cuenta escolar.",
          "question": "¿Cuál es la contraseña más segura?",
          "options": [
            "escolar2026",
            "¡Mi nombre!123",
            "RiverMisoCloud!42",
            "contraseña pero larga"
          ],
          "answer": 2,
          "explanation": "Una contraseña más segura es larga, única y no basada en palabras personales o escolares obvias."
        },
        {
          "scenario": "Un sitio web requiere un número y un símbolo.",
          "question": "¿Qué patrón de contraseña es más fuerte?",
          "options": [
            "¡Soccer!1",
            "Spring2026!",
            "MisoRiverOrbit!74",
            "MySchoolMascot#5"
          ],
          "answer": 2,
          "explanation": "Las palabras legibles aleatorias más un símbolo y número son más difíciles de adivinar que los patrones comunes de la escuela o la temporada."
        },
        {
          "scenario": "Necesitas algo más fácil de escribir a mano.",
          "question": "¿Qué hábito ayuda más?",
          "options": [
            "Usa una palabra corta y un cumpleaños",
            "Usa palabras legibles al azar y manténgalo único",
            "Usa tu nombre de mascota con 123",
            "Reutiliza el que ya sabes"
          ],
          "answer": 1,
          "explanation": "Las palabras aleatorias legibles pueden ser utilizables y fuertes, especialmente cuando cada cuenta obtiene su propia contraseña."
        },
        {
          "scenario": "Una contraseña tiene su nombre, equipo o cumpleaños.",
          "question": "¿Por qué es arriesgado?",
          "options": [
            "Es demasiado difícil recordar",
            "Los atacantes pueden adivinar patrones personales",
            "Siempre rompe sitios web",
            "Sólo importa para los maestros"
          ],
          "answer": 1,
          "explanation": "Los nombres, los equipos, los cumpleaños y las palabras escolares son más fáciles de adivinar para las personas y las herramientas de búsqueda de contraseñas."
        },
        {
          "scenario": "Un amigo dice \"P@ssw0rd!\" es fuerte porque tiene símbolos.",
          "question": "¿Cuál es el problema?",
          "options": [
            "Es demasiado largo.",
            "No tiene letras minúsculas",
            "Es un patrón común que los atacantes saben",
            "Los símbolos hacen que las contraseñas sean más débiles"
          ],
          "answer": 2,
          "explanation": "Sustituciones comunes como @ para a y 0 para o son trucos bien conocidos, no aleatorio real."
        },
        {
          "scenario": "Estás comparando dos contraseñas.",
          "question": "¿Qué generalmente ayuda más que hacer una contraseña corta rara?",
          "options": [
            "Haciendo más tiempo",
            "Remoción de todos los espacios",
            "Usando sus iniciales",
            "Cambiar una carta a un número"
          ],
          "answer": 0,
          "explanation": "La longitud es poderosa. Una contraseña aleatoria más larga es generalmente más fuerte que una contraseña corta con cambios predecibles."
        },
        {
          "scenario": "Usted generó una contraseña y no le gusta.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Editarla en una frase favorita",
            "Genera otro al azar",
            "Añadir tu cumpleaños al final",
            "Use el mismo de otro sitio"
          ],
          "answer": 1,
          "explanation": "Si una contraseña generada no funciona para usted, generar una nueva en lugar de convertirla en un patrón personal."
        }
      ]
    },
    {
      "id": "reuse-managers",
      "title": "Reutilización y gerentes",
      "shortTitle": "Reutilización",
      "kicker": "Quiz 2",
      "description": "Aprenda por qué cada cuenta necesita su propia contraseña y cómo los administradores de contraseñas ayudan.",
      "questions": [
        {
          "scenario": "Usted utiliza la misma contraseña para un juego, email escolar, y un sitio de compras.",
          "question": "¿Por qué es arriesgado?",
          "options": [
            "Hace la contraseña demasiado tiempo",
            "Una brecha puede desbloquear las tres cuentas",
            "Los sitios web pueden ver cada contraseña que utiliza",
            "Sólo importa para adultos"
          ],
          "answer": 1,
          "explanation": "Si un sitio filtra una contraseña reutilizada, los atacantes lo prueban automáticamente en otros sitios."
        },
        {
          "scenario": "Un administrador de contraseña está disponible para usted.",
          "question": "¿Para qué es?",
          "options": [
            "Recordando contraseñas únicas de forma segura",
            "Hacer cada contraseña igual",
            "Compartir las contraseñas de clase públicamente",
            "Apagando la autenticación de dos factores"
          ],
          "answer": 0,
          "explanation": "Un gestor de contraseñas le ayuda a mantener contraseñas fuertes y únicas sin memorizarlas."
        },
        {
          "scenario": "Estás usando un administrador de contraseñas.",
          "question": "¿Cuál debería ser tu contraseña principal?",
          "options": [
            "Corto y fácil",
            "Lo mismo que tu contraseña escolar",
            "Largo, único y privado",
            "Tu número de almuerzo"
          ],
          "answer": 2,
          "explanation": "La contraseña maestra protege al gerente, por lo que debe ser larga, única y nunca compartida."
        },
        {
          "scenario": "No puedes usar un administrador de contraseñas para una cuenta escolar.",
          "question": "¿Cuál es el siguiente mejor hábito?",
          "options": [
            "Reutilizar una contraseña familiar",
            "Utilice una contraseña generada única que puede escribir",
            "Utilice su nombre de usuario como contraseña",
            "Escríbalo en un doc de clase pública"
          ],
          "answer": 1,
          "explanation": "Incluso sin un administrador, la contraseña debe ser única y generada en lugar de reutilizar."
        },
        {
          "scenario": "Un amigo quiere guardar su login en su navegador para usted.",
          "question": "¿Qué dices?",
          "options": [
            "Sí, si prometen no mirar",
            "No, mis contraseñas permanecen en mi cuenta o gerente",
            "Sólo para las escuelas",
            "Sólo si lo eliminan la semana próxima"
          ],
          "answer": 1,
          "explanation": "Salvar su contraseña en el navegador de otra persona da acceso a su dispositivo a su cuenta."
        },
        {
          "scenario": "Tienes docenas de cuentas.",
          "question": "¿Cuál es el plan realista más seguro?",
          "options": [
            "Una contraseña para todo",
            "Unas cuantas contraseñas giraron alrededor",
            "contraseñas únicas guardadas en un administrador",
            "Contraseñas basadas en nombres de cuenta"
          ],
          "answer": 2,
          "explanation": "Las contraseñas únicas limitan el daño. Un gerente lo hace realista para la vida cotidiana."
        },
        {
          "scenario": "Un sitio le dice que su contraseña apareció en una brecha.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Cambiar sólo esa contraseña si fuera única",
            "Ignora si aún lo recuerdas.",
            "Publica la contraseña para pedir amigos",
            "Reutilizarlo con un símbolo más"
          ],
          "answer": 0,
          "explanation": "Si la contraseña era única, cambiar esa cuenta puede ser suficiente. Si se reutilizaba, cambia cada cuenta que la usaba."
        }
      ]
    },
    {
      "id": "phishing",
      "title": "Phishing y Links",
      "shortTitle": "Phishing",
      "kicker": "Quiz 3",
      "description": "Practicar detectando mensajes urgentes, páginas falsas y enlaces sospechosos.",
      "questions": [
        {
          "scenario": "Usted recibe un mensaje que dice que su cuenta será borrada a menos que usted firme en este momento.",
          "question": "¿Cuál es el siguiente movimiento más seguro?",
          "options": [
            "Haga clic en el enlace rápidamente",
            "Responder con tu nombre de usuario",
            "Abra el sitio de la escuela desde un marcador o dirección tipo",
            "Adelante a todos"
          ],
          "answer": 2,
          "explanation": "Los mensajes de inicio de sesión urgentes son un clásico truco de phishing. Ve al sitio real tú mismo."
        },
        {
          "scenario": "Un enlace dice school-login.example.com pero el sitio de la escuela real utiliza suschool.edu.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Entra porque dice que la escuela",
            "Compruebe con un maestro o abrir el sitio real usted mismo",
            "Pruebe su contraseña antigua primero",
            "Compártelo en chat de clase"
          ],
          "answer": 1,
          "explanation": "Las direcciones parecen sospechosas. Use el sitio real conocido o pregunte a un adulto de confianza."
        },
        {
          "scenario": "Un email dice que ganaste un premio y pide tu contraseña escolar.",
          "question": "¿Cuál es la mayor señal de advertencia?",
          "options": [
            "Menciona un premio",
            "Pide tu contraseña",
            "Llegó por la mañana.",
            "Tiene una foto."
          ],
          "answer": 1,
          "explanation": "Las personas y los sitios legítimos no deben pedirle que envíe su contraseña en un mensaje."
        },
        {
          "scenario": "Una página de inicio de sesión parece casi normal pero tiene errores de ortografía y una dirección web extraña.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Introduzca sólo su nombre de usuario",
            "Cierralo y ve al sitio real de otra manera",
            "Pruebe una contraseña falsa primero",
            "Refresca hasta que se vea mejor"
          ],
          "answer": 1,
          "explanation": "Una dirección extraña más detalles descuidados es la razón suficiente para parar y utilizar un camino de confianza."
        },
        {
          "scenario": "Un compañero de clase envía un enlace de archivo y dice \"abre esto ahora\".",
          "question": "¿Qué es una respuesta más segura?",
          "options": [
            "Pregunte qué es antes de abrir",
            "De inmediato",
            "Introduzca su contraseña si se le pide",
            "Adelante a más personas"
          ],
          "answer": 0,
          "explanation": "Los enlaces y archivos inesperados merecen un cheque rápido, incluso cuando vienen de alguien que conoces."
        },
        {
          "scenario": "Un pop-up dice que su computadora está infectada y le pide que llame a un número.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Llame al número",
            "Dar acceso remoto",
            "Cierralo y dile a un adulto de confianza o TI",
            "Pagar para eliminar la advertencia"
          ],
          "answer": 2,
          "explanation": "Los pop-ups de Scare intentan apresurarte. Para, cierralo si es posible, y consigue ayuda de una persona de confianza."
        },
        {
          "scenario": "Usted hizo clic en un enlace sospechoso pero no entró una contraseña.",
          "question": "¿Qué harás después?",
          "options": [
            "Finge que no pasó nada",
            "Diga a un profesor o adulto de confianza",
            "Envíenlo a los amigos para probar",
            "Introduzca su contraseña para ver qué sucede"
          ],
          "answer": 1,
          "explanation": "Informar temprano ayuda a evitar que una estafa se disemine, incluso si no escribes nada."
        }
      ]
    },
    {
      "id": "mfa-recovery",
      "title": "MFA y recuperación",
      "shortTitle": "MFA",
      "kicker": "Quiz 4",
      "description": "Protege códigos de verificación, impulsos, códigos de copia de seguridad y opciones de recuperación.",
      "questions": [
        {
          "scenario": "Un sitio ofrece autenticación de dos factores.",
          "question": "¿Qué hace la autenticación de dos factores?",
          "options": [
            "Reemplaza tu contraseña",
            "Te hace cambiar contraseñas todos los días",
            "Añade otra prueba de que realmente eres tú.",
            "Almacena tu contraseña para amigos"
          ],
          "answer": 2,
          "explanation": "La autenticación de dos factores añade otra capa, como un código o un impulso, después de la contraseña."
        },
        {
          "scenario": "Una pantalla de inicio de sesión pide un código de su aplicación de autenticador.",
          "question": "¿Quién debería conseguir ese código?",
          "options": [
            "Sólo tú",
            "Cualquiera de soporte técnico que pregunte",
            "Un amigo ayudando con la tarea",
            "Una caja de chat del sitio web"
          ],
          "answer": 0,
          "explanation": "Un código de dos factores es un secreto. El personal de apoyo real no debe necesitar que se lo lea."
        },
        {
          "scenario": "Tu teléfono te pide que apruebes un login que no empezaste.",
          "question": "¿Qué debes tocar?",
          "options": [
            "Aprobar",
            "Negar o rechazar",
            "Aprobar si estás ocupado",
            "Aprobar, luego cambiarlo más tarde"
          ],
          "answer": 1,
          "explanation": "Los avisos de MFA inesperados pueden significar que alguien tiene su contraseña. Negar la solicitud y obtener ayuda."
        },
        {
          "scenario": "Un mensaje de chat de juego pide un código de inicio de sesión de seis dígitos para \"verificar su cuenta\".",
          "question": "¿Qué debes hacer?",
          "options": [
            "Envíenlo si parecen oficiales",
            "Nunca comparta el código",
            "Envíelo después de cambiar su contraseña",
            "Pídeles que prometen que es seguro"
          ],
          "answer": 1,
          "explanation": "Los códigos de acceso son privados. Compartir uno puede dejar a alguien en su cuenta."
        },
        {
          "scenario": "Recibe códigos de recuperación de respaldo.",
          "question": "¿Adónde deberían ir?",
          "options": [
            "En un lugar privado seguro",
            "En una carpeta de clase pública",
            "En tu perfil social",
            "En una nota pegajosa en un ordenador compartido"
          ],
          "answer": 0,
          "explanation": "Los códigos de recuperación pueden desbloquear cuentas, por lo que necesitan almacenamiento privado."
        },
        {
          "scenario": "Pierdes el acceso a tu teléfono usado para MFA.",
          "question": "¿Cuál es el mejor próximo paso?",
          "options": [
            "Crear una nueva cuenta inmediatamente",
            "Pregunte a un maestro, tutor o apoyo oficial para la ayuda de recuperación",
            "Adivina códigos de copia de seguridad en línea",
            "Usa el número de teléfono de un amigo en secreto"
          ],
          "answer": 1,
          "explanation": "La recuperación de cuentas debe pasar por adultos de confianza o canales de apoyo oficiales."
        },
        {
          "scenario": "Alguien dice que son IT y pide su código MFA.",
          "question": "¿Qué deberías recordar?",
          "options": [
            "El soporte real puede necesitar el código",
            "Los códigos del MFA prueban la identidad y deben permanecer privados",
            "Los códigos son seguros después de 30 segundos",
            "Está bien si saben tu nombre"
          ],
          "answer": 1,
          "explanation": "Los códigos del MFA son poderosos porque demuestran identidad. No los compartas con calladores o mensajes de chat."
        }
      ]
    },
    {
      "id": "shared-devices",
      "title": "Dispositivos compartidos",
      "shortTitle": "Dispositivos",
      "kicker": "Quiz 5",
      "description": "Mantenerse más seguro en las computadoras de aula, dispositivos prestados, Wi-Fi público y navegadores compartidos.",
      "questions": [
        {
          "scenario": "Estás en un ordenador de aula compartido.",
          "question": "¿Qué debes hacer antes de irte?",
          "options": [
            "Cierra la tapa o monitor",
            "Salga de sus cuentas",
            "Deja las pestañas abiertas para la próxima clase",
            "Guarda tu contraseña en el navegador"
          ],
          "answer": 1,
          "explanation": "Cerrar sesión mantiene a la siguiente persona de abrir sus cuentas desde la misma sesión del navegador."
        },
        {
          "scenario": "Un navegador en un ordenador compartido pide guardar su contraseña.",
          "question": "¿Qué debería elegir?",
          "options": [
            "Guardar",
            "Nunca o no ahora",
            "Guardar sólo para la escuela",
            "Ahorra si la clase casi termina"
          ],
          "answer": 1,
          "explanation": "Los navegadores compartidos no deben almacenar sus contraseñas personales."
        },
        {
          "scenario": "Usted tomó prestado el portátil de un amigo para comprobar el correo electrónico.",
          "question": "¿Qué debe evitar?",
          "options": [
            "Saliendo después",
            "Usar una ventana privada si está disponible",
            "Guardar su contraseña en su navegador",
            "Abrir el sitio real usted mismo"
          ],
          "answer": 2,
          "explanation": "Guardar contraseñas en el dispositivo de otra persona puede dejar su cuenta accesible después de devolverla."
        },
        {
          "scenario": "Encuentra a otra persona que aún está firmada en una computadora de clase.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Lea sus mensajes",
            "Postear algo gracioso",
            "Sácalos y dile a un profesor",
            "Cambiar su contraseña"
          ],
          "answer": 2,
          "explanation": "Respetar su privacidad, salir si es apropiado, y dejar que un adulto de confianza lo sepa."
        },
        {
          "scenario": "Una página de acceso Wi-Fi pública pide su contraseña escolar.",
          "question": "¿Qué es más seguro?",
          "options": [
            "Ingrese porque Wi-Fi lo necesita",
            "Consulte con un adulto de confianza o utilice las instrucciones de la red escolar oficial",
            "Pruebe su contraseña dos veces",
            "Usa la contraseña de un amigo"
          ],
          "answer": 1,
          "explanation": "No ponga las credenciales de la escuela en páginas Wi-Fi al azar sin confirmar que son oficiales."
        },
        {
          "scenario": "Usted descarga una extensión del navegador prometedor moneda de juego libre.",
          "question": "¿Cuál es la preocupación?",
          "options": [
            "Las extensiones a veces pueden leer o cambiar los datos del navegador",
            "Las extensiones siempre son aprobadas por la escuela",
            "Extensiones del juego mejorar la seguridad",
            "Sólo importa en los teléfonos"
          ],
          "answer": 0,
          "explanation": "Las extensiones pueden tener un acceso poderoso. Sólo instalar herramientas aprobadas y de confianza."
        },
        {
          "scenario": "Usted está terminado utilizando una aplicación web en un dispositivo compartido.",
          "question": "¿Qué acción es más completa?",
          "options": [
            "Cerrar la ficha sólo",
            "Cerrar sesión, luego cerrar la pestaña",
            "Baja el brillo",
            "Deja el navegador abierto"
          ],
          "answer": 1,
          "explanation": "Cerrar una pestaña puede no terminar la sesión. Salir es el hábito más seguro."
        }
      ]
    },
    {
      "id": "incident-response",
      "title": "Cuando las cosas van mal",
      "shortTitle": "Respuesta",
      "kicker": "Quiz 6",
      "description": "Saber cuándo cambiar una contraseña, reportar actividad sospechosa y pedir ayuda.",
      "questions": [
        {
          "scenario": "Crees que alguien más puede saber tu contraseña.",
          "question": "¿Qué debes hacer primero?",
          "options": [
            "Ignoralo a menos que pase algo malo.",
            "Cámbialo y dile a un adulto o profesor de confianza",
            "Publicar una advertencia en línea",
            "Utilice la misma contraseña con un número extra"
          ],
          "answer": 1,
          "explanation": "Cambia la contraseña, luego consigue ayuda. Si la cuenta es importante, alguien puede necesitar revisar la actividad."
        },
        {
          "scenario": "Usted ve mensajes enviados desde su cuenta que no escribió.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Suprímalos en silencio",
            "Cambia tu contraseña e informala",
            "Enviar más mensajes explicando",
            "Dar la cuenta a un amigo"
          ],
          "answer": 1,
          "explanation": "La actividad inesperada puede significar que la cuenta está comprometida. Cambiar la contraseña e informarla rápidamente."
        },
        {
          "scenario": "Usted accidentalmente compartió su contraseña en un chat.",
          "question": "¿Cuál es la respuesta más segura?",
          "options": [
            "Cámbialo de inmediato",
            "Espero que nadie se haya dado cuenta",
            "Pedir a la gente que no lo use",
            "Eliminar el mensaje la próxima semana"
          ],
          "answer": 0,
          "explanation": "Una vez que se comparte una contraseña, tratarla como ya no es privada y cambiarla."
        },
        {
          "scenario": "Un sitio dice que su contraseña es débil.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Añadir 1 al final",
            "Crear una nueva contraseña única fuerte",
            "Ignora si te gusta la contraseña",
            "Usa tu nombre de escuela con un símbolo"
          ],
          "answer": 1,
          "explanation": "Una advertencia es un buen momento para reemplazar la contraseña con algo más fuerte y único."
        },
        {
          "scenario": "Usted recibe un email sobre un login desde un lugar que no reconoce.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Utilice el enlace de correo electrónico para iniciar sesión",
            "Abra el sitio real usted mismo, revise la actividad y cambie la contraseña si es necesario",
            "Adelante el correo electrónico a los amigos",
            "Responder con su contraseña"
          ],
          "answer": 1,
          "explanation": "Utilice un camino de confianza para comprobar la cuenta. No utilice enlaces de mensajes sospechosos."
        },
        {
          "scenario": "Un amigo dice que fueron hackeados y pide tu contraseña para probar algo.",
          "question": "¿Qué debes hacer?",
          "options": [
            "Compártelo para ayudar",
            "No compartirlo y animarlos a obtener ayuda de confianza",
            "Usar una contraseña vieja",
            "Compártelo sólo en persona"
          ],
          "answer": 1,
          "explanation": "Ayudar a un amigo no debe requerir compartir su contraseña. Anime la recuperación mediante el apoyo de confianza."
        },
        {
          "scenario": "No estás seguro de si algo es seguro.",
          "question": "¿Qué es una buena regla?",
          "options": [
            "Pregunte antes de ingresar información privada",
            "Haga clic más rápido antes de que expire",
            "Pruebe su contraseña y vea",
            "Compártelo con compañeros de clase primero"
          ],
          "answer": 0,
          "explanation": "Pausar y pedir a un adulto o profesor de confianza es un hábito de seguridad fuerte."
        }
      ]
    }
  ]
};
