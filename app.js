/**
 * app.js
 * Utilitários e funções compartilhadas entre todas as páginas.
 */

// ─── TEMPO RELATIVO ──────────────────────────────────────────────────────────

/**
 * Retorna uma string amigável de tempo relativo.
 * Ex: "há 5 minutos", "há 2 horas", "há 3 dias"
 * @param {Date} date
 * @returns {string}
 */
export function timeAgo(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr  / 24);

  if (diffSec < 60)  return 'agora mesmo';
  if (diffMin < 60)  return `há ${diffMin} minuto${diffMin > 1 ? 's' : ''}`;
  if (diffHr  < 24)  return `há ${diffHr} hora${diffHr > 1 ? 's' : ''}`;
  if (diffDay < 7)   return `há ${diffDay} dia${diffDay > 1 ? 's' : ''}`;

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

// ─── URGÊNCIA ────────────────────────────────────────────────────────────────

/**
 * Retorna o rótulo legível do nível de urgência.
 * @param {string} urgencia
 * @returns {string}
 */
export function urgencyLabel(urgencia) {
  const labels = { alta: '🔴 Urgente', media: '🟡 Médio', baixa: '🟢 Leve' };
  return labels[urgencia] || '⚪ Sem prioridade';
}

/**
 * Retorna a classe CSS correspondente ao nível de urgência.
 * @param {string} urgencia
 * @returns {string}
 */
export function urgencyClass(urgencia) {
  const map = { alta: 'alta', media: 'media', baixa: 'baixa' };
  return map[urgencia] || 'baixa';
}

// ─── TIPO DE OCORRÊNCIA ──────────────────────────────────────────────────────

/**
 * Retorna o ícone Font Awesome para o tipo de ocorrência.
 * @param {string} tipo
 * @returns {string}
 */
export function tipoIcon(tipo) {
  if (!tipo) return 'fa-solid fa-circle-exclamation';
  const t = tipo.toLowerCase();
  if (t.includes('alagamento'))   return 'fa-solid fa-house-flood-water';
  if (t.includes('deslizamento')) return 'fa-solid fa-mountain-city';
  if (t.includes('risco'))        return 'fa-solid fa-triangle-exclamation';
  if (t.includes('socorro'))      return 'fa-solid fa-circle-exclamation';
  return 'fa-solid fa-circle-exclamation';
}

// ─── GEOLOCALIZAÇÃO ──────────────────────────────────────────────────────────

/**
 * Captura a localização atual do usuário via Geolocation API.
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation não suportada neste dispositivo.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}

// ─── FORMATAÇÃO DE DATA ───────────────────────────────────────────────────────

/**
 * Formata uma data para o padrão brasileiro.
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}