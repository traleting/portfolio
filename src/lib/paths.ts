const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function appPath(path: string) {
  return `${basePath}/${path.replace(/^\/+/, '')}`;
}

export function routePath(pathname: string) {
  if (basePath && pathname.startsWith(`${basePath}/`)) {
    return pathname.slice(basePath.length);
  }
  return pathname;
}
