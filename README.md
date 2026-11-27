# Dash Dash!

A cartoony party game for 1–2 players (or 1 player vs CPU), playable with 4 keys per player or by touch.
Modes: Real-time brawl, Slingshot, Football, Race (random tile tracks), Curling, Mini-golf, Siege and King of the Hill.

## Play

- **Quickest:** open `index.html` in any browser. It is fully self-contained and works offline.
- **As an installable app (offline, own icon, full screen):** host this folder on any HTTPS site, open it once,
  then install it:
  - **Android / desktop Chrome or Edge:** tap **Install app** in the menu (or the install icon in the address bar).
  - **iPhone / iPad (Safari):** tap **Share → Add to Home Screen**.

  After the first visit everything is cached, so the installed app starts and plays with no connection.

### Hosting on GitHub Pages

1. Merge this branch into `main` (or pick this branch in the next step).
2. Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   choose the branch and the `/ (root)` folder, then **Save**.
3. After a minute the game is at `https://<your-user>.github.io/<repo>/`. Open it on the phone and install it.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole game (code, art and sound) in one file |
| `manifest.webmanifest` | App name, icons, full-screen display |
| `sw.js` | Service worker that caches the game for offline play |
| `icons/` | App, home-screen and favicon icons |

When you change any file, bump `VERSION` in `sw.js` so installed copies download the update.
