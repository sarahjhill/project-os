# Project OS

**Discovery to deployment, as a working system.** A complete delivery process for a solo studio doing full-stack work — 12 phases, 69 guided tasks, 71 templates, sprint tracking, and client forms you can send as a link.

No build step, no dependencies, no backend. Plain HTML, CSS and JavaScript.

---

## Deploy it to GitHub Pages

Five minutes, no command line needed.

### 1. Create the repository
Go to [github.com/new](https://github.com/new).

- **Repository name:** `project-os` (this becomes part of your web address)
- **Public** — GitHub Pages requires this on the free plan
- Leave **Add a README**, **.gitignore** and **licence** all unticked — this folder already contains them, and leaving the repo empty makes the next step simpler

Click **Create repository**.

### 2. Upload the files

After creating the repo you land on a page headed **Quick setup**. It shows a block of git commands — ignore those. Below them is a line of grey text:

> *…or create a new file. Get started by creating a new file or **uploading an existing file**.*

Click the blue **uploading an existing file** link. A drag-and-drop box opens.

*(If you already added a README and don't see that page, use the **Add file ▾** button at the top right of the file list → **Upload files**.)*

Now open this folder in Finder or File Explorer, select **everything inside it** — `index.html`, `README.md`, `LICENSE`, and the `css`, `js`, `forms` and `.github` folders — and drag it all into the box. Scroll down and click **Commit changes**.

Uploading takes a moment; when it finishes you'll see the files listed.

> **The `.github` folder may be invisible.** Files starting with a dot are hidden by default. On macOS press **⌘-Shift-.** in Finder to reveal them; on Windows, View → Show → Hidden items. If you'd rather not bother, skip it and use step 3b instead — the site works identically either way.
>
> Also drag in `.nojekyll` if you can see it. It's an empty file that stops GitHub trying to process the site as a blog.

### 3a. Turn on Pages (with the included workflow)
**Settings → Pages → Build and deployment → Source: GitHub Actions.** The included workflow deploys on every push to `main`.

### 3b. Turn on Pages (without the workflow)
**Settings → Pages → Source: Deploy from a branch → Branch: `main`, folder: `/ (root)` → Save.**

### 4. Wait a minute
Your site appears at `https://YOUR-USERNAME.github.io/project-os/`. First deploy takes 1–2 minutes; check the **Actions** tab for progress.

**If you get a 404 at first,** wait two minutes and refresh — the first build is the slow one. If it persists, check Settings → Pages again; the source setting sometimes needs saving a second time.

### Updating later
Edit files on GitHub directly (pencil icon) or upload replacements. Pages redeploys automatically.

**Important:** after deploying changes, bump `CACHE` in `sw.js` (e.g. `project-os-v1` → `project-os-v2`). The service worker caches aggressively for offline use, and without a version bump returning visitors keep the old files.

---

## What you get once deployed

- **The app** at your Pages URL — works on any device, installable to your dock or home screen.
- **Shareable client forms** at `/forms/` — send a client a link instead of an email attachment. The app detects it's running on a real URL and shows a **Copy shareable link** button on every sendable template.
- **Offline support** — once loaded, it works with no connection.

---

## How your data is handled

Everything stays in **your** browser. There is no server, no database, no account, no analytics, no tracking of any kind. Specifically:

| Data | Where it lives |
|---|---|
| Task progress, notes, sprints, links | `localStorage` in your browser |
| Files you attach to tasks | `IndexedDB` in your browser |
| Client form answers | Downloaded to the client's own machine, emailed to you, imported by you |

Two consequences worth understanding:

1. **The site is public, but your data is not.** Anyone can visit the URL and get an empty copy. Nobody can see what you've typed into yours — it never leaves your machine.
2. **Clearing your browser data deletes your work.** Use **⋯ → Export backup** regularly. It's the only backup that exists.

Your local file version and the deployed version are separate storage. Move between them with Export and Import.

---

## Repository layout

```
index.html               the app
css/styles.css           design tokens and all styling
js/
  data-phases.js         phases 0–5
  data-phases-2.js       phases 6–11
  data-docs.js           templates: sales, legal, research, strategy, backend
  data-docs-2.js         templates: design, dev, agile, QA, launch, handover
  data-forms.js          the five sendable form definitions
  forms.js               form generator and answer parser
  store.js               state, storage, import/export
  app.js                 views, task drawer, board, sprints, markdown renderer
forms/                   pre-built form pages, shareable by link
sw.js                    service worker (offline)
manifest.webmanifest     installable app metadata
.github/workflows/       Pages deployment
```

---

## Making it yours

The process is data, not code — edit it freely.

| To change | Edit |
|---|---|
| Phases, tasks, guidance | `js/data-phases.js`, `js/data-phases-2.js` |
| Templates | `js/data-docs.js`, `js/data-docs-2.js` |
| Form questions | `js/data-forms.js` |
| Colours, type, spacing | the `:root` block in `css/styles.css` |

A task looks like this — add your own by copying the shape:

```js
{
  id: 'p2-9', title: 'Run a diary study', role: 'UX', est: 6, pri: 3, pts: 5,
  why: 'Interviews capture what people remember. Diaries capture what actually happened.',
  how: ['Recruit 6 participants…', 'Prompt daily for two weeks…'],
  deliver: ['Diary entries', 'Behaviour timeline'],
  tools: ['Google Forms'],
  dod: ['6 participants completed 10+ days'],
  docs: ['doc-research-plan']
}
```

After editing form questions, regenerate the pages in `forms/` — or just delete that folder and use **Create client form** in the app to email files instead.

**Before sending the research screener to anyone**, replace the placeholder competitor names (Option A, B, C) in `js/data-forms.js`.

---

## Browser support

Chrome, Edge, Safari and Firefox, current versions, desktop and mobile. File attachments need IndexedDB, which private/incognito windows restrict — the app tells you if that happens and still works for everything else.

---

## Licence

MIT — see `LICENSE`. Use it, change it, use it commercially. No warranty.
# project-os
