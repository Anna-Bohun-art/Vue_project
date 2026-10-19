import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useLicenseStore } from '../licenseStore'
import { createPinia, setActivePinia } from 'pinia'

const fetchMock = vi.fn()

describe('licenseStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    fetchMock.mockReset()
  })
  it('resolving successful fetching correctly', async () => {
    const mockupResponse = [{ id: 1, name: 'Test', expiresAt: '2027-03-31' }]
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockupResponse) })
    const store = useLicenseStore()
    await store.getData()
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/licenses')
    expect(store.licenses).toEqual(mockupResponse)
    expect(store.errorStatus).toBe(null)
    expect(store.isLoading).toBe(false)
  })
  it('resolving bad response', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 })
    const store = useLicenseStore()
    await store.getData()
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/licenses')
    expect(store.licenses).toEqual([])
    expect(store.errorStatus).toBe('HTTP error! Status: 500')
    expect(store.isLoading).toBe(false)
  })
  it('server is not available', async () => {
    fetchMock.mockRejectedValue(new Error('Network Error'))
    const store = useLicenseStore()
    await store.getData()
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/licenses')
    expect(store.licenses).toEqual([])
    expect(store.errorStatus).toBe('Network Error')
    expect(store.isLoading).toBe(false)
  })
})
