// Small temporary router based on the part of the URL after "#"
// (e.g. #/bureau/membres/4 → path "/bureau/membres/4").
// It can be replaced by react-router-dom if the team adds it.
import { useEffect, useState } from 'react';

export function useHashPath() {
  const [path, setPath] = useState(() => window.location.hash.slice(1));

  useEffect(() => {
    const onHashChange = () => {
      setPath(window.location.hash.slice(1));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return path;
}

// Returns the first route whose pattern matches the path, with its params
// ("/bureau/membres/:id" + "/bureau/membres/4" → { id: '4' }), or null.
export function matchRoute(routes, path) {
  const pathParts = path.split('/').filter(Boolean);

  for (const route of routes) {
    const routeParts = route.path.split('/').filter(Boolean);
    if (routeParts.length !== pathParts.length) continue;

    const params = {};
    const isMatch = routeParts.every((part, i) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = decodeURIComponent(pathParts[i]);
        return true;
      }
      return part === pathParts[i];
    });

    if (isMatch) return { route, params };
  }

  return null;
}

export function navigate(path) {
  window.location.hash = path;
}
