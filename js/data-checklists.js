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
