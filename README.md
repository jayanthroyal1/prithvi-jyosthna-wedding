# Prithvi & Jyosthna — wedding invitation

Static HTML/CSS/JS, no build step. Deploy the whole folder to Vercel.

```
index.html   all wording and sections
style.css    look, fonts (Imperial Script, Ovo, Rufina, Ramaraja for Telugu), animations
script.js    envelope glow/opening, music, scratch cards, scroll motion, countdown, thoranam
config.js    date/time zone, music file, RSVP form link, venue for the map
assets/      ishq.mp3, washington.jpg, texas.jpg, guest-photos-qr.png
```

`assets/texas-oasis.png` and `assets/washington-ghibli.webp` are the full-size originals; the page uses the
compressed `.jpg` copies, so the originals can be deleted before deploying.

## Hero video (optional, like the reference)
Without a video, the hero shows the animated Telugu Brahmin mandapam: the tera is lowered to reveal the
names and muhurtham, with the homam fire burning in front. To use a moving bride & groom instead:

1. Generate a clip with an AI video tool (Google Veo, Kling, Runway or Sora) using this prompt:

   > Vertical 9:16, 8-second seamless loop, soft cinematic light, illustrated realistic style in warm ivory,
   > gold and kumkum red. A Telugu Brahmin bride and groom seen from behind, walking slowly hand in hand
   > toward a decorated kalyana mandapam with gold pillars wrapped in marigold garlands, mango-leaf thoranam,
   > banana plants and brass lamps. The bride wears a red-and-gold Kanjivaram pattu saree, long jada braid
   > with jasmine, bashikam on her forehead; the groom wears a white pancha with gold border, kanduva over
   > the shoulder and bashikam. Turmeric rice and petals drift in the air. Calm, elegant, no text.

2. Export as MP4 (H.264, about 720×1280, under 6 MB, no audio) and save it as `assets/hero.mp4`.
3. In `config.js` set `heroVideo: "assets/hero.mp4"`.

The page then plays the video full screen after the envelope opens, with the names and date over it.

## Run locally
`npx serve .` then open the printed URL (or open `index.html` directly in Chrome).

## Deploy to Vercel
- vercel.com → Add New → Project → upload this folder (Framework: Other, no build command), or
- `npx vercel --prod` in this folder.

Set `og:image` in `index.html` to the full deployed URL (e.g. `https://your-site.vercel.app/assets/texas.jpg`) so WhatsApp shows the preview image.
