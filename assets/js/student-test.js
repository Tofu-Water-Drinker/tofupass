(function () {
  var PASSING_PERCENT = 85;
  var studentLocale = window.tofupassStudentTestLocale || {};
  var defaultText = {
    passedSummary: '{passed} of {total} passed',
    progress: '{current} of {total}',
    notTaken: 'Not taken',
    passInstruction: 'Pass with {needed} out of {total} correct.',
    startQuiz: 'Start Quiz',
    retakeQuiz: 'Retake Quiz',
    moduleKickerOf: '{kicker} of {total}',
    questionTitle: '{title}: Question {number}',
    next: 'Next',
    seeScore: 'See Score',
    correctPrefix: 'Correct. ',
    reviewPrefix: 'Review this one. ',
    passed: 'Passed',
    retakeNeeded: 'Retake needed',
    passedMessage: 'Nice work. This quiz is complete. Keep going until all six are passed.',
    retakeMessage: 'This quiz needs 85% or higher. Review the missed items, then retake it.',
    gotIt: 'Got it',
    review: 'Review',
    yourAnswer: 'Your answer: {answer}',
    bestAnswer: 'Best answer: {answer}',
    studentName: 'Student Name',
    unlocked: 'Unlocked',
    passedBadge: '{passed} / {total} passed',
    overallGrade: 'Overall grade: {grade}%',
    overallGradeBlank: 'Overall grade: --',
    date: 'Date: {date}',
    dateBlank: 'Date: --',
    incomplete: 'Incomplete'
  };
  var text = Object.assign({}, defaultText, studentLocale.text || {});

  function formatText(template, values) {
    return template.replace(/\{([a-zA-Z0-9_]+)\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match;
    });
  }

  var modules = [
    {
      id: 'password-basics',
      title: 'Password Basics',
      shortTitle: 'Basics',
      kicker: 'Quiz 1',
      description: 'Choose stronger passwords by understanding length, randomness, and obvious patterns.',
      questions: [
        {
          scenario: 'You are making a password for a new school account.',
          question: 'Which password is the safest choice?',
          options: ['school2026', 'MyName!123', 'RiverMisoCloud!42', 'password-but-long'],
          answer: 2,
          explanation: 'A safer password is long, unique, and not based on obvious personal or school words.'
        },
        {
          scenario: 'A website requires a number and a symbol.',
          question: 'Which password pattern is strongest?',
          options: ['Soccer!1', 'Spring2026!', 'MisoRiverOrbit!74', 'MySchoolMascot#5'],
          answer: 2,
          explanation: 'Random readable words plus a symbol and number are harder to guess than common school or season patterns.'
        },
        {
          scenario: 'You need something easier to type by hand.',
          question: 'Which habit helps most?',
          options: ['Use a short word and a birthday', 'Use random readable words and keep it unique', 'Use your pet name with 123', 'Reuse the one you already know'],
          answer: 1,
          explanation: 'Readable random words can be usable and strong, especially when every account gets its own password.'
        },
        {
          scenario: 'A password has your name, team, or birthday in it.',
          question: 'Why is that risky?',
          options: ['It is too hard to remember', 'Attackers can guess personal patterns', 'It always breaks websites', 'It only matters for teachers'],
          answer: 1,
          explanation: 'Names, teams, birthdays, and school words are easier for people and password-cracking tools to guess.'
        },
        {
          scenario: 'A friend says "P@ssw0rd!" is strong because it has symbols.',
          question: 'What is the problem?',
          options: ['It is too long', 'It has no lowercase letters', 'It is a common pattern attackers know', 'Symbols make passwords weaker'],
          answer: 2,
          explanation: 'Common substitutions like @ for a and 0 for o are well-known tricks, not real randomness.'
        },
        {
          scenario: 'You are comparing two passwords.',
          question: 'What usually helps more than making a short password weird?',
          options: ['Making it longer', 'Removing all spaces', 'Using your initials', 'Changing one letter to a number'],
          answer: 0,
          explanation: 'Length is powerful. A longer random password is usually stronger than a short password with predictable changes.'
        },
        {
          scenario: 'You generated a password and do not like it.',
          question: 'What should you do?',
          options: ['Edit it into a favorite phrase', 'Generate another random one', 'Add your birthday to the end', 'Use the same one from another site'],
          answer: 1,
          explanation: 'If a generated password does not work for you, generate a new one instead of turning it into a personal pattern.'
        }
      ]
    },
    {
      id: 'reuse-managers',
      title: 'Reuse and Managers',
      shortTitle: 'Reuse',
      kicker: 'Quiz 2',
      description: 'Learn why each account needs its own password and how password managers help.',
      questions: [
        {
          scenario: 'You use the same password for a game, school email, and a shopping site.',
          question: 'Why is that risky?',
          options: ['It makes the password too long', 'One breach can unlock all three accounts', 'Websites can see every password you use', 'It only matters for adults'],
          answer: 1,
          explanation: 'If one site leaks a reused password, attackers try it on other sites automatically.'
        },
        {
          scenario: 'A password manager is available to you.',
          question: 'What is it for?',
          options: ['Remembering unique passwords safely', 'Making every password the same', 'Sharing class passwords publicly', 'Turning off two-factor authentication'],
          answer: 0,
          explanation: 'A password manager helps you keep strong, unique passwords without memorizing all of them.'
        },
        {
          scenario: 'You are using a password manager.',
          question: 'What should your master password be?',
          options: ['Short and easy', 'The same as your school password', 'Long, unique, and private', 'Your lunch number'],
          answer: 2,
          explanation: 'The master password protects the manager, so it should be long, unique, and never shared.'
        },
        {
          scenario: 'You cannot use a password manager for one school account.',
          question: 'What is the next best habit?',
          options: ['Reuse a familiar password', 'Use a unique generated password you can type', 'Use your username as the password', 'Write it in a public class doc'],
          answer: 1,
          explanation: 'Even without a manager, the password should still be unique and generated rather than reused.'
        },
        {
          scenario: 'A friend wants to save your login in their browser for you.',
          question: 'What should you say?',
          options: ['Yes, if they promise not to look', 'No, my passwords stay in my account or manager', 'Only for school sites', 'Only if they delete it next week'],
          answer: 1,
          explanation: 'Saving your password in someone else’s browser gives their device access to your account.'
        },
        {
          scenario: 'You have dozens of accounts.',
          question: 'What is the safest realistic plan?',
          options: ['One password for everything', 'A few passwords rotated around', 'Unique passwords saved in a manager', 'Passwords based on account names'],
          answer: 2,
          explanation: 'Unique passwords limit damage. A manager makes that realistic for everyday life.'
        },
        {
          scenario: 'A site tells you your password appeared in a breach.',
          question: 'What should you do?',
          options: ['Change only that password if it was unique', 'Ignore it if you still remember it', 'Post the password to ask friends', 'Reuse it with one more symbol'],
          answer: 0,
          explanation: 'If the password was unique, changing that account may be enough. If it was reused, change every account that used it.'
        }
      ]
    },
    {
      id: 'phishing',
      title: 'Phishing and Links',
      shortTitle: 'Phishing',
      kicker: 'Quiz 3',
      description: 'Practice spotting urgent messages, fake sign-in pages, and suspicious links.',
      questions: [
        {
          scenario: 'You get a message that says your account will be deleted unless you sign in right now.',
          question: 'What is the safest next move?',
          options: ['Click the link quickly', 'Reply with your username', 'Open the school site from a bookmark or typed address', 'Forward it to everyone'],
          answer: 2,
          explanation: 'Urgent login messages are a classic phishing trick. Go to the real site yourself.'
        },
        {
          scenario: 'A link says school-login.example.com but the real school site uses yourschool.edu.',
          question: 'What should you do?',
          options: ['Sign in because it says school', 'Check with a teacher or open the real site yourself', 'Try your old password first', 'Share it in class chat'],
          answer: 1,
          explanation: 'Look-alike addresses are suspicious. Use the known real site or ask a trusted adult.'
        },
        {
          scenario: 'An email says you won a prize and asks for your school password.',
          question: 'What is the biggest warning sign?',
          options: ['It mentions a prize', 'It asks for your password', 'It arrived in the morning', 'It has a picture'],
          answer: 1,
          explanation: 'Legitimate people and sites should not ask you to send your password in a message.'
        },
        {
          scenario: 'A login page looks almost normal but has spelling mistakes and a strange web address.',
          question: 'What should you do?',
          options: ['Enter only your username', 'Close it and go to the real site another way', 'Try a fake password first', 'Refresh until it looks better'],
          answer: 1,
          explanation: 'A strange address plus sloppy details is enough reason to stop and use a trusted path.'
        },
        {
          scenario: 'A classmate sends a file link and says "open this now."',
          question: 'What is a safer response?',
          options: ['Ask what it is before opening', 'Download it immediately', 'Enter your password if asked', 'Forward it to more people'],
          answer: 0,
          explanation: 'Unexpected links and files deserve a quick check, even when they come from someone you know.'
        },
        {
          scenario: 'A pop-up says your computer is infected and asks you to call a number.',
          question: 'What should you do?',
          options: ['Call the number', 'Give remote access', 'Close it and tell a trusted adult or IT', 'Pay to remove the warning'],
          answer: 2,
          explanation: 'Scare pop-ups try to rush you. Stop, close it if possible, and get help from a trusted person.'
        },
        {
          scenario: 'You clicked a suspicious link but did not enter a password.',
          question: 'What should you do next?',
          options: ['Pretend nothing happened', 'Tell a teacher or trusted adult', 'Send it to friends to test', 'Enter your password to see what happens'],
          answer: 1,
          explanation: 'Reporting early helps stop a scam from spreading, even if you did not type anything.'
        }
      ]
    },
    {
      id: 'mfa-recovery',
      title: 'MFA and Recovery',
      shortTitle: 'MFA',
      kicker: 'Quiz 4',
      description: 'Protect verification codes, push prompts, backup codes, and recovery options.',
      questions: [
        {
          scenario: 'A site offers two-factor authentication.',
          question: 'What does two-factor authentication do?',
          options: ['It replaces your password', 'It makes you change passwords every day', 'It adds another proof that it is really you', 'It stores your password for friends'],
          answer: 2,
          explanation: 'Two-factor authentication adds another layer, like a code or prompt, after the password.'
        },
        {
          scenario: 'A login screen asks for a code from your authenticator app.',
          question: 'Who should get that code?',
          options: ['Only you', 'Anyone from tech support who asks', 'A friend helping with homework', 'A website chat box'],
          answer: 0,
          explanation: 'A two-factor code is a secret. Real support staff should not need you to read it to them.'
        },
        {
          scenario: 'Your phone asks you to approve a login you did not start.',
          question: 'What should you tap?',
          options: ['Approve', 'Deny or reject', 'Approve if you are busy', 'Approve, then change it later'],
          answer: 1,
          explanation: 'Unexpected MFA prompts can mean someone has your password. Deny the request and get help.'
        },
        {
          scenario: 'A game chat message asks for a six-digit login code to "verify your account."',
          question: 'What should you do?',
          options: ['Send it if they seem official', 'Never share the code', 'Send it after changing your password', 'Ask them to promise it is safe'],
          answer: 1,
          explanation: 'Login codes are private. Sharing one can let someone into your account.'
        },
        {
          scenario: 'You receive backup recovery codes.',
          question: 'Where should they go?',
          options: ['In a safe private place', 'In a public class folder', 'In your social profile', 'On a sticky note on a shared computer'],
          answer: 0,
          explanation: 'Recovery codes can unlock accounts, so they need private storage.'
        },
        {
          scenario: 'You lose access to your phone used for MFA.',
          question: 'What is the best next step?',
          options: ['Create a new account immediately', 'Ask a teacher, guardian, or official support for recovery help', 'Guess backup codes online', 'Use a friend’s phone number secretly'],
          answer: 1,
          explanation: 'Account recovery should go through trusted adults or official support channels.'
        },
        {
          scenario: 'Someone says they are IT and asks for your MFA code.',
          question: 'What should you remember?',
          options: ['Real support may need the code', 'MFA codes prove identity and should stay private', 'Codes are safe after 30 seconds', 'It is okay if they know your name'],
          answer: 1,
          explanation: 'MFA codes are powerful because they prove identity. Do not share them with callers or chat messages.'
        }
      ]
    },
    {
      id: 'shared-devices',
      title: 'Shared Devices',
      shortTitle: 'Devices',
      kicker: 'Quiz 5',
      description: 'Stay safer on classroom computers, borrowed devices, public Wi-Fi, and shared browsers.',
      questions: [
        {
          scenario: 'You are on a shared classroom computer.',
          question: 'What should you do before leaving?',
          options: ['Close the lid or monitor', 'Log out of your accounts', 'Leave tabs open for the next class', 'Save your password in the browser'],
          answer: 1,
          explanation: 'Logging out keeps the next person from opening your accounts from the same browser session.'
        },
        {
          scenario: 'A browser on a shared computer asks to save your password.',
          question: 'What should you choose?',
          options: ['Save', 'Never or not now', 'Save only for school', 'Save if class is almost over'],
          answer: 1,
          explanation: 'Shared browsers should not store your personal passwords.'
        },
        {
          scenario: 'You borrowed a friend’s laptop to check email.',
          question: 'What should you avoid?',
          options: ['Logging out afterward', 'Using a private window if available', 'Saving your password in their browser', 'Opening the real site yourself'],
          answer: 2,
          explanation: 'Saving passwords on someone else’s device can leave your account accessible after you return it.'
        },
        {
          scenario: 'You find someone else still signed in on a classroom computer.',
          question: 'What should you do?',
          options: ['Read their messages', 'Post something funny', 'Log them out and tell a teacher', 'Change their password'],
          answer: 2,
          explanation: 'Respect their privacy, log out if appropriate, and let a trusted adult know.'
        },
        {
          scenario: 'A public Wi-Fi login page asks for your school password.',
          question: 'What is safest?',
          options: ['Enter it because Wi-Fi needs it', 'Check with a trusted adult or use the official school network instructions', 'Try your password twice', 'Use a friend’s password'],
          answer: 1,
          explanation: 'Do not put school credentials into random Wi-Fi pages without confirming they are official.'
        },
        {
          scenario: 'You download a browser extension promising free game currency.',
          question: 'What is the concern?',
          options: ['Extensions can sometimes read or change browser data', 'Extensions are always school-approved', 'Game extensions improve security', 'It only matters on phones'],
          answer: 0,
          explanation: 'Extensions can have powerful access. Only install approved, trusted tools.'
        },
        {
          scenario: 'You are finished using a web app on a shared device.',
          question: 'Which action is most complete?',
          options: ['Close the tab only', 'Log out, then close the tab', 'Turn down the brightness', 'Leave the browser open'],
          answer: 1,
          explanation: 'Closing a tab may not end the session. Logging out is the safer habit.'
        }
      ]
    },
    {
      id: 'incident-response',
      title: 'When Things Go Wrong',
      shortTitle: 'Response',
      kicker: 'Quiz 6',
      description: 'Know when to change a password, report suspicious activity, and ask for help.',
      questions: [
        {
          scenario: 'You think someone else may know your password.',
          question: 'What should you do first?',
          options: ['Ignore it unless something bad happens', 'Change it and tell a trusted adult or teacher', 'Post a warning online', 'Use the same password with one extra number'],
          answer: 1,
          explanation: 'Change the password, then get help. If the account is important, someone may need to check activity.'
        },
        {
          scenario: 'You see messages sent from your account that you did not write.',
          question: 'What should you do?',
          options: ['Delete them quietly', 'Change your password and report it', 'Send more messages explaining', 'Give the account to a friend'],
          answer: 1,
          explanation: 'Unexpected activity can mean the account is compromised. Change the password and report it quickly.'
        },
        {
          scenario: 'You accidentally shared your password in a chat.',
          question: 'What is the safest response?',
          options: ['Change it right away', 'Hope nobody noticed', 'Ask people not to use it', 'Delete the message next week'],
          answer: 0,
          explanation: 'Once a password is shared, treat it as no longer private and change it.'
        },
        {
          scenario: 'A site says your password is weak.',
          question: 'What should you do?',
          options: ['Add 1 to the end', 'Create a new strong unique password', 'Ignore it if you like the password', 'Use your school name with a symbol'],
          answer: 1,
          explanation: 'A warning is a good time to replace the password with something stronger and unique.'
        },
        {
          scenario: 'You receive an email about a login from a place you do not recognize.',
          question: 'What should you do?',
          options: ['Use the email link to log in', 'Open the real site yourself, check activity, and change the password if needed', 'Forward the email to friends', 'Reply with your password'],
          answer: 1,
          explanation: 'Use a trusted path to check the account. Do not use links from suspicious messages.'
        },
        {
          scenario: 'A friend says they got hacked and asks for your password to test something.',
          question: 'What should you do?',
          options: ['Share it to help', 'Do not share it and encourage them to get trusted help', 'Use an old password', 'Share it only in person'],
          answer: 1,
          explanation: 'Helping a friend should not require sharing your password. Encourage recovery through trusted support.'
        },
        {
          scenario: 'You are unsure whether something is safe.',
          question: 'What is a good rule?',
          options: ['Ask before entering private information', 'Click faster before it expires', 'Try your password and see', 'Share it with classmates first'],
          answer: 0,
          explanation: 'Pausing and asking a trusted adult or teacher is a strong security habit.'
        }
      ]
    }
  ];

  if (Array.isArray(studentLocale.modules) && studentLocale.modules.length) {
    modules = studentLocale.modules;
  }

  var state = {
    activeModule: 0,
    started: false,
    current: 0,
    selected: -1,
    locked: false,
    answers: [],
    results: modules.map(function () { return null; })
  };

  var els = {
    moduleSummary: document.getElementById('moduleSummary'),
    moduleGrid: document.getElementById('moduleGrid'),
    quizKicker: document.getElementById('quizKicker'),
    title: document.getElementById('quizTitle'),
    progressLabel: document.getElementById('quizProgressLabel'),
    progressBar: document.getElementById('quizProgressBar'),
    moduleIntro: document.getElementById('moduleIntro'),
    moduleDescription: document.getElementById('moduleDescription'),
    scenario: document.getElementById('quizScenario'),
    question: document.getElementById('quizQuestion'),
    options: document.getElementById('quizOptions'),
    feedback: document.getElementById('quizFeedback'),
    start: document.getElementById('quizStart'),
    check: document.getElementById('quizCheck'),
    next: document.getElementById('quizNext'),
    panel: document.getElementById('quizPanel'),
    resultsPanel: document.getElementById('quizResults'),
    resultScore: document.getElementById('resultScore'),
    resultLabel: document.getElementById('resultLabel'),
    resultMessage: document.getElementById('resultMessage'),
    resultReview: document.getElementById('resultReview'),
    restart: document.getElementById('quizRestart'),
    nextModule: document.getElementById('quizNextModule'),
    certificateSection: document.getElementById('certificateSection'),
    certificatePanel: document.getElementById('certificatePanel'),
    certificateBadge: document.getElementById('certificateLockBadge'),
    certificateName: document.getElementById('certificateName'),
    certificatePrint: document.getElementById('certificatePrint'),
    certificateStudentName: document.getElementById('certificateStudentName'),
    certificateGrade: document.getElementById('certificateGrade'),
    certificateDate: document.getElementById('certificateDate'),
    certificateModules: document.getElementById('certificateModules')
  };

  function optionLetter(index) {
    return String.fromCharCode(65 + index);
  }

  function getActiveModule() {
    return modules[state.activeModule];
  }

  function getPassedCount() {
    return state.results.filter(function (result) {
      return result && result.passed;
    }).length;
  }

  function getQuestionCount() {
    return getActiveModule().questions.length;
  }

  function isCertificateUnlocked() {
    return getPassedCount() === modules.length;
  }

  function scoreAnswers(moduleIndex, answers) {
    var module = modules[moduleIndex];
    var correct = module.questions.reduce(function (total, question, index) {
      return total + (answers[index] === question.answer ? 1 : 0);
    }, 0);
    var total = module.questions.length;
    var percent = Math.round(correct / total * 100);
    return {
      correct: correct,
      total: total,
      percent: percent,
      passed: percent >= PASSING_PERCENT,
      answers: answers.slice()
    };
  }

  function getOverallGrade() {
    var totalCorrect = 0;
    var totalQuestions = 0;
    state.results.forEach(function (result) {
      if (!result || !result.passed) return;
      totalCorrect += result.correct;
      totalQuestions += result.total;
    });
    if (!totalQuestions) return 0;
    return Math.round(totalCorrect / totalQuestions * 100);
  }

  function renderModuleGrid() {
    var passedCount = getPassedCount();
    els.moduleSummary.textContent = formatText(text.passedSummary, { passed: passedCount, total: modules.length });
    els.moduleGrid.innerHTML = '';

    modules.forEach(function (module, index) {
      var result = state.results[index];
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'module-card';
      button.dataset.moduleIndex = String(index);
      button.classList.toggle('is-active', index === state.activeModule);
      button.classList.toggle('is-passed', !!(result && result.passed));
      button.innerHTML =
        '<span>' + module.kicker + '</span>' +
        '<strong>' + module.shortTitle + '</strong>' +
        '<em>' + (result ? result.percent + '%' : text.notTaken) + '</em>';
      button.addEventListener('click', function () {
        selectModule(index);
      });
      els.moduleGrid.appendChild(button);
    });
  }

  function setProgress() {
    var total = getQuestionCount();
    var completed = state.started ? state.current : 0;
    if (state.locked) completed += 1;
    completed = Math.min(completed, total);
    els.progressLabel.textContent = formatText(text.progress, { current: completed, total: total });
    els.progressBar.style.width = (completed / total * 100) + '%';
  }

  function renderIntro() {
    var module = getActiveModule();
    var result = state.results[state.activeModule];

    state.started = false;
    state.selected = -1;
    state.locked = false;
    els.quizKicker.textContent = module.kicker;
    els.title.textContent = module.title;
    els.moduleDescription.textContent = module.description + ' ' + formatText(text.passInstruction, {
      needed: Math.ceil(getQuestionCount() * PASSING_PERCENT / 100),
      total: getQuestionCount()
    });
    els.start.textContent = result ? text.retakeQuiz : text.startQuiz;
    els.moduleIntro.hidden = false;
    els.panel.hidden = true;
    els.resultsPanel.hidden = true;
    setProgress();
    renderModuleGrid();
  }

  function selectModule(index) {
    state.activeModule = index;
    state.current = 0;
    state.answers = [];
    renderIntro();
  }

  function renderQuestion() {
    var module = getActiveModule();
    var question = module.questions[state.current];
    state.selected = -1;
    state.locked = false;

    els.quizKicker.textContent = formatText(text.moduleKickerOf, { kicker: module.kicker, total: modules.length });
    els.title.textContent = formatText(text.questionTitle, { title: module.title, number: state.current + 1 });
    els.scenario.textContent = question.scenario;
    els.question.textContent = question.question;
    els.feedback.hidden = true;
    els.feedback.textContent = '';
    els.options.innerHTML = '';

    question.options.forEach(function (option, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.setAttribute('aria-pressed', 'false');
      button.dataset.index = String(index);
      button.innerHTML = '<span class="option-letter">' + optionLetter(index) + '</span><span>' + option + '</span>';
      button.addEventListener('click', function () {
        selectOption(index);
      });
      els.options.appendChild(button);
    });

    els.moduleIntro.hidden = true;
    els.resultsPanel.hidden = true;
    els.panel.hidden = false;
    els.check.disabled = true;
    els.check.hidden = false;
    els.next.hidden = true;
    els.next.textContent = state.current === getQuestionCount() - 1 ? text.seeScore : text.next;
    setProgress();
  }

  function selectOption(index) {
    if (state.locked) return;
    state.selected = index;
    els.check.disabled = false;
    Array.prototype.forEach.call(els.options.querySelectorAll('.quiz-option'), function (button) {
      var isSelected = Number(button.dataset.index) === index;
      button.classList.toggle('is-selected', isSelected);
      button.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }

  function checkAnswer() {
    if (state.selected < 0 || state.locked) return;
    var question = getActiveModule().questions[state.current];
    var correct = state.selected === question.answer;
    state.locked = true;
    state.answers[state.current] = state.selected;

    Array.prototype.forEach.call(els.options.querySelectorAll('.quiz-option'), function (button) {
      var index = Number(button.dataset.index);
      button.disabled = true;
      if (index === question.answer) button.classList.add('is-correct');
      if (index === state.selected && !correct) button.classList.add('is-wrong');
    });

    els.feedback.hidden = false;
    els.feedback.className = 'quiz-feedback ' + (correct ? 'is-good' : 'is-review');
    els.feedback.textContent = (correct ? text.correctPrefix : text.reviewPrefix) + question.explanation;
    els.check.hidden = true;
    els.next.hidden = false;
    setProgress();
  }

  function renderResults() {
    var module = getActiveModule();
    var result = scoreAnswers(state.activeModule, state.answers);
    state.results[state.activeModule] = result;

    els.panel.hidden = true;
    els.moduleIntro.hidden = true;
    els.resultsPanel.hidden = false;
    els.resultScore.textContent = result.percent + '%';
    els.resultLabel.textContent = result.passed ? text.passed : text.retakeNeeded;
    els.resultMessage.textContent = result.passed
      ? text.passedMessage
      : text.retakeMessage;
    els.progressLabel.textContent = result.correct + ' / ' + result.total;
    els.progressBar.style.width = result.percent + '%';

    els.resultReview.innerHTML = '';
    module.questions.forEach(function (question, index) {
      var answered = result.answers[index];
      var item = document.createElement('article');
      item.className = 'review-item ' + (answered === question.answer ? 'is-correct' : 'is-wrong');
      item.innerHTML =
        '<span>' + (answered === question.answer ? text.gotIt : text.review) + '</span>' +
        '<h3>' + question.question + '</h3>' +
        '<p>' + formatText(text.yourAnswer, { answer: question.options[answered] }) + '</p>' +
        '<p>' + formatText(text.bestAnswer, { answer: question.options[question.answer] }) + '</p>';
      els.resultReview.appendChild(item);
    });

    renderModuleGrid();
    updateCertificate();
  }

  function startQuiz() {
    state.started = true;
    state.current = 0;
    state.answers = new Array(getQuestionCount());
    renderQuestion();
  }

  function nextQuestion() {
    if (state.current >= getQuestionCount() - 1) {
      renderResults();
      return;
    }
    state.current += 1;
    renderQuestion();
  }

  function nextModule() {
    var nextIndex = modules.findIndex(function (_module, index) {
      return index > state.activeModule && !(state.results[index] && state.results[index].passed);
    });

    if (nextIndex < 0) {
      nextIndex = modules.findIndex(function (_module, index) {
        return !(state.results[index] && state.results[index].passed);
      });
    }

    if (nextIndex < 0) {
      updateCertificate();
      document.getElementById('certificateTitle').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    selectModule(nextIndex);
  }

  function updateCertificateName() {
    var name = els.certificateName.value.trim();
    els.certificateStudentName.textContent = name || text.studentName;
  }

  function updateCertificate() {
    var unlocked = isCertificateUnlocked();
    var grade = getOverallGrade();
    var today = new Date().toLocaleDateString(studentLocale.dateLocale || undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    els.certificateSection.hidden = !unlocked;
    els.certificatePanel.classList.toggle('is-locked', !unlocked);
    els.certificateBadge.textContent = unlocked ? text.unlocked : formatText(text.passedBadge, { passed: getPassedCount(), total: modules.length });
    els.certificateName.disabled = !unlocked;
    els.certificatePrint.disabled = !unlocked;
    els.certificateGrade.textContent = unlocked ? formatText(text.overallGrade, { grade: grade }) : text.overallGradeBlank;
    els.certificateDate.textContent = unlocked ? formatText(text.date, { date: today }) : text.dateBlank;
    els.certificateModules.innerHTML = '';

    modules.forEach(function (module, index) {
      var result = state.results[index];
      var row = document.createElement('div');
      row.innerHTML =
        '<span>' + module.title + '</span>' +
        '<strong>' + (result && result.passed ? result.percent + '%' : text.incomplete) + '</strong>';
      els.certificateModules.appendChild(row);
    });

    updateCertificateName();
  }

  function printCertificate() {
    if (!isCertificateUnlocked()) return;
    updateCertificateName();
    window.print();
  }

  if (!els.moduleGrid) return;

  els.start.addEventListener('click', startQuiz);
  els.check.addEventListener('click', checkAnswer);
  els.next.addEventListener('click', nextQuestion);
  els.restart.addEventListener('click', startQuiz);
  els.nextModule.addEventListener('click', nextModule);
  els.certificateName.addEventListener('input', updateCertificateName);
  els.certificatePrint.addEventListener('click', printCertificate);

  renderIntro();
  updateCertificate();
})();
