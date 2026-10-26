import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function planRelease({ angularVersion, packageVersion, versions, sha }) {
  if (!stableVersion.test(angularVersion) || !stableVersion.test(packageVersion)) {
    throw new Error('Angular and library versions must be exact stable versions.');
  }
  if (!/^[a-f0-9]{40}$/.test(sha)) throw new Error('Expected a full Git commit SHA.');
  if (!versions || typeof versions !== 'object' || Array.isArray(versions)) {
    throw new Error('Registry metadata must contain a versions object.');
  }
  const major = Number(angularVersion.split('.')[0]);
  const [localMajor, localMinor, floorPatch] = packageVersion.split('.').map(Number);
  if (localMajor !== major || localMinor !== 0) {
    throw new Error(`Library version must be ${major}.0.PATCH to match Angular.`);
  }
  const published = Object.entries(versions)
    .filter(([version]) => stableVersion.test(version))
    .map(([version, metadata]) => ({ version, metadata, parts: version.split('.').map(Number) }))
    .filter(({ parts }) => parts[0] === major);
  if (published.some(({ parts }) => parts[1] !== 0)) {
    throw new Error('Published minor is nonzero; resolve the release policy before publishing.');
  }
  const prior = published
    .filter(({ metadata }) => metadata.gitHead === sha)
    .sort((a, b) => b.parts[2] - a.parts[2])[0];
  if (prior) return { version: prior.version, publish: false };
  const highestPatch = Math.max(-1, ...published.map(({ parts }) => parts[2]));
  return { version: `${major}.0.${Math.max(floorPatch, highestPatch + 1)}`, publish: true };
}

async function main() {
  const manifestPath = 'projects/ngx-workshop-ui/package.json';
  const workspace = JSON.parse(readFileSync('package.json', 'utf8'));
  const pkg = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`, {
    signal: AbortSignal.timeout(30_000),
    headers: { Accept: 'application/json' },
  });
  // Even 404 is an error: this pipeline expects the initial package to exist.
  if (!response.ok) throw new Error(`npm registry returned ${response.status}; release aborted.`);
  const metadata = await response.json();
  const release = planRelease({
    angularVersion: workspace.dependencies['@angular/core'],
    packageVersion: pkg.version,
    versions: metadata.versions,
    sha: process.env.GITHUB_SHA,
  });
  pkg.version = release.version;
  writeFileSync(manifestPath, `${JSON.stringify(pkg, null, 2)}\n`);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `version=${release.version}\npublish=${release.publish}\n`,
    );
  }
  console.log(
    `${release.publish ? 'Preparing' : 'Already published'} ${pkg.name}@${release.version}`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
