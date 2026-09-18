const repoList = document.getElementById('repo-list');

async function loadRepositories() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const repositories = await response.json();

    if (!Array.isArray(repositories)) {
      throw new Error('The data format is invalid.');
    }

    repoList.innerHTML = repositories
      .map(
        (repo) => `
          <li class="repo-item">
            <div class="repo-header">
              <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noreferrer">
                ${repo.full_name}
              </a>
              <span class="star-count">★ ${repo.stargazers_count.toLocaleString()}</span>
            </div>
            <p>${repo.description}</p>
            <div class="repo-meta">
              <span class="language-dot" style="background-color: ${repo.color || '#6e7781'}"></span>
              <span>${repo.language}</span>
            </div>
          </li>
        `
      )
      .join('');
  } catch (error) {
    console.error('Unable to load repositories:', error);
    repoList.innerHTML = '<li class="error">Unable to load the starred repositories list.</li>';
  }
}

loadRepositories();
