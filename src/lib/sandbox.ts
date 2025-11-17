/**
 * Système de Sandbox pour exécuter et afficher du code TypeScript
 */

export interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  filename: string
}

export interface SandboxResult {
  logs: Array<{
    type: 'log' | 'info' | 'warn' | 'error'
    message: string
    timestamp: Date
  }>
  error?: string
}

/**
 * Charge le contenu d'un fichier de cours
 * Utilise des imports dynamiques avec ?raw pour charger les fichiers TypeScript comme texte
 */
export async function loadCodeExample(filename: string): Promise<string> {
  try {
    // Mapping des noms de fichiers vers leurs imports
    const fileMap: Record<string, () => Promise<{ default: string }>> = {
      'inference.ts': () => import('../cours-ts/inference.ts?raw'),
      'generic.ts': () => import('../cours-ts/generic.ts?raw'),
      'void-never.ts': () => import('../cours-ts/void-never.ts?raw'),
      'enum.ts': () => import('../cours-ts/enum.ts?raw'),
      'object-types.ts': () => import('../cours-ts/object-types.ts?raw'),
      'dictionary.ts': () => import('../cours-ts/dictionary.ts?raw'),
      'functions.ts': () => import('../cours-ts/functions.ts?raw'),
      'utility-types.ts': () => import('../cours-ts/utility-types.ts?raw'),
      'readonly.ts': () => import('../cours-ts/readonly.ts?raw'),
      'pick-omit.ts': () => import('../cours-ts/pick-omit.ts?raw'),
    }

    const loader = fileMap[filename]
    if (!loader) {
      throw new Error(`Fichier ${filename} non trouvé dans le mapping`)
    }

    const module = await loader()
    return module.default || ''
  } catch (error) {
    console.error(`Erreur lors du chargement de ${filename}:`, error)
    // Fallback: retourner un message d'erreur
    return `// Erreur: Impossible de charger le fichier ${filename}\n// ${error instanceof Error ? error.message : String(error)}`
  }
}

/**
 * Exécute du code TypeScript de manière sécurisée
 * Note: En production, il faudrait utiliser un service backend pour compiler TypeScript
 * Ici, on exécute le JavaScript compilé par Vite
 */
export function executeCode(code: string): SandboxResult {
  const logs: SandboxResult['logs'] = []
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  }

  // Capturer les logs
  const captureLog = (type: 'log' | 'info' | 'warn' | 'error') => {
    return (...args: unknown[]) => {
      originalConsole[type](...args)
      const message = args.map(arg => {
        if (arg === null) return 'null'
        if (arg === undefined) return 'undefined'
        if (typeof arg === 'object') {
          try {
            if (Array.isArray(arg)) {
              return `[${arg.map(item => formatValue(item)).join(', ')}]`
            }
            const formatted = JSON.stringify(arg, null, 2)
            return formatted.length > 500 ? formatted.substring(0, 500) + '...' : formatted
          } catch {
            return String(arg)
          }
        }
        if (typeof arg === 'function') {
          return `[Function: ${arg.name || 'anonymous'}]`
        }
        return String(arg)
      }).join(' ')

      logs.push({
        type,
        message,
        timestamp: new Date(),
      })
    }
  }

  // Remplacer temporairement console
  console.log = captureLog('log')
  console.info = captureLog('info')
  console.warn = captureLog('warn')
  console.error = captureLog('error')

  let error: string | undefined

  try {
    // Créer une fonction pour exécuter le code dans un contexte isolé
    // Note: En production, utilisez un service backend pour compiler TypeScript
    const cleanCode = code
      // Supprimer les imports (ils sont déjà chargés)
      .replace(/^import\s+.*$/gm, '')
      // Supprimer les exports (non nécessaires pour l'exécution)
      .replace(/^export\s+/gm, '')
      // Nettoyer les commentaires de documentation
      .replace(/\/\*\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')

    // Exécuter le code
    // ATTENTION: Utiliser eval() peut être dangereux en production
    // En production, utilisez un service backend pour compiler et exécuter TypeScript
    new Function(cleanCode)()
  } catch (e) {
    error = e instanceof Error ? e.message : String(e)
    logs.push({
      type: 'error',
      message: error,
      timestamp: new Date(),
    })
  } finally {
    // Restaurer les fonctions console originales
    console.log = originalConsole.log
    console.info = originalConsole.info
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  }

  return { logs, error }
}

function formatValue(value: unknown): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (typeof value === 'string') return `"${value}"`
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

/**
 * Formate le code pour l'affichage avec syntax highlighting basique
 */
export function formatCodeForDisplay(code: string): string {
  return code
    // Échapper le HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Mettre en évidence les mots-clés TypeScript
    .replace(/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|class|interface|type|enum|extends|implements|public|private|protected|readonly|static|async|await|import|export|from|as|default)\b/g, '<span class="keyword">$1</span>')
    // Mettre en évidence les types
    .replace(/\b(number|string|boolean|object|any|unknown|void|never|true|false|null|undefined)\b/g, '<span class="type">$1</span>')
    // Mettre en évidence les strings
    .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')
    // Mettre en évidence les nombres
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
    // Mettre en évidence les commentaires
    .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
}

