function platform<T>(config: Partial<Record<typeof __PLATFORM__, T>> & { default: T }): T {
  return config[__PLATFORM__] ?? config?.default;
}

export default platform;
