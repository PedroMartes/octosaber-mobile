const API_URL = process.env.EXPO_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error('API não configurada. Defina EXPO_PUBLIC_API_URL no arquivo .env.');
  }

  const browserHostname =
    typeof window !== 'undefined' && window.location
      ? window.location.hostname
      : null;

  if (browserHostname) {
    const url = new URL(API_URL);
    const isLoopback = (hostname) =>
      hostname === 'localhost' || hostname === '127.0.0.1';
    const isPrivateIpv4 = (hostname) =>
      /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname);

    // Keep Expo Web and the local PHP API on the same site for PHP session cookies.
    if (
      (isLoopback(browserHostname) && isPrivateIpv4(url.hostname)) ||
      (isLoopback(url.hostname) && isPrivateIpv4(browserHostname))
    ) {
      url.hostname = browserHostname;
      return url.toString();
    }

    if (process.env.NODE_ENV === 'development') {
      url.hostname = browserHostname;
      return url.toString();
    }
  }

  return API_URL;
}

async function request(action, { method = 'GET', body, query = {} } = {}) {
  const apiUrl = getApiUrl();
  const params = Object.entries({ action, ...query })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  const separator = apiUrl.includes('?') ? '&' : '?';
  const response = await fetch(`${apiUrl}${separator}${params}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`A API retornou uma resposta inválida (HTTP ${response.status}).`);
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.erro || `Falha na comunicação com a API (HTTP ${response.status}).`);
  }

  return data;
}

export function getAssetUrl(path) {
  if (!path) {
    return null;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const apiUrl = getApiUrl();
  const directory = apiUrl.slice(0, apiUrl.lastIndexOf('/') + 1);
  return `${directory}${path.replace(/^\/+/, '')}`;
}

export function loginWithRA(ra, senha) {
  return request('login_ra', {
    method: 'POST',
    body: { ra, senha },
  });
}

export function loginWithEmail(email, senha) {
  return request('login_email', {
    method: 'POST',
    body: { email, senha },
  });
}

export async function getHomeData() {
  const [user, statistics, courses] = await Promise.all([
    request('me'),
    request('estatisticas'),
    request('progresso'),
  ]);

  return {
    user: user.usuario,
    statistics: statistics.estatisticas,
    courses: courses.progresso,
  };
}

export async function getCurrentUser() {
  const data = await request('me');
  return data.usuario;
}

export async function logout() {
  return request('logout');
}

export async function getCourses() {
  const data = await request('cursos');
  return data.cursos;
}

export async function getCourse(idCurso) {
  const data = await request('curso', { query: { id_curso: idCurso } });
  return data.curso;
}

export async function getProgress() {
  const data = await request('progresso');
  return data.progresso;
}

export function enrollInCourse(idCurso) {
  return request('matricular', {
    method: 'POST',
    body: { id_curso: idCurso },
  });
}

export function completeLesson(idAula) {
  return request('concluir_aula', {
    method: 'POST',
    body: { id_aula: idAula },
  });
}

export async function getBooks(busca = '') {
  const data = await request('livros', { query: busca ? { busca } : {} });
  return data.livros;
}

export async function getMaterials() {
  const data = await request('materiais');
  return data.materiais;
}

export async function getQuestions(limite = 20, idDisciplina) {
  const query = { limite };
  if (idDisciplina) {
    query.id_disciplina = idDisciplina;
  }

  const data = await request('questoes', { query });
  return data.questoes;
}

export function answerQuestion(idQuestao, idAlternativa, tempoSegundos = 0) {
  return request('responder_questao', {
    method: 'POST',
    body: {
      id_questao: idQuestao,
      id_alternativa: idAlternativa,
      tempo_segundos: tempoSegundos,
    },
  });
}

export async function getEssayTopics() {
  const data = await request('temas_redacao');
  return data.temas;
}

export function submitEssay({ idTema, titulo, texto }) {
  return request('enviar_redacao', {
    method: 'POST',
    body: { id_tema: idTema, titulo, texto },
  });
}

export async function getEssays() {
  const data = await request('redacoes');
  return data.redacoes;
}

export async function getCertificates() {
  const data = await request('certificados');
  return data.certificados;
}

export async function getNotifications() {
  const data = await request('notificacoes');
  return data.notificacoes;
}

export function markNotificationRead(idNotificacao) {
  return request('ler_notificacao', {
    method: 'POST',
    body: { id_notificacao: idNotificacao },
  });
}

export async function getStudyPlans() {
  const data = await request('planos');
  return data.planos;
}

export async function getSubscription() {
  const data = await request('assinatura');
  return data.assinatura;
}

export async function getRanking(limite = 20) {
  const data = await request('ranking', { query: { limite } });
  return data.ranking;
}
