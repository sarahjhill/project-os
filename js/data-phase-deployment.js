/* =====================================================================
   PROJECT OS — Deployment phase (shared across tracks)

   The practical, command-by-command version of "get this project onto
   GitHub and onto the internet." Written for a solo developer working
   in VS Code, not a team — no CI/CD, no staging environment, just the
   real commands in the order you actually run them.

   Spliced onto BOTH window.PHASES (client) and window.PHASES_GROWTH
   (growth) by data-tracks.js, so it shows up on every project regardless
   of track. Same task schema as the other phase files:
     id, title, role, est (hours), pri (1=Critical 4=Low), pts
     why, how[], deliver[], tools[], dod[]
   ===================================================================== */
window.PHASE_DEPLOYMENT = {
  id: 'dep', num: 100, name: 'Deployment: Repo, Environments & Hosting', short: 'Deployment',
  goal: 'Get the project onto GitHub and, where it needs to be reachable on the internet, onto a live host — with a repeatable set of commands for every update after that.',
  exit: [
    'Project lives in a GitHub repo, pushed from VS Code',
    'A virtual environment keeps this project\'s packages separate from every other project on the machine',
    'Where the project needs to be live, it is deployed and reachable at a public URL',
    'You know the exact commands to run every time you want to push an update'
  ],
  tasks: [
    {
      id: 'dep-1', title: 'Create the local workspace and a virtual environment', role: 'Dev', est: 0.5, pri: 1, pts: 2,
      why: 'A virtual environment is a private, isolated set of Python packages for this project only. Without one, every project on your machine shares the same packages, and upgrading one project\'s packages can quietly break another. It is the single habit worth building early.',
      how: [
        'Open a terminal (or the VS Code terminal: Terminal → New Terminal) and move into your projects folder, e.g. cd Documents/vscode-projects',
        'Create the project folder and move into it: mkdir project_name then cd project_name',
        'Create the virtual environment: python -m venv env',
        'Activate it — Mac/Linux: source env/bin/activate — Windows: env\\Scripts\\activate',
        'You\'ll know it worked because the terminal prompt now shows (env) at the start of the line.',
        'Install what the project needs, e.g. pip install django',
        'Every time you come back to this project in a new terminal session, activate the environment again before running anything — it does not stay active between sessions.',
        'Open the whole folder in VS Code: code . (or File → Open Folder). In the bottom-right corner, click the Python version shown and pick the one inside env/ so VS Code uses the right one.'
      ],
      deliver: ['Project folder', 'Virtual environment (env/)', 'VS Code pointed at the right interpreter'],
      tools: ['VS Code', 'Python'],
      dod: ['Terminal prompt shows (env) when working on the project', 'VS Code interpreter set to env/'],
      docs: []
    },
    {
      id: 'dep-2', title: 'Turn it into a Git repo and push to GitHub', role: 'Dev', est: 0.5, pri: 1, pts: 2,
      why: 'Git tracks every change you make so nothing is ever truly lost; GitHub is where that history lives online, backed up, and shareable.',
      how: [
        'Before anything else, create a .gitignore file in the project root so you never accidentally commit the environment or secrets. At minimum, it should list: env/, __pycache__/, *.pyc, .env, db.sqlite3, staticfiles/',
        'Turn the folder into a repo: git init',
        'Stage everything and make the first commit: git add -A then git commit -m "Initial commit"',
        'Go to github.com, click the + in the top right → New repository. Name it to match your project folder, leave it empty (no README/.gitignore/licence — you already have files locally), and create it.',
        'GitHub will show you a remote URL — copy it, then back in the terminal run: git remote add origin PASTE_URL_HERE',
        'Rename your branch to main if it isn\'t already: git branch -M main',
        'Push it up for the first time: git push -u origin main',
        'Refresh the GitHub page — your files should now be there.'
      ],
      deliver: ['.gitignore', 'Git repo initialised', 'GitHub repo created and linked', 'First push complete'],
      tools: ['Git', 'GitHub'],
      dod: ['Files visible on GitHub', 'env/ and .env are NOT visible on GitHub'],
      docs: []
    },
    {
      id: 'dep-3', title: 'Everyday commands: working on it and pushing updates', role: 'Dev', est: 0.25, pri: 2, pts: 1,
      why: 'This is the loop you\'ll repeat every single time you sit down to work on the project, so it\'s worth having it written down rather than half-remembered.',
      how: [
        'Start of a session: cd into the project, then activate the environment (source env/bin/activate, or env\\Scripts\\activate on Windows).',
        'See what\'s changed since your last commit: git status — anything in red is unstaged, anything in green is staged and ready to commit.',
        'See the actual line-by-line changes if you want to check before committing: git diff',
        'Stage your changes: git add . (everything) or git add specific_file.py (just one file).',
        'Commit with a short, honest message describing what changed: git commit -m "Add booking form validation"',
        'Push it to GitHub: git push',
        'If you\'re working from a second computer, or just want to make sure you have the latest version before starting: git pull',
        'See your commit history at a glance: git log --oneline',
        'New packages installed since your last commit? Update the requirements file so it stays accurate: pip freeze > requirements.txt, then add/commit/push it like any other change.'
      ],
      deliver: ['A repeatable commit-and-push habit'],
      tools: ['Git', 'VS Code terminal'],
      dod: ['git status shows a clean working tree after every session', 'requirements.txt kept up to date'],
      docs: []
    },
    {
      id: 'dep-4', title: 'Prepare a Django project for Heroku', role: 'Dev', est: 2, pri: 1, pts: 3,
      why: 'Heroku needs a few extra files and settings changes to know how to run a Django project — none of this changes how the site behaves, it just tells Heroku what to do with it.',
      how: [
        'With your virtual environment active, install what production needs: pip install gunicorn whitenoise dj-database-url psycopg2-binary',
        'Freeze your packages so Heroku installs the same ones: pip freeze > requirements.txt',
        'Create a file called exactly Procfile (no extension) in the project root containing one line: web: gunicorn PROJECTNAME.wsgi — replace PROJECTNAME with your Django project\'s folder name (the one with settings.py in it).',
        'Create a runtime.txt file with the Python version you\'re using, e.g. python-3.12.4 — check yours with python --version.',
        'In settings.py: set ALLOWED_HOSTS = [\'.herokuapp.com\', \'127.0.0.1\', \'localhost\'] (add your own domain later if you connect one).',
        'In settings.py: never leave DEBUG = True in production — read it from an environment variable instead: DEBUG = os.environ.get(\'DEBUG\', \'False\') == \'True\'',
        'In settings.py: move SECRET_KEY out of the file and read it from the environment too: SECRET_KEY = os.environ[\'SECRET_KEY\'] — you\'ll set the actual value on Heroku, never commit it.',
        'In settings.py: add whitenoise to MIDDLEWARE, directly under SecurityMiddleware, and set STATIC_ROOT = BASE_DIR / \'staticfiles\' plus STATICFILES_STORAGE = \'whitenoise.storage.CompressedManifestStaticFilesStorage\'',
        'In settings.py: replace the DATABASES block so Heroku\'s database is picked up automatically: import dj_database_url at the top, then DATABASES[\'default\'] = dj_database_url.config(conn_max_age=600)',
        'Commit all of this before deploying: git add -A then git commit -m "Configure project for Heroku" then git push (to GitHub, as usual).'
      ],
      deliver: ['Procfile', 'runtime.txt', 'requirements.txt', 'Production-ready settings.py'],
      tools: ['VS Code', 'gunicorn', 'whitenoise', 'dj-database-url'],
      dod: ['DEBUG and SECRET_KEY both read from environment variables, not hardcoded', 'Procfile present and correctly named'],
      docs: []
    },
    {
      id: 'dep-5', title: 'Deploy to Heroku and go live', role: 'Dev', est: 1, pri: 1, pts: 3,
      why: 'This is the actual moment the project becomes reachable at a public URL rather than just running on your laptop.',
      how: [
        'Install the Heroku CLI if you haven\'t already (Mac with Homebrew: brew install heroku/brew/heroku — Windows: download the installer from Heroku\'s site).',
        'Log in: heroku login — this opens a browser window to sign in.',
        'From inside your project folder: heroku create your-app-name — pick a unique name, or leave it blank and Heroku generates one. This also adds a new "heroku" remote to your git config automatically.',
        'Add a database: heroku addons:create heroku-postgresql:essential-0 — Heroku no longer has a free tier, so this carries a small monthly cost (check current pricing on heroku.com before confirming).',
        'Set your secret key and any other config as environment variables, never in the code: heroku config:set SECRET_KEY="paste-a-long-random-string-here" DEBUG=False',
        'Push the code to Heroku specifically (separate from your GitHub push): git push heroku main',
        'Run your database migrations on Heroku: heroku run python manage.py migrate',
        'Create an admin login if you need one: heroku run python manage.py createsuperuser',
        'Open the live site in your browser: heroku open',
        'If something\'s wrong, check the logs: heroku logs --tail'
      ],
      deliver: ['Live Heroku app', 'Database provisioned and migrated', 'Config vars set'],
      tools: ['Heroku CLI', 'Heroku Postgres'],
      dod: ['heroku open loads the live site with no errors', 'heroku logs --tail shows no repeating errors'],
      docs: []
    },
    {
      id: 'dep-6', title: 'Updating a live Heroku app', role: 'Dev', est: 0.25, pri: 2, pts: 1,
      why: 'Once it\'s live, every future change follows the same short loop — this is the one to keep handy.',
      how: [
        'Make your changes locally as usual, with the virtual environment active.',
        'Commit them: git add -A then git commit -m "describe the change"',
        'Push to GitHub as normal (your backup and history): git push',
        'Push the same code to Heroku to actually update the live site: git push heroku main',
        'If you changed any models, run the migration on Heroku too: heroku run python manage.py migrate',
        'Check it worked: heroku open, and heroku logs --tail if anything looks off.'
      ],
      deliver: ['A repeatable "ship an update" habit'],
      tools: ['Git', 'Heroku CLI'],
      dod: ['Live site reflects the latest commit after every deploy'],
      docs: []
    }
  ]
};

/* Append to every track's phase list so it shows up regardless of which
   track a project is on. Guarded with Array.isArray so this file can be
   loaded before or after the individual track files without erroring. */
(function () {
  var lists = [window.PHASES, window.PHASES_GROWTH];
  lists.forEach(function (list) {
    if (Array.isArray(list) && !list.some(function (ph) { return ph.id === 'dep'; })) {
      list.push(window.PHASE_DEPLOYMENT);
    }
  });
})();
