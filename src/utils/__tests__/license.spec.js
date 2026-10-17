import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

import { getStatus } from '../license.js'

describe('getStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-17'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('returns abgelaufen', () => {
    const license = { expiresAt: '2026-10-16' }
    expect(getStatus(license)).toBe('abgelaufen')
  })
  it('returns laeuftbald', () => {
    const license = { expiresAt: '2026-10-30' }
    expect(getStatus(license)).toBe('laeuftbald')
  })
  it('returns aktiv', () => {
    const license = { expiresAt: '2026-12-30' }
    expect(getStatus(license)).toBe('aktiv')
  })
})
