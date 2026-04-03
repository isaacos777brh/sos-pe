/**
 * firebase.js
 * Módulo central de integração com Firebase (Firestore + Storage).
 * ⚠️  CONFIGURAÇÃO NECESSÁRIA: substitua o objeto firebaseConfig
 *     pelos dados do seu projeto no Firebase Console.
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

// =====================================================================
// 🔥 CONFIGURAÇÃO DO FIREBASE
// Substitua os valores abaixo pelos do seu projeto.
// Acesse: https://console.firebase.google.com → Configurações do Projeto
// =====================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCM6PI-ePBkg57xTLCYqwa9JBi5FzDz3R0",
  authDomain: "sos-pe.firebaseapp.com",
  projectId: "sos-pe",
  storageBucket: "sos-pe.firebasestorage.app",
  messagingSenderId: "343156571130",
  appId: "1:343156571130:web:026d7977d3e01a65324243",
  measurementId: "G-XWZ5L0VL3D"
};
// =====================================================================

let app, db, storage;

/**
 * Inicializa o Firebase.
 * Deve ser chamado uma vez no carregamento de cada página.
 */
export function initFirebase() {
  try {
    app     = initializeApp(firebaseConfig);
    db      = getFirestore(app);
    storage = getStorage(app);
    console.log('[Firebase] Inicializado com sucesso.');
  } catch (e) {
    console.error('[Firebase] Erro ao inicializar:', e);
    throw e;
  }
}

/**
 * Salva uma ocorrência no Firestore.
 * @param {Object} dados - Campos da ocorrência.
 * @returns {Promise<DocumentReference>}
 */
export async function salvarOcorrencia(dados) {
  if (!db) throw new Error('Firebase não inicializado.');

  const docRef = await addDoc(collection(db, 'ocorrencias'), {
    tipo:       dados.tipo       || 'Não informado',
    urgencia:   dados.urgencia   || 'baixa',
    descricao:  dados.descricao  || '',
    lat:        dados.lat        || null,
    lng:        dados.lng        || null,
    imagemURL:  dados.imagemURL  || null,
    ehSOS:      dados.ehSOS      || false,
    criadoEm:   serverTimestamp(),
  });

  console.log('[Firebase] Ocorrência salva:', docRef.id);
  return docRef;
}

/**
 * Busca as últimas N ocorrências, ordenadas por data (mais recente primeiro).
 * @param {number} max - Limite de documentos. Padrão: 50.
 * @returns {Promise<Array>}
 */
export async function getOcorrencias(max = 50) {
  if (!db) throw new Error('Firebase não inicializado.');

  const q = query(
    collection(db, 'ocorrencias'),
    orderBy('criadoEm', 'desc'),
    limit(max)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Faz upload de uma imagem para o Firebase Storage.
 * @param {File} arquivo - Objeto File do input.
 * @returns {Promise<string>} - URL pública da imagem.
 */
export async function uploadImagem(arquivo) {
  if (!storage) throw new Error('Firebase Storage não inicializado.');

  const nomeUnico = `ocorrencias/${Date.now()}_${arquivo.name}`;
  const storageRef = ref(storage, nomeUnico);

  await uploadBytes(storageRef, arquivo);
  const url = await getDownloadURL(storageRef);

  console.log('[Firebase] Imagem enviada:', url);
  return url;
}