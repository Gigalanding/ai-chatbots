# EduWorkflow frontend redesign

Base repository: `Gigalanding/ai-chatbots`, commit `4e084d8`.

## What changed

- An editorial cream, forest, and sage palette with large typography and solid surfaces.
- A new hero built from animated, code-native workspace layers.
- Four custom animated scenes in **Sound familiar?**: a task queue, disconnected tools,
  incoming messages, and repeated documents. Hover adds depth and movement.
- A visual four-step learning workspace replaces the gradient icon cards. Its
  illustrative scenes show source material, linked highlights, quiz generation, and
  a small working quiz with immediate feedback. The scenes replay automatically.
- The two existing product screenshots are presented as large, stacked product windows,
  with drawn annotations and a full-size viewer. On mobile, the viewer supports horizontal
  scrolling so the source image stays readable.
- **How it works** now has three selectable, self-replaying scenes: context, a conversation,
  and a plan, with compact labels and more room for the graphics.
- The navigation, institution strip, booking/contact styling, FAQ, and footer follow the
  same visual system. Desktop uses the booking action in the sticky navigation; mobile
  retains its dismissible bottom action.
- The final polish pass increases reading sizes across the workspace, discovery flow,
  and FAQ, moves the hero quiz callout lower, and restores full-color institution marks
  inside larger branded cards.
- Decorative animation loops automatically, pauses outside the viewport, and respects the
  operating system's reduced-motion setting.
- Both step selectors support keyboard navigation. The screenshot dialog supports
  Escape, native focus containment, and return focus. Closed mobile navigation is inert.
- Form field IDs use React `useId` to keep server and browser markup consistent.
- Inter is bundled locally, with its license, so production builds do not fetch fonts.

The server API routes and existing live booking/contact integrations retain their behavior.
The standalone preview labels its sample scenes, replaces the live booking embed with a
preview card, and intercepts form submissions so it sends no information.

## Run the website

```bash
npm ci
cp env.example .env.local
# Supply your existing deployment configuration in .env.local.
npm run dev
```

For a production build, run `npm run build`, then `npm start`.

## Generate the standalone preview

```bash
npm run preview
```

Open `preview/EduWorkflow-design-preview.html` in a browser. It includes its React runtime,
styles, fonts, images, and interaction logic in one file. No web server is needed.

The preview imports the actual redesigned components; it is not a separate design mockup.
The handoff package also includes a prebuilt copy of this file.

## Validation

- ESLint and the Next.js production build, including TypeScript checking.
- Browser checks for learning/discovery tabs and arrow-key navigation, automatic replay,
  quiz feedback, screenshot opening/closing and Escape, and reduced motion.
- Desktop, tablet, and mobile layouts, including narrow 360px screens.
- Standalone preview checks for embedded images/fonts, zero network requests, mobile
  navigation, and blocked form submissions.

The live external calendar and delivery of contact submissions require the deployment's
existing service configuration and were not exercised against live accounts.
