import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planRelease } from './prepare-release.mjs';

const sha = 'a'.repeat(40);
const baseline = {
  angularVersion: '21.1.0',
  packageVersion: '21.0.1',
  versions: { '21.0.0': { gitHead: 'b'.repeat(40) } },
  sha,
};

test('first automated release is 21.0.1', () => {
  assert.deepEqual(planRelease(baseline), { version: '21.0.1', publish: true });
});

test('increments the highest published patch, ignoring other majors and prereleases', () => {
  assert.deepEqual(
    planRelease({
      ...baseline,
      versions: { '21.0.9': {}, '21.0.10': {}, '22.0.99': {}, '21.0.50-beta.1': {} },
    }),
    { version: '21.0.11', publish: true },
  );
});

test('a retry reuses the version for the same commit without publishing again', () => {
  assert.deepEqual(
    planRelease({ ...baseline, versions: { '21.0.1': { gitHead: sha }, '21.0.2': {} } }),
    { version: '21.0.1', publish: false },
  );
});

test('a new Angular major starts its own release line', () => {
  assert.deepEqual(
    planRelease({ ...baseline, angularVersion: '22.1.0', packageVersion: '22.0.0' }),
    { version: '22.0.0', publish: true },
  );
});

test('the checked-in version supplies a minimum release version', () => {
  assert.equal(planRelease({ ...baseline, packageVersion: '21.0.5' }).version, '21.0.5');
});

test('invalid metadata, commit, version and Angular alignment fail closed', () => {
  for (const override of [
    { versions: undefined },
    { versions: [] },
    { sha: '' },
    { angularVersion: '^21.1.0' },
    { packageVersion: '20.0.1' },
    { packageVersion: '21.1.0' },
    { versions: { '21.1.0': {} } },
  ]) {
    assert.throws(() => planRelease({ ...baseline, ...override }));
  }
});
