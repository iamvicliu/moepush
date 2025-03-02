export const ENDPOINT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const

export type EndpointStatus = typeof ENDPOINT_STATUS[keyof typeof ENDPOINT_STATUS]

export const STATUS_LABELS: Record<EndpointStatus, string> = {
  [ENDPOINT_STATUS.ACTIVE]: "正常",
  [ENDPOINT_STATUS.INACTIVE]: "禁用",
}

export const STATUS_COLORS: Record<EndpointStatus, string> = {
  [ENDPOINT_STATUS.ACTIVE]: "bg-green-50 text-green-700 ring-green-600/20",
  [ENDPOINT_STATUS.INACTIVE]: "bg-red-50 text-red-700 ring-red-600/20",
} 