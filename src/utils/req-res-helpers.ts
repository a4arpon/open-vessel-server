export function response(message: string, data?: unknown, success?: boolean) {
  return {
    success: success || true,
    message: message,
    data: data || null,
  }
}
