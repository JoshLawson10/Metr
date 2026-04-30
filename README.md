# Metr

A real-time tempo detection app for worship musicians. Metr listens via the device microphone and provides live BPM feedback, alerting musicians when they are speeding up or slowing down — without the complexity of a traditional click track.

Built with React Native + Expo as part of an HSC Design & Technology Major Project.

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

From there you can open the app in an iOS simulator, Android emulator, or on a physical device via Expo Go.

---

## Project Structure

```
app/          # Screens and navigation (Expo Router)
components/   # Reusable UI components
constants/    # Theme, colours, fonts
assets/       # Images, icons, fonts
```

---

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). All commit messages should follow this format:

```
<type>(<scope>): <short description>
```

### Types

| Type | Use for |
|------|---------|
| `feat` | A new feature or UI component |
| `fix` | A bug fix |
| `refactor` | Code restructure with no behaviour change |
| `style` | Visual/UI changes (colours, spacing, fonts) |
| `test` | Adding or updating tests |
| `chore` | Config, dependencies, tooling |
| `docs` | README or documentation updates |

### Examples

```
feat(detection): implement onset detection algorithm
fix(ui): correct BPM display not updating on tempo change
style(main-screen): apply glassmorphic card styling
chore(deps): upgrade expo to SDK 53
```

### Scopes

Use short, consistent scope names that map to areas of the project — e.g. `detection`, `ui`, `main-screen`, `setlist`, `audio`, `deps`.

---
