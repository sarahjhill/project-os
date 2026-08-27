/* =====================================================================
   PROJECT OS — Checklists
   Reusable, tickable command sequences for the Today tab.
   Tick state is stored per project on project().checks, so the same
   checklist can be run fresh for every project.

   Schema:
     id, title, intro, steps[]
     step: { id, label, cmd, note, alt }
       cmd  — the command(s) to run, shown in a copyable block
       note — a short line of context
       alt  — an alternative command, shown smaller
   ===================================================================== */
window.CHECKLISTS = [
  {
    id: 'django-venv',
    title: 'Django + virtual environment setup',
    intro: 'From an empty folder to a running development server. Work down the list — each step assumes the one before it worked.',
    steps: [
      {
        id: 'dv-1',
        label: 'Create a Python 3.12 virtual environment',
        cmd: 'cd /Users/sarahhill/Documents/vscode-projects/django_project\npython3.12 -m venv .venv',
        note: 'Change the path to whichever project folder you are setting up.'
      },
      {
        id: 'dv-2',
        label: 'Activate the virtual environment',
        cmd: 'source .venv/bin/activate',
        note: 'Your prompt should now start with (.venv) — that is how you know it worked.'
      },
      {
        id: 'dv-3',
        label: 'Upgrade pip',
        cmd: 'python -m pip install --upgrade pip',
        note: ''
      },
      {
        id: 'dv-4',
        label: 'Install Django',
        cmd: 'python -m pip install django',
        note: ''
      },
      {
        id: 'dv-5',
        label: 'Check the Django version',
        cmd: 'django-admin --version',
        alt: 'python -m django --version',
        note: ''
      },
      {
        id: 'dv-6',
        label: 'Create the Django project',
        cmd: 'django-admin startproject myproject .',
        note: 'The trailing dot matters — it creates the project in the current folder rather than nesting another one.'
      },
      {
        id: 'dv-7',
        label: 'Create an app',
        cmd: 'python manage.py startapp hello_world',
        alt: 'python manage.py startapp myapp',
        note: 'A project holds settings; an app holds the actual features. You will have several apps in one project.'
      },
      {
        id: 'dv-8',
        label: 'Apply migrations',
        cmd: 'python manage.py migrate',
        note: 'Sets up the default tables Django needs — users, sessions, admin.'
      },
      {
        id: 'dv-9',
        label: 'Run the development server',
        cmd: 'python manage.py runserver 127.0.0.1:8080',
        note: 'Use a free port if 8000 is already busy. Ctrl+C stops it.'
      },
      {
        id: 'dv-10',
        label: 'Save dependencies to requirements.txt',
        cmd: 'python -m pip freeze > requirements.txt',
        note: 'Re-run this EVERY time you install something new. Heroku installs exactly what is in this file and nothing else — a package missing here is the most common first-deploy failure.'
      }
    ]
  },
  {
    id: 'django-resume',
    title: 'Coming back to an existing project',
    intro: 'The venv already exists. You only need these.',
    steps: [
      {
        id: 'dr-1',
        label: 'Go to the project folder',
        cmd: 'cd /Users/sarahhill/Documents/vscode-projects/django_project',
        note: ''
      },
      {
        id: 'dr-2',
        label: 'Activate the virtual environment',
        cmd: 'source .venv/bin/activate',
        note: 'Every new terminal needs this. Forgetting it is why "django not found" happens.'
      },
      {
        id: 'dr-3',
        label: 'Carry on working',
        cmd: 'python manage.py runserver 127.0.0.1:8080',
        note: ''
      }
    ]
  },
  {
    id: 'lighthouse',
    title: 'Lighthouse & validation pass',
    intro: 'Run this against the DEPLOYED site, not localhost. Accessibility is the score that is actually assessed — Performance on a free-tier dyno is not worth chasing.',
    steps: [
      {
        id: 'lh-1',
        label: 'Wake the site first',
        cmd: '',
        note: 'Eco dynos sleep after 30 minutes. A cold start will wreck your Performance number and tell you nothing true. Load the site once, wait for it, then reload before auditing.'
      },
      {
        id: 'lh-2',
        label: 'Open an incognito window',
        cmd: '',
        note: 'Extensions inject scripts and skew every category. Incognito (Shift+Cmd+N) with extensions off gives you the real numbers.'
      },
      {
        id: 'lh-3',
        label: 'Open the Lighthouse panel',
        cmd: '',
        note: 'DevTools with Option+Cmd+I, then the Lighthouse tab. If you cannot see it, click the » overflow at the end of the tab strip.'
      },
      {
        id: 'lh-4',
        label: 'Run Mobile · Navigation · all four categories',
        cmd: '',
        note: 'Categories are Performance, Accessibility, Best Practices and SEO. Mode: Navigation. Device: Mobile — it is the harsher test and the one graders tend to run.'
      },
      {
        id: 'lh-5',
        label: 'Run again on Desktop',
        cmd: '',
        note: 'Scores differ meaningfully between the two. Capture both.'
      },
      {
        id: 'lh-6',
        label: 'Get Accessibility to 100',
        cmd: '',
        note: 'This is the one tied to criterion 1.1. Read the failing audits, not just the number — each one names the element and links an explanation.'
      },
      {
        id: 'lh-7',
        label: 'Do not stop at a green Accessibility score',
        cmd: '',
        note: 'Lighthouse only catches the machine-checkable subset of WCAG — roughly a third. It cannot tell whether your alt text is meaningful, your headings are in a sensible order, or your error messages make sense. 100 is the floor, not proof.'
      },
      {
        id: 'lh-8',
        label: 'Run every page through WAVE',
        cmd: '',
        note: 'wave.webaim.org, or the browser extension. It catches things Lighthouse misses — contrast on specific elements, form labels, heading structure. Do every page, not just the home page.'
      },
      {
        id: 'lh-9',
        label: 'Test with the keyboard only',
        cmd: '',
        note: 'Put the mouse down. Tab through every page: can you reach every control, is the focus ring always visible, can you complete a form and submit it? Automated tools cannot check this and it is a real WCAG requirement.'
      },
      {
        id: 'lh-10',
        label: 'Validate the HTML',
        cmd: '',
        note: 'validator.w3.org — use "validate by URI" against the live pages. Django templates can produce nesting errors you will not spot by eye.'
      },
      {
        id: 'lh-11',
        label: 'Validate the CSS',
        cmd: '',
        note: 'jigsaw.w3.org/css-validator. Warnings from Bootstrap are normal and can be noted rather than fixed — say so in the README.'
      },
      {
        id: 'lh-12',
        label: 'Lint the Python',
        cmd: 'python -m flake8 .',
        note: 'Criterion 1.4 asks for PEP 8 adherence. This is free marks — the linter tells you exactly what to change.'
      },
      {
        id: 'lh-13',
        label: 'Screenshot every result',
        cmd: '',
        note: 'Save into docs/images. Lighthouse mobile, Lighthouse desktop, WAVE clean, HTML valid, CSS valid, linter clean. Evidence you cannot reconstruct after you have changed the code.'
      },
      {
        id: 'lh-14',
        label: 'Write it up as VALIDATION, separately from testing',
        cmd: '',
        note: 'Code Institute say explicitly they want testing "beyond results of validation tools". Put validators in their own README section so the marker can see your behaviour testing is separate — otherwise it reads as though screenshots are all you did.'
      }
    ]
  },
  {
    id: 'django-trouble',
    title: 'When something is not working',
    intro: 'The four that catch everyone. Tick one off when you have ruled it out.',
    steps: [
      {
        id: 'dt-1',
        label: 'VS Code cannot see the virtual environment',
        cmd: '',
        note: 'Open a new terminal · activate the venv again · Command Palette → Python: Select Interpreter → choose the one inside the project’s .venv'
      },
      {
        id: 'dt-2',
        label: 'Port 8000 is already in use',
        cmd: 'python manage.py runserver 127.0.0.1:8080',
        note: 'Any free port will do. Something else is already listening on 8000.'
      },
      {
        id: 'dt-3',
        label: 'The Explorer is not showing a new app folder',
        cmd: '',
        note: 'Right-click the Explorer panel → Refresh Explorer. Or reload the VS Code window.'
      },
      {
        id: 'dt-4',
        label: 'Wrong Python version',
        cmd: 'python -V',
        note: 'Should report Python 3.12.x. If it does not, the venv is probably not activated.'
      }
    ]
  }
];

try { window.__bootStage = 'checklists-loaded'; } catch (e) { }
