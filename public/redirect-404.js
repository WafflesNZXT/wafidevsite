(function() {
  var path = (location.pathname || '/').replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  var target = null;
  var map = {
    '/': '/index.html',
    '/home': '/index.html',
    '/index': '/index.html',
    '/projects': '/projects.html',
    '/about': '/about.html',
    '/hire': '/hire.html'
  };

  if (map[path]) {
    target = map[path];
  } else if (path.indexOf('/project/projects') === 0) {
    target = '/projects.html';
  } else if (path.indexOf('/project/') === 0) {
    var slug = path.split('/').pop();
    target = '/project.html' + (slug ? ('?id=' + encodeURIComponent(slug)) : '');
  } else if (path === '/project') {
    target = '/project.html';
  } else if (path.endsWith('.html')) {
    target = path; // already a file, let it pass through
  } else {
    target = '/index.html';
  }

  var search = target.indexOf('?') === -1 ? (location.search || '') : '';
  var url = location.origin + target + search + (location.hash || '');
  if (url !== location.href) {
    location.replace(url);
  }
})();
