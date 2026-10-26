export const TYPESCRIPT_SAMPLE = `// Build a workshop at your own frequency.
import { signal } from '@angular/core';

interface Workshop {
  title: string;
  seats: number;
}

export function createWorkshop(title: string): Workshop {
  const seats = 24;
  return { title, seats };
}

const workshop = signal(createWorkshop('Signals in motion'));`;
export const HTML_SAMPLE = `<section class="workshop" aria-label="Upcoming session">
  <h2>Signals in motion</h2>
  <button type="button">Reserve a seat</button>
</section>`;
export const CSS_SAMPLE = `/* A shared visual language */
.workshop {
  background: #262335;
  color: #ff7edb;
  padding: 24px;
}

.workshop:hover { border-color: #72f1b8; }`;
export const JSON_SAMPLE = `{
  "title": "Signals in motion",
  "seats": 24,
  "published": true,
  "tracks": ["Angular", "Material"],
  "nextSession": null
}`;
