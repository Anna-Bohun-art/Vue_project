import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../LoginForm.vue'
import { createPinia, setActivePinia } from 'pinia'

const push = vi.fn()
vi.mock('vue-router', () => ({ useRouter: () => ({ push }) }))

describe('LoginForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    push.mockClear()
  })
  it('locks the button and shows no messages on an empty form', async () => {
    const wrapper = mount(LoginForm)
    expect(wrapper.text()).not.toContain('Bitte eine gültige E-Mail eingeben')
    expect(wrapper.text()).not.toContain('Mindestens 8 Zeichen')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
  it('shows the email and password messages for an invalid email and password inputs', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('input[type="email"]').setValue('anna')
    expect(wrapper.text()).toContain('Bitte eine gültige E-Mail eingeben')
    await wrapper.find('input[type="password"]').setValue('fj1')
    expect(wrapper.text()).toContain('Mindestens 8 Zeichen')
  })
  it('unlocks the button when all fields are valid', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('input[type="email"]').setValue('anna@gmail.com')
    expect(wrapper.text()).not.toContain('Bitte eine gültige E-Mail eingeben')
    await wrapper.find('input[type="password"]').setValue('fj1wshdj')
    expect(wrapper.text()).not.toContain('Mindestens 8 Zeichen')
    await wrapper.find('select').setValue('Lehrkraft')
    expect(wrapper.text()).not.toContain('Bitte eine Rolle wählen')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })
  it('logs in and navigates to the licenses page', async () => {
    const wrapper = mount(LoginForm)
    await wrapper.find('input[type="email"]').setValue('anna@gmail.com')
    await wrapper.find('input[type="password"]').setValue('fj1wshdj')
    await wrapper.find('select').setValue('Lehrkraft')
    await wrapper.find('form').trigger('submit')
    expect(push).toHaveBeenCalledWith({ name: 'LicensesView' })
  })
})
