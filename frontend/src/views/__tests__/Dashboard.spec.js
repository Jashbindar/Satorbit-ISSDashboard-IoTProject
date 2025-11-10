import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from '../Dashboard.vue'

// Mock child components
vi.mock('../../components/CurrentPosition.vue', () => ({
  default: { template: '<div>CurrentPosition</div>' }
}))

vi.mock('../../components/DataTable.vue', () => ({
  default: { template: '<div>DataTable</div>' }
}))

vi.mock('../../components/Map.vue', () => ({
  default: { template: '<div>Map</div>' }
}))

vi.mock('../../components/AltitudeChart.vue', () => ({
  default: { template: '<div>AltitudeChart</div>' }
}))

describe('Dashboard', () => {
  it('renders the dashboard container', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.find('.dashboard-container').exists()).toBe(true)
  })

  it('displays the project title', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.text()).toContain('ISS Tracker - Project')
  })

  it('displays course information', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.text()).toContain('TFB 2093 – Internet of Things')
  })

  it('displays lecturer information', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.text()).toContain('Dr. Ooi Boon Yaik')
  })

  it('displays team members', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.text()).toContain('NADZIRA RAMLI')
    expect(wrapper.text()).toContain('JASHBINDAR SINGH')
  })

  it('renders all dashboard sections', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.find('.real-time-data').exists()).toBe(true)
    expect(wrapper.find('.visualization').exists()).toBe(true)
    expect(wrapper.find('.historical-data').exists()).toBe(true)
    expect(wrapper.find('.analytics').exists()).toBe(true)
  })
})

